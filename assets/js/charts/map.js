function updateMainMap(raw) {
  const d = adjusted(raw), color = raw.color, tc = textColor();
  const points = [
    { name: '华北', value: [30, 58, d.temp + 18], custom: `北方：${raw.north}` },
    { name: '江南', value: [58, 72, d.rain], custom: `南方：${raw.south}` },
    { name: '岭南', value: [72, 78, Math.max(10, d.rain - 2)], custom: `岭南：湿热更早，民俗游赏活跃` },
    { name: '西北', value: [22, 42, d.active], custom: `西北：干旱少雨，农时依赖灌溉` },
    { name: '青藏', value: [36, 78, Math.max(8, d.active - 10)], custom: `青藏：高寒物候滞后，昼夜温差大` },
    { name: '东北', value: [46, 30, d.temp + 24], custom: `东北：积温不足，物候整体偏迟` }
  ];
  
  charts['main-map'].setOption({
    tooltip: { formatter: p => `${p.name}<br>节律指数：${fmt(p.value[2], 2)}<br>${p.data.custom}` },
    grid: { left: 10, right: 10, top: 10, bottom: 10 },
    xAxis: { min: 0, max: 100, show: false },
    yAxis: { min: 0, max: 100, show: false },
    series: [
      {
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        data: [[[30, 58], [58, 72]], [[58, 72], [72, 78]], [[22, 42], [36, 78]], [[46, 30], [30, 58]], [[30, 58], [36, 78]]].map(coords => ({ coords })),
        lineStyle: { color, opacity: .25, width: 2, curveness: .22 },
        effect: { show: true, symbolSize: 5, color, period: 5 }
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'cartesian2d',
        data: points,
        symbolSize: v => Math.max(15, v[2] / 2.2),
        rippleEffect: { brushType: 'stroke', scale: 3 },
        label: { show: true, formatter: '{b}', color: tc, fontSize: 12 },
        itemStyle: { color, opacity: .75 }
      }
    ]
  });
}