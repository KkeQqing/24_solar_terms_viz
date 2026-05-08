// assets/js/charts/climate.js
window.updateClimate = (raw) => {
  const series = window.climateSeries(raw);
  const tc = window.textColor();
  const color = raw.color;
  const avgT = series.temp.reduce((a,b)=>a+b,0)/series.temp.length;
  const avgR = series.rain.reduce((a,b)=>a+b,0)/series.rain.length;
  const trend = series.temp.at(-1)-series.temp[0];
  document.getElementById('avg-temp').textContent = `${window.fmt(avgT,1)}°C`;
  document.getElementById('avg-rain').textContent = `${window.fmt(avgR,0)}%`;
  document.getElementById('climate-trend').textContent = `${trend>=0?'+':''}${window.fmt(trend,1)}°C`;
  window.charts['climate-chart'].setOption({
    tooltip: { trigger:'axis' }, legend: { top:2, textStyle:{color:tc}, data:['平均气温','降水指数'] },
    grid: { left:36, right:34, top:38, bottom:28 },
    xAxis: { type:'category', data: series.years, axisLabel:{color:tc} },
    yAxis: [{ type:'value', name:'°C', axisLabel:{color:tc} },{ type:'value', name:'降水', axisLabel:{color:tc}, splitLine:{show:false} }],
    series: [{ name:'降水指数', type:'bar', yAxisIndex:1, data:series.rain, barWidth:10, itemStyle:{borderRadius:[6,6,0,0], color:'rgba(92,173,255,.62)'} },{ name:'平均气温', type:'line', smooth:true, data:series.temp, lineStyle:{color,width:3}, itemStyle:{color} }]
  });
};