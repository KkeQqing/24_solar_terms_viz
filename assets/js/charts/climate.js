function updateClimate(raw) {
  const series = climateSeries(raw), tc = textColor(), color = raw.color;
  const avgT = series.temp.reduce((a, b) => a + b, 0) / series.temp.length;
  const avgR = series.rain.reduce((a, b) => a + b, 0) / series.rain.length;
  const trend = series.temp.at(-1) - series.temp[0];
  
  $('avg-temp').textContent = `${fmt(avgT, 1)}°C`;
  $('avg-rain').textContent = `${fmt(avgR, 0)}%`;
  $('climate-trend').textContent = `${trend >= 0 ? '+' : ''}${fmt(trend, 1)}°C`;
  
  charts['climate-chart'].setOption({
    tooltip: { trigger: 'axis', formatter: chartTooltipValue },
    legend: { top: 2, textStyle: { color: tc, fontSize: 10 }, data: ['平均气温', '降水指数'] },
    grid: { left: 36, right: 34, top: 38, bottom: 28 },
    xAxis: { type: 'category', data: series.years, axisLabel: { color: tc, fontSize: 9 }, axisLine: { lineStyle: { color: 'rgba(128,128,128,.2)' } } },
    yAxis: [
      { type: 'value', name: '°C', axisLabel: { color: tc, fontSize: 9 }, splitLine: { lineStyle: { color: 'rgba(128,128,128,.12)' } } },
      { type: 'value', name: '降水', axisLabel: { color: tc, fontSize: 9 }, splitLine: { show: false } }
    ],
    series: [
      { name: '降水指数', type: 'bar', yAxisIndex: 1, data: series.rain, barWidth: 10, itemStyle: { borderRadius: [6, 6, 0, 0], color: 'rgba(92,173,255,.62)' } },
      { name: '平均气温', type: 'line', smooth: true, data: series.temp, symbolSize: 5, lineStyle: { color, width: 3 }, itemStyle: { color } }
    ]
  });
}