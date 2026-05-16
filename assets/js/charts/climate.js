// assets/js/charts/climate.js
// 功能：渲染【近10年气候趋势图】（温度折线 + 降水柱状图）
// 作用：展示当前节气、当前地区的 10 年温度、降水变化

window.updateClimate = (raw) => {
  // 1. 获取十年气候数据（优先使用 climateSeries，否则生成模拟数据）
  let series;
  if (window.climateSeries && typeof window.climateSeries === 'function') {
    series = window.climateSeries(raw);
  } else {
    // 降级：自动生成模拟数据
    const d = window.adjusted ? window.adjusted(raw) : raw;
    const baseTemp = d.temp || 20;
    const baseRain = d.rain || 50;
    series = {
      years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
      temp: Array.from({ length: 10 }, () => +(baseTemp + (Math.random() - 0.5) * 1.5).toFixed(1)),
      rain: Array.from({ length: 10 }, () => +(baseRain + (Math.random() - 0.5) * 15).toFixed(1))
    };
  }

  // 2. 主题文字颜色
  const tc = window.textColor ? window.textColor() : '#333';
  const color = raw.color || '#d6a928';

  // 3. 计算统计指标
  const avgT = series.temp.reduce((a, b) => a + b, 0) / series.temp.length;
  const avgR = series.rain.reduce((a, b) => a + b, 0) / series.rain.length;
  const trend = series.temp[series.temp.length - 1] - series.temp[0];

  // 4. 更新统计卡片
  const avgTempEl = document.getElementById('avg-temp');
  const avgRainEl = document.getElementById('avg-rain');
  const trendEl = document.getElementById('climate-trend');
  if (avgTempEl) avgTempEl.textContent = `${window.fmt ? window.fmt(avgT, 1) : avgT.toFixed(1)}°C`;
  if (avgRainEl) avgRainEl.textContent = `${window.fmt ? window.fmt(avgR, 0) : Math.round(avgR)}%`;
  if (trendEl) trendEl.textContent = `${trend >= 0 ? '+' : ''}${window.fmt ? window.fmt(trend, 1) : trend.toFixed(1)}°C`;

  // 5. 渲染 ECharts 图表
  const chart = window.charts ? window.charts['climate-chart'] : null;
  if (!chart) return;

  chart.setOption({
    tooltip: { trigger: 'axis' },
    legend: {
      top: 2,
      textStyle: { color: tc },
      data: ['平均气温', '降水指数']
    },
    grid: { left: 36, right: 34, top: 38, bottom: 28 },
    xAxis: {
      type: 'category',
      data: series.years,
      axisLabel: { color: tc }
    },
    yAxis: [
      { type: 'value', name: '°C', axisLabel: { color: tc } },
      { type: 'value', name: '降水', axisLabel: { color: tc }, splitLine: { show: false } }
    ],
    series: [
      {
        name: '降水指数',
        type: 'bar',
        yAxisIndex: 1,
        data: series.rain,
        barWidth: 10,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: 'rgba(92,173,255,.62)'
        }
      },
      {
        name: '平均气温',
        type: 'line',
        smooth: true,
        data: series.temp,
        lineStyle: { color: color, width: 3 },
        itemStyle: { color: color }
      }
    ]
  });
};