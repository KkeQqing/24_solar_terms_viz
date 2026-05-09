// assets/js/charts/agri.js
// 功能：渲染【农事结构指数】柱状图
// 位置：大屏右侧第二个图表 → 农事结构指数

// 更新农事图表
// raw = 当前选中的节气完整数据（来自 data.js）
window.updateAgri = (raw) => {
  // 1. 根据当前是 南方/北方 → 自动调整温度、降水、物候数据
  const d = window.adjusted(raw);

  // 2. 获取当前节气的主题色（每个节气颜色不一样）
  const color = raw.color;

  // 3. 获取当前主题文字颜色（深色/浅色模式自动适配）
  const tc = window.textColor();

  // 4. 计算农事四项核心指数（图表展示的4个柱子）
  const agri = [
    d.active,                  // ① 农时指数（物候活跃度）
    Math.max(10, d.rain - 8),  // ② 水分指数（降水相关）
    Math.max(10, 92 - Math.abs(d.temp - 24) * 2), // ③ 适耕指数（温度越接近24度越高）
    45 + (window.currentTermIndex % 6) * 8        // ④ 管护指数（按节气规律变化）
  ];

  // 5. 调用 ECharts 实例，更新图表配置
  window.charts['agri-chart'].setOption({
    // 悬浮提示框：显示名称 + 指数（保留2位小数）
    tooltip: {
      formatter: p => `${p.name}<br>指数：${window.fmt(p.value, 2)}`
    },
    // X轴：4个分类标签
    xAxis: {
      type: 'category',
      data: ['农时', '水分', '适耕', '管护'], // 四个农事指标
      axisTick: { show: false },            // 不显示刻度线
      axisLabel: { color: tc }              // 文字颜色适配主题
    },
    // Y轴：隐藏，最大值100
    yAxis: { show: false, max: 100 },

    // 图表边距（紧凑布局）
    grid: { left: 10, right: 10, top: 18, bottom: 24 },

    // 柱状图系列
    series: [{
      name: '农事结构指数',
      type: 'bar',          // 柱状图
      data: agri,           // 4个柱子的数据
      barWidth: 18,         // 柱子宽度
      // 柱子样式：圆角 + 渐变色（从上到下：节气色 → 透明）
      itemStyle: {
        borderRadius: [10, 10, 0, 0], // 顶部圆角
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: color },       // 顶部：节气主色
          { offset: 1, color: 'rgba(255,255,255,0)' } // 底部：透明渐变
        ])
      }
    }]
  });
};