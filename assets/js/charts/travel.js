function updateTravel(raw) {
  const color = raw.color, trend = trendSeries(raw);
  charts['travel-chart'].setOption({
    tooltip: { trigger: 'axis', formatter: chartTooltipValue },
    xAxis: { type: 'category', boundaryGap: false, data: ['一', '二', '三', '四', '五', '六', '日'], show: false },
    yAxis: { show: false, max: 100 },
    grid: { left: 6, right: 8, top: 16, bottom: 10 },
    series: [{
      name: '文旅热度',
      type: 'line',
      smooth: true,
      data: trend,
      areaStyle: { opacity: .14, color },
      lineStyle: { color, width: 3 },
      symbolSize: 5,
      itemStyle: { color }
    }]
  });
  $('trend-score').textContent = `热度 ${fmt(trend.at(-1), 2)}`;
}