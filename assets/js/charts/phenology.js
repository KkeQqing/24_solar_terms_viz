// assets/js/charts/phenology.js
window.updatePhenology = (raw) => {
  const d = window.adjusted(raw);
  const color = raw.color;
  const tc = window.textColor();
  window.charts['phenology-chart'].setOption({
    tooltip: { formatter: (p) => window.chartTooltipValue ? window.chartTooltipValue(p) : JSON.stringify(p) },
    radar: { radius:'62%', indicator: [{name:'气温',max:46},{name:'湿度',max:100},{name:'日照',max:100},{name:'物候活跃',max:100},{name:'降雨',max:100}], axisName:{color:tc,fontSize:10}, splitLine:{lineStyle:{color:'rgba(128,128,128,.16)'}} },
    series: [{ name:'物候指数', type:'radar', data: [{ value: [Math.abs(d.temp)+10, Math.min(95,d.rain+20), Math.max(25,74-Math.abs(d.temp-22)), d.active, d.rain], areaStyle:{color,opacity:.32}, lineStyle:{color,width:2}, itemStyle:{color} }] }]
  });
  document.getElementById('phenology-desc').textContent = `${raw.name}至，${window.regionProfiles[window.currentRegion].desc}${raw.folk.join('、')}正当时，农事以“${raw.agri}”为要。`;
};