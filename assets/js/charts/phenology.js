function updatePhenology(raw) {
  const d = adjusted(raw), color = raw.color, tc = textColor();
  charts['phenology-chart'].setOption({
    tooltip: { formatter: p => chartTooltipValue(p) },
    radar: {
      radius: '62%',
      indicator: [{ name: '气温', max: 46 }, { name: '湿度', max: 100 }, { name: '日照', max: 100 }, { name: '物候活跃', max: 100 }, { name: '降雨', max: 100 }],
      axisName: { color: tc, fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(128,128,128,.16)' } },
      axisLine: { lineStyle: { color: 'rgba(128,128,128,.16)' } },
      splitArea: { areaStyle: { color: ['rgba(255,255,255,.03)', 'rgba(255,255,255,.09)'] } }
    },
    series: [{
      name: '物候指数',
      type: 'radar',
      data: [{
        value: [Math.abs(d.temp) + 10, Math.min(95, d.rain + 20), Math.max(25, 74 - Math.abs(d.temp - 22)), d.active, d.rain],
        areaStyle: { color, opacity: .32 },
        lineStyle: { color, width: 2 },
        itemStyle: { color }
      }]
    }]
  });
  $('phenology-desc').textContent = `${raw.name}至，${regionProfiles[currentRegion].desc}${raw.folk.join('、')}正当时，农事以“${raw.agri}”为要。`;
}