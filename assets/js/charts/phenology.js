// assets/js/charts/phenology.js
window.updatePhenology = (raw) => {
  const color = raw.color || '#d6a928';
  const tc = window.textColor ? window.textColor() : '#333';

  // 读取当前节气、当前地区的真实气候值
  const rcd = window.realClimateData;
  const region = window.currentRegion || 'south';
  const beijingData = rcd?.terms?.[raw.name]?.beijing || {};
  const guangzhouData = rcd?.terms?.[raw.name]?.guangzhou || {};

  // 雷达图数值：基于真实温度、降水计算（缩放适配0-100量纲）
  const northTemp = beijingData.temp ?? (raw.temp - 3);
  const northRain = (beijingData.rain ?? (raw.rain - 10)) / 5;  // 缩放
  const southTemp = guangzhouData.temp ?? raw.temp;
  const southRain = (guangzhouData.rain ?? raw.rain) / 5;

  // 物候活跃度：基于真实气温推算
  const northActive = Math.min(100, Math.max(0, (northTemp + 5) * 2.5));
  const southActive = Math.min(100, Math.max(0, southTemp * 3.2));

  // 日照指数估算
  const northSun = Math.min(100, Math.max(20, northTemp * 2.8 + 10));
  const southSun = Math.min(100, Math.max(20, southTemp * 2.2 + 5));

  // 根据当前地区选择雷达图数值（显示当前地区的雷达）
  const isNorth = region === 'north';
  const currentTemp   = isNorth ? northTemp : southTemp;
  const currentRain   = isNorth ? northRain : southRain;
  const currentActive = isNorth ? northActive : southActive;
  const currentSun    = isNorth ? northSun : southSun;

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
          Math.abs(currentTemp) + 10,
          Math.min(95, currentRain + 20),
          currentSun,
          currentActive,
          currentRain
        ],
        areaStyle: { color, opacity: .32 },
        lineStyle: { color, width: 2 },
        itemStyle: { color }
      }]
    }]
  });

  // 更新底部描述文字（南北对比）
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