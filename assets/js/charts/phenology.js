// assets/js/charts/phenology.js
window.updatePhenology = (raw) => {
  const color = raw.color || '#d6a928';
  const tc = window.textColor ? window.textColor() : '#333';

  const rcd = window.realClimateData;
  const region = window.currentRegion || 'south';
  const beijingData = rcd?.terms?.[raw.name]?.beijing || {};
  const guangzhouData = rcd?.terms?.[raw.name]?.guangzhou || {};

  const northTemp = beijingData.temp ?? (raw.temp - 3);
  const northRain = (beijingData.rain ?? (raw.rain - 10)) / 5;
  const southTemp = guangzhouData.temp ?? raw.temp;
  const southRain = (guangzhouData.rain ?? raw.rain) / 5;

  // 已删除 northActive / southActive 的计算
  const northSun = Math.min(100, Math.max(20, northTemp * 2.8 + 10));
  const southSun = Math.min(100, Math.max(20, southTemp * 2.2 + 5));

  const isNorth = region === 'north';
  const currentTemp = isNorth ? northTemp : southTemp;
  const currentRain = isNorth ? northRain : southRain;
  const currentSun  = isNorth ? northSun : southSun;

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
        // 删除了 { name: '物候活跃', max: 100 }
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
          Math.abs(currentTemp) + 10,
          Math.min(95, currentRain + 20),
          currentSun,
          // 删除了 currentActive
          currentRain
        ],
        areaStyle: { color, opacity: .32 },
        lineStyle: { color, width: 2 },
        itemStyle: { color }
      }]
    }]
  });

  // 描述文字保持不变（只展示温度、降水）
  const descEl = document.getElementById('phenology-desc');
  if (descEl) {
    const regionLabel = window.regionProfiles[region]?.label || '南方';
    const oppositeLabel = region === 'north' ? '南方（广州）' : '北方（北京）';
    const currentDesc = isNorth
      ? `${raw.name}·北京 均温 ${northTemp.toFixed(1)}℃，降水 ${(northRain*5).toFixed(0)}mm`
      : `${raw.name}·广州 均温 ${southTemp.toFixed(1)}℃，降水 ${(southRain*5).toFixed(0)}mm`;
    const oppositeDesc = isNorth
      ? `广州 均温 ${southTemp.toFixed(1)}℃，降水 ${(southRain*5).toFixed(0)}mm`
      : `北京 均温 ${northTemp.toFixed(1)}℃，降水 ${(northRain*5).toFixed(0)}mm`;
    descEl.innerHTML = `
      <span style="font-weight:bold;">当前：${regionLabel}</span> —— ${currentDesc}
      <br><span style="font-size:12px;">对比${oppositeLabel}：${oppositeDesc}</span>
    `;
  }
};