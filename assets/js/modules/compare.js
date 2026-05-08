// assets/js/modules/compare.js
window.openCompare = (compareIndex) => {
  const a = document.getElementById('compare-a'), b = document.getElementById('compare-b');
  a.innerHTML = b.innerHTML = window.solarTerms.map((t,i)=>`<option value="${i}">${t.name}</option>`).join('');
  a.value = window.currentTermIndex;
  b.value = typeof compareIndex === 'number' ? compareIndex : (window.currentTermIndex+6)%24;
  if(Number(a.value)===Number(b.value)) b.value = (Number(a.value)+6)%24;
  document.getElementById('compare-modal').style.display = 'flex';
  setTimeout(() => { if(!window.compareChart) window.compareChart = echarts.init(document.getElementById('compare-chart')); window.renderCompare(); }, 60);
};
window.renderCompare = () => {
  const ai = Number(document.getElementById('compare-a').value), bi = Number(document.getElementById('compare-b').value);
  const a = window.adjusted(window.solarTerms[ai]), b = window.adjusted(window.solarTerms[bi]), tc = window.textColor();
  window.compareChart.setOption({ legend:{ data:[a.name,b.name], bottom:0, left:'center', textStyle:{color:tc} }, radar:{ indicator:[{name:'气温',max:46},{name:'文旅',max:100},{name:'农时',max:100},{name:'物候',max:100},{name:'降雨',max:100}], axisName:{color:tc} }, series:[{ type:'radar', data:[{ name:a.name, value:[Math.abs(a.temp)+10, window.trendSeries(window.solarTerms[ai]).at(-1), 72, a.active, a.rain] },{ name:b.name, value:[Math.abs(b.temp)+10, window.trendSeries(window.solarTerms[bi]).at(-1), 68, b.active, b.rain] }] }] });
  window.compareChart.resize();
};