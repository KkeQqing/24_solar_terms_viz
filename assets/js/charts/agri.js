function updateAgri(raw) {
  const d = adjusted(raw), color = raw.color, tc = textColor();
  const agri = [d.active, Math.max(10, d.rain - 8), Math.max(10, 92 - Math.abs(d.temp - 24) * 2), 45 + (currentTermIndex % 6) * 8];
  charts['agri-chart'].setOption({
    tooltip: { formatter: p => `${p.name}<br>指数：${fmt(p.value, 2)}` },
    xAxis: { type: 'category', data: ['农时', '水分', '适耕', '管护'], axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: tc, fontSize: 10 } },
    yAxis: { show: false, max: 100 },
    grid: { left: 10, right: 10, top: 18, bottom: 24 },
    series: [{
      name: '农事结构指数',
      type: 'bar',
      data: agri,
      barWidth: 18,
      itemStyle: {
        borderRadius: [10, 10, 0, 0],
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color },
          { offset: 1, color: 'rgba(255,255,255,0)' }
        ])
      }
    }]
  });
}