// assets/js/charts/climate.js
// 功能：渲染【近10年气候趋势图】（温度折线 + 降水柱状图）
// 作用：展示当前节气、当前地区的 10 年温度、降水变化

// 更新气候图表
// raw = 当前选中的节气完整数据（来自 data.js）
window.updateClimate = (raw) => {

  // 1. 生成 10 年模拟气候数据（温度、降水、日照）
  // 来自 utils.js → climateSeries()
  const series = window.climateSeries(raw);

  // 2. 获取当前主题文字颜色（适配深色/浅色模式）
  const tc = window.textColor();

  // 3. 当前节气的主题色（用于温度折线颜色）
  const color = raw.color;

  // 4. 计算 10 年平均温度
  const avgT = series.temp.reduce((a, b) => a + b, 0) / series.temp.length;

  // 5. 计算 10 年平均降水指数
  const avgR = series.rain.reduce((a, b) => a + b, 0) / series.rain.length;

  // 6. 计算温度趋势（最后一年 - 第一年 = 整体变暖/变冷）
  const trend = series.temp.at(-1) - series.temp[0];

  // ------------------------------
  // 把计算结果同步显示到页面文字上
  // ------------------------------
  // 显示平均温度
  document.getElementById('avg-temp').textContent = `${window.fmt(avgT, 1)}°C`;
  // 显示平均降水指数
  document.getElementById('avg-rain').textContent = `${window.fmt(avgR, 0)}%`;
  // 显示温度趋势（带正负号）
  document.getElementById('climate-trend').textContent = `${trend >= 0 ? '+' : ''}${window.fmt(trend, 1)}°C`;

  // ------------------------------
  // ECharts 图表渲染
  // ------------------------------
  window.charts['climate-chart'].setOption({

    // 悬浮提示框
    tooltip: { trigger: 'axis' },

    // 图例（气温、降水）
    legend: {
      top: 2,
      textStyle: { color: tc },
      data: ['平均气温', '降水指数']
    },

    // 图表内边距
    grid: { left: 36, right: 34, top: 38, bottom: 28 },

    // X轴：年份 2016~2025
    xAxis: {
      type: 'category',
      data: series.years,
      axisLabel: { color: tc }
    },

    // Y轴：两个（左侧温度、右侧降水）
    yAxis: [
      { type: 'value', name: '°C', axisLabel: { color: tc } }, // 左Y轴：温度
      { type: 'value', name: '降水', axisLabel: { color: tc }, splitLine: { show: false } } // 右Y轴：降水
    ],

    // 图表数据系列
    series: [
      // ① 蓝色柱子：降水指数
      {
        name: '降水指数',
        type: 'bar',            // 柱状图
        yAxisIndex: 1,         // 使用右侧Y轴
        data: series.rain,     // 10年降水数据
        barWidth: 10,          // 柱子宽度
        itemStyle: {
          borderRadius: [6, 6, 0, 0], // 顶部圆角
          color: 'rgba(92,173,255,.62)' // 半透明蓝色
        }
      },

      // ② 节气色折线：平均气温
      {
        name: '平均气温',
        type: 'line',          // 折线图
        smooth: true,          // 平滑曲线
        data: series.temp,     // 10年温度数据
        lineStyle: { color: color, width: 3 }, // 线条颜色、宽度
        itemStyle: { color: color } // 点颜色
      }
    ]
  });
};