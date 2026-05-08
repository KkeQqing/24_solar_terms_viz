import { regionProfiles } from './data.js'
export let currentTermIndex = 5
export let currentRegion = 'north'
export let charts = {}
export let compareChart = null
export let analysisChart = null
export let autoTimer = null
export let currentAnalysisType = 'summary'
export const $ = id => document.getElementById(id)
export function fmt(n,d=2){return Number(n).toFixed(d)}
export function toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');clearTimeout(t.timer);t.timer=setTimeout(()=>t.classList.remove('show'),1600)}
export function todayCN(){const d=new Date();return `${d.getFullYear()}年${String(d.getMonth()+1).padStart(2,'0')}月${String(d.getDate()).padStart(2,'0')}日`}
export function daysToNextTerm(index){const now=new Date();const t=JSON.parse(window.solarTerms)[(index+1)%24];const[m,d]=t.date.split('.').map(Number);let tar=new Date(now.getFullYear(),m-1,d);if(tar<now)tar=new Date(now.getFullYear()+1,m-1,d);return Math.max(0,Math.ceil((tar-now)/86400000))}
export function adjusted(term){const r=regionProfiles[currentRegion];return {...term,temp:Math.round((term.temp+r.tempOffset)*10)/10,rain:Math.max(0,Math.min(100,Math.round(term.rain*r.rainFactor))),active:Math.max(5,Math.min(100,64+r.activeOffset+Math.round(term.rain/4))),lag:r.lag}}
export function textColor(){return document.body.classList.contains('dark')?'#f5efe4':'#263238'}
export function subColor(){return document.body.classList.contains('dark')?'#b9b0a2':'#8a8276'}
export function climateSeries(term){const d=adjusted(term);const ys=Array.from({length:10},(_,i)=>2016+i);const b=currentRegion==='south'?1.6:-1.1;const t=ys.map((y,i)=>Number((d.temp+(i-4.5)*0.16+Math.sin((i+currentTermIndex)*0.8)*0.55+b*.15).toFixed(1)));const r=ys.map((y,i)=>Math.max(2,Math.round(d.rain*.78+i*1.6+Math.cos(i*1.5+currentTermIndex)*5+(currentRegion==='south'?8:-4))));const s=ys.map((y,i)=>Math.max(3,Number((7+Math.cos(i+currentTermIndex/3)*1.4+(24-currentTermIndex%12)/12-(currentRegion==='south'?.5:0)).toFixed(1))));return {years:ys,temp:t,rain:r,sun:s}}
export function trendSeries(term){const d=adjusted(term);const b=22+currentTermIndex*2.1+d.rain*.18+(currentRegion==='south'?6:0);return [0,8,-2,12,7,16,22].map((v,i)=>Number(Math.max(10,Math.min(100,b+v+i*.9)).toFixed(2)))}
export function moduleScores(term){const d=adjusted(term),cs=climateSeries(term),tr=cs.temp.at(-1)-cs.temp[0];const fk=Math.round((d.active+d.rain+trendSeries(term).at(-1))/3);const ag=Math.round((d.active+d.rain+Math.max(10,92-Math.abs(d.temp-24)*2))/3);const tv=trendSeries(term).at(-1);return {temp:d.temp,rain:d.rain,active:d.active,lag:d.lag,trend:Number(tr.toFixed(2)),folk:fk,travel:tv,agri:ag,sun:Number((cs.sun.reduce((a,b)=>a+b,0)/cs.sun.length).toFixed(1)),avgTemp:Number((cs.temp.reduce((a,b)=>a+b,0)/cs.temp.length).toFixed(1)),avgRain:Math.round(cs.rain.reduce((a,b)=>a+b,0)/cs.rain.length)}}
export function chartTooltipValue(p){if(Array.isArray(p))return p.map(x=>`${x.marker}${x.seriesName}：${typeof x.value==='number'?fmt(x.value,2):x.value}`).join('<br>');return `${p.marker}${p.name}<br>${p.seriesName||'数值'}：${typeof p.value==='number'?fmt(p.value,2):p.value}`}
export function resizeCharts(){Object.values(charts).forEach(c=>c.resize());if(compareChart)compareChart.resize();if(analysisChart)analysisChart.resize()}