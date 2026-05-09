// assets/js/charts/phenology.js
// 功能：渲染【物候指数雷达图】（五边形雷达图）
// 作用：展示当前节气的气温、湿度、日照、物候活跃、降雨 5 项指标

// 更新物候图表
// raw = 当前选中的节气完整数据
window.updatePhenology = (raw) => {

  // 1. 根据南方/北方 → 自动调整温度、降水、物候数据
  const d = window.adjusted(raw);

  // 2. 当前节气的主题色（雷达图颜色）
  const color = raw.color;

  // 3. 文字颜色（适配深色/浅色模式）
  const tc = window.textColor();

  // 4. 渲染 ECharts 雷达图
  window.charts['phenology-chart'].setOption({

    // 悬浮提示框
    tooltip: {
      formatter: (p) => window.chartTooltipValue ? window.chartTooltipValue(p) : JSON.stringify(p)
    },

    // 雷达图配置（五边形 5 个维度）
    radar: {
      radius: '62%',                     // 雷达图大小
      // 5 个指标（雷达图 5 个角）
      indicator: [
        { name: '气温', max: 46 },        // 气温 0~46℃
        { name: '湿度', max: 100 },       // 湿度 0~100
        { name: '日照', max: 100 },       // 日照 0~100
        { name: '物候活跃', max: 100 },   // 物候活跃度 0~100
        { name: '降雨', max: 100 }        // 降雨量 0~100
      ],
      axisName: { color: tc, fontSize: 10 }, // 文字颜色
      splitLine: { lineStyle: { color: 'rgba(128,128,128,.16)' } } // 网格线
    },

    // 图表数据系列
    series: [{
      name: '物候指数',
      type: 'radar',        // 类型：雷达图
      data: [{
        // 5 个维度的数值（对应上面 5 个指标）
        value: [
          Math.abs(d.temp) + 10,      // 气温
          Math.min(95, d.rain + 20), // 湿度
          Math.max(25, 74 - Math.abs(d.temp - 22)), // 日照
          d.active,                  // 物候活跃
          d.rain                     // 降雨
        ],
        areaStyle: { color, opacity: .32 },    // 填充区域半透明
        lineStyle: { color, width: 2 },        // 边框线
        itemStyle: { color }                   // 顶点颜色
      }]
    }]
  });

  // 5. 更新下方物候说明文字
  document.getElementById('phenology-desc').textContent =
    `${raw.name}至，${window.regionProfiles[window.currentRegion].desc}` +
    `${raw.folk.join('、')}正当时，农事以“${raw.agri}”为要。`;
};