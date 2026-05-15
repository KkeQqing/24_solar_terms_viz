// assets/js/render.js
// 功能：【全局渲染控制器】
// 作用：更新所有图表、切换节气、切换地区、刷新页面文字、主题色

// 1. 一次性更新所有6个图表
window.updateCharts = (raw) => {
  window.updatePhenology(raw);    // 物候雷达图
  window.updateMainMap(raw);      // 中央地图
  window.updateFolk(raw);         // 民俗圆环图
  window.updateAgri(raw);          // 农事柱状图
  window.updateTravel(raw);        // 文旅热度图
  window.updateClimate(raw);      // 气候趋势图
};

// 2. 【核心】切换到指定节气（i = 节气序号）
window.selectTerm = (i) => {
  // 确保序号在 0~23 之间循环
  window.currentTermIndex = (i + 24) % 24;

  // 选中节气时，默认选中该节气的第一候（三候中的第一个）
  window.currentHouIndex = window.currentTermIndex * 3;

  // 获取当前节气的所有数据
  const raw = window.solarTerms[window.currentTermIndex];

  // ————————————————————————————————
  // 动态切换页面主题色（CSS变量）
  // ————————————————————————————————
  document.documentElement.style.setProperty('--season', raw.color);
  document.documentElement.style.setProperty('--season2', raw.color2);

  // ————————————————————————————————
  // 更新页面所有文字内容
  // ————————————————————————————————
  document.getElementById('solar-title').textContent = raw.name;
  document.getElementById('solar-pinyin').textContent = raw.pinyin;
  document.getElementById('current-solar-term').textContent = raw.name;
  document.getElementById('next-term-label').textContent =
    `| 距${window.solarTerms[(window.currentTermIndex + 1) % 24].name}约${window.daysToNextTerm(window.currentTermIndex)}天`;
  document.getElementById('poem-content').textContent = `“${raw.poem}”`;
  document.getElementById('three-hou').innerHTML =
    raw.hou.map((h, idx) => `<span>${['一', '二', '三'][idx]}候 · ${h}</span>`).join('');
  document.getElementById('daily-advice').textContent = raw.advice;
  document.getElementById('medal-tip').textContent = `领取·${raw.name}勋章`;

  // ————————————————————————————————
  // 刷新时间轴 + 收藏状态 + 所有图表
  // ————————————————————————————————
  window.refreshTimeline();
  window.updateFavoriteUI();
  window.updateCharts(raw);
};

// 3. 切换地区（南方 / 北方）
window.selectRegion = (region) => {
  window.currentRegion = region;
  document.getElementById('region-label').textContent = window.regionProfiles[region].label;
  document.querySelectorAll('.region-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.region === region);
  });
  window.selectTerm(window.currentTermIndex);
  window.toast(`已切换到${window.regionProfiles[region].label}`);
};

// 4. 初始化所有6个ECharts图表
window.initCharts = () => {
  const chartIds = [
    'phenology-chart',
    'main-map',
    'folk-chart',
    'agri-chart',
    'travel-chart',
    'climate-chart'
  ];
  chartIds.forEach(id => {
    window.charts[id] = echarts.init(document.getElementById(id));
  });
  window.addEventListener('resize', () => {
    Object.values(window.charts).forEach(c => c.resize());
  });
};

// 5. 刷新所有图表（快捷方法）
window.refreshAllCharts = () => {
  window.updateCharts(window.solarTerms[window.currentTermIndex]);
};

// 6. 图表悬浮提示框统一格式化
window.chartTooltipValue = (params) => {
  if (Array.isArray(params)) {
    return params.map(p =>
      `${p.marker}${p.seriesName}：${typeof p.value === 'number' ? window.fmt(p.value, 2) : p.value}`
    ).join('<br>');
  }
  return `${params.marker}${params.name}<br>数值：${typeof params.value === 'number' ? window.fmt(params.value, 2) : params.value}`;
};