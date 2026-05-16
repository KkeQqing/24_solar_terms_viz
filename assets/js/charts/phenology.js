// assets/js/charts/phenology.js
window.updatePhenology = (raw) => {
  const d = window.adjusted ? window.adjusted(raw) : raw;
  const color = raw.color || '#d6a928';
  const tc = window.textColor ? window.textColor() : '#333';

  const chart = window.charts['phenology-chart'];
  if (!chart) return;
  chart.setOption({
    tooltip: {
      formatter: (p) => window.chartTooltipValue ? window.chartTooltipValue(p) : JSON.stringify(p)
    },
    radar: {
      radius: '62%',
      indicator: [
        { name: '气温', max: 46 },
        { name: '湿度', max: 100 },
        { name: '日照', max: 100 },
        { name: '物候活跃', max: 100 },
        { name: '降雨', max: 100 }
      ],
      axisName: { color: tc, fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(128,128,128,.16)' } }
    },
    series: [{
      name: '物候指数',
      type: 'radar',
      data: [{
        value: [
          Math.abs(d.temp) + 10,
          Math.min(95, d.rain + 20),
          Math.max(25, 74 - Math.abs(d.temp - 22)),
          d.active,
          d.rain
        ],
        areaStyle: { color, opacity: .32 },
        lineStyle: { color, width: 2 },
        itemStyle: { color }
      }]
    }]
  });

  // 在 updatePhenology 函数的最后部分
  const descEl = document.getElementById('phenology-desc');
  if (descEl) {
    const region = window.currentRegion || 'south';
    const profile = window.regionProfiles[region] || {};
    const opposite = region === 'north' ? '南方' : '北方';
    descEl.innerHTML = `
      <span style="font-weight:bold;">当前：${profile.label}</span> —— ${profile.desc || ''}
      <br><span style="font-size:12px;">对比${opposite}：${region === 'north' ? raw.south : raw.north}</span>
    `;
  }
};