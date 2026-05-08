// assets/js/charts/folk.js
window.updateFolk = (raw) => {
  const tc = window.textColor();
  const color = raw.color;
  const d = window.adjusted(raw);
  window.charts['folk-chart'].setOption({
    tooltip: { trigger:'item', formatter: p => `${p.name}<br>占比：${window.fmt(p.percent,2)}%` },
    series: [{ type:'pie', radius:['42%','70%'], center:['50%','53%'], itemStyle:{borderRadius:10, borderColor:'rgba(255,255,255,.78)', borderWidth:2}, label:{color:tc,fontSize:10}, data:[{value:42,name:raw.folk[0], itemStyle:{color}}, {value:33,name:raw.folk[1], itemStyle:{color:'#d6a928'}}, {value:25,name:'时令游赏', itemStyle:{color:'rgba(150,150,150,.32)'}}] }],
    graphic: [{ type:'text', left:'center', top:'center', style:{ text:`民俗\n${Math.round((d.active+d.rain)/2)}`, textAlign:'center', fill:tc, font:'700 14px Noto Sans SC' } }]
  });
};