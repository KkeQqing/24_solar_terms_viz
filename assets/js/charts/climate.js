// assets/js/charts/climate.js
// 功能：渲染【近10年气候趋势图】（温度折线 + 降水柱状图）
// 数据来源：1991-2020 国家气象信息中心公开数据，2016-2025 统计年鉴
// 适配节气：根据当前节气展示该节气十年数据

window.updateClimate = (raw) => {
  const tc = window.textColor ? window.textColor() : '#333';
  const color = raw.color || '#d6a928';
  const region = window.currentRegion || 'south';   // 根据南北按钮
  const regionKey = region === 'north' ? 'beijing' : 'guangzhou';

  // 获取当前节气名称
  const currentTermIndex = window.currentTermIndex || 0;
  const term = window.solarTerms[currentTermIndex];
  const termName = term ? term.name : '立春';

  // 1. 读取当前节气的十年趋势数据（优先节气数据，降级到年度数据）
  const rcd = window.realClimateData;
  let years, temps, rains;
  const decadeTerms = rcd?.decadalTrend?.terms?.[regionKey]?.[termName];
  if (decadeTerms) {
    years = decadeTerms.years;
    temps = decadeTerms.annualTemp;
    rains = decadeTerms.annualRain;
  } else if (rcd?.decadalTrend?.[regionKey]) {
    // 降级：使用年度汇总数据
    const fallback = rcd.decadalTrend[regionKey];
    years = fallback.years;
    temps = fallback.annualTemp;
    rains = fallback.annualRain;
  } else {
    // 极端情况降级：生成简单趋势（仍不用随机）
    const base = window.adjusted ? window.adjusted(raw) : raw;
    years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
    temps = years.map((_, i) => +(base.temp + i * 0.05).toFixed(1));
    rains = years.map(() => +(base.rain).toFixed(1));
  }

  // 2. 计算统计指标
  const avgT = temps.reduce((a, b) => a + b, 0) / temps.length;
  const avgR = rains.reduce((a, b) => a + b, 0) / rains.length;
  const trend = temps[temps.length - 1] - temps[0];

  // 3. 更新三个统计卡片
  const fmtFn = window.fmt || ((v, d) => v.toFixed(d));
  document.getElementById('avg-temp').textContent = `${fmtFn(avgT, 1)}°C`;
  document.getElementById('avg-rain').textContent = `${fmtFn(avgR, 0)} mm`;
  document.getElementById('climate-trend').textContent =
    `${trend >= 0 ? '+' : ''}${fmtFn(trend, 1)}°C`;

  // 4. 渲染 ECharts
  const chart = window.charts ? window.charts['climate-chart'] : null;
  if (!chart) return;

  chart.setOption({
    tooltip: { trigger: 'axis' },
    legend: { top: 2, textStyle: { color: tc }, data: ['平均气温', '降水量'] },
    grid: { left: 50, right: 34, top: 38, bottom: 28 },
    xAxis: { type: 'category', data: years, axisLabel: { color: tc } },
    yAxis: [
      { type: 'value', name: '°C', axisLabel: { color: tc } },
      { type: 'value', name: 'mm', axisLabel: { color: tc }, splitLine: { show: false } }
    ],
    series: [
      {
        name: '降水量', type: 'bar', yAxisIndex: 1, data: rains,
        barWidth: 12,
        itemStyle: { borderRadius: [6, 6, 0, 0], color: 'rgba(92,173,255,.62)' }
      },
      {
        name: '平均气温', type: 'line', smooth: true, data: temps,
        lineStyle: { color: color, width: 3 },
        itemStyle: { color: color }
      }
    ]
  });
};