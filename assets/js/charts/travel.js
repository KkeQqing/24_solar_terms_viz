// assets/js/charts/travel.js
window.updateTravel = (raw) => {
  const color = raw.color;
  const trend = window.trendSeries(raw);
  window.charts['travel-chart'].setOption({
    tooltip: { trigger:'axis' },
    xAxis: { type:'category', boundaryGap:false, data:['一','二','三','四','五','六','日'], show:false },
    yAxis: { show:false, max:100 }, grid: { left:6, right:8, top:16, bottom:10 },
    series: [{ name:'文旅热度', type:'line', smooth:true, data:trend, areaStyle:{opacity:.14,color}, lineStyle:{color,width:3}, symbolSize:5, itemStyle:{color} }]
  });
  document.getElementById('trend-score').textContent = `热度 ${window.fmt(trend.at(-1),2)}`;
};