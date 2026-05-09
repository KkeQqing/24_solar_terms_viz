// assets/js/charts/travel.js
// 功能：渲染【文旅热度趋势图】（平滑面积曲线图）
// 作用：展示一周文旅热度，用于判断节气是否适合出游

// 更新文旅热度图表
// raw = 当前选中的节气数据
window.updateTravel = (raw) => {

  // 1. 获取当前节气的主题色（曲线颜色）
  const color = raw.color;

  // 2. 生成 7 天热度数据（来自 utils.js 的 trendSeries）
  const trend = window.trendSeries(raw);

  // 3. 渲染 ECharts 曲线图
  window.charts['travel-chart'].setOption({

    // 悬浮提示框
    tooltip: { trigger: 'axis' },

    // X轴：周一到周日（隐藏不显示）
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['一', '二', '三', '四', '五', '六', '日'],
      show: false
    },

    // Y轴：隐藏，最大值 100
    yAxis: { show: false, max: 100 },

    // 图表紧凑布局
    grid: { left: 6, right: 8, top: 16, bottom: 10 },

    // 系列：平滑面积曲线
    series: [{
      name: '文旅热度',
      type: 'line',        // 折线图
      smooth: true,        // 平滑曲线
      data: trend,         // 7 天热度数据
      areaStyle: { opacity: .14, color }, // 下方半透明填充
      lineStyle: { color, width: 3 },      // 曲线样式
      symbolSize: 5,                       // 点大小
      itemStyle: { color }                // 点颜色
    }]
  });

  // 4. 把【最终热度值】显示到图表上方
  document.getElementById('trend-score').textContent = `热度 ${window.fmt(trend.at(-1), 2)}`;
};