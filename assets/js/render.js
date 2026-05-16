// assets/js/render.js
// 功能：【全局渲染控制器】
// 作用：更新图表、切换节气、切换地区、加载候页面

// 1. 一次性更新所有图表（已移除地图）
window.updateCharts = (raw) => {
  window.updatePhenology(raw);    // 物候雷达图
  window.updateFolk(raw);         // 民俗圆环图
  window.updateTravel(raw);      // 节气趣味科普小卡片
  window.updateClimate(raw);      // 气候趋势图
};

// 2. 【核心】切换到指定节气（i = 节气序号）
window.selectTerm = (i) => {
  window.currentTermIndex = (i + 24) % 24;

  // 默认选中该节气的第一候
  window.currentHouIndex = window.currentTermIndex * 3;
  window.loadHouPage(window.currentHouIndex);

  const raw = window.solarTerms[window.currentTermIndex];

  // 动态切换主题色
  document.documentElement.style.setProperty('--season', raw.color);
  document.documentElement.style.setProperty('--season2', raw.color2);

  // 刷新时间轴、收藏状态、图表
  window.refreshTimeline();
  window.updateCharts(raw);
};

// 3. 切换地区（南方 / 北方）
// 切换地区（南方 / 北方）
window.selectRegion = (region) => {
  window.currentRegion = region;

  // 更新地区标签和按钮样式
  document.getElementById('region-label').textContent = window.regionProfiles[region].label;
  document.querySelectorAll('.region-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.region === region);
  });

  // 获取当前节气数据
  const raw = window.solarTerms[window.currentTermIndex];

  // 切换主题色（根据当前节气）
  document.documentElement.style.setProperty('--season', raw.color);
  document.documentElement.style.setProperty('--season2', raw.color2);

  // 刷新时间轴高亮（不改变候选中状态）
  window.refreshTimeline();

  // 刷新所有图表（它们内部会读取 window.currentRegion 调整数据）
  window.updateCharts(raw);

  // 提示信息
  window.toast(`已切换到${window.regionProfiles[region].label}`);
};

// 4. 初始化 ECharts 图表（已移除地图）
window.initCharts = () => {
  const chartIds = [
    'phenology-chart',
    'folk-chart',
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

// ========== 加载72候页面 ==========
window.loadHouPage = (houIndex) => {
  const idx = ((houIndex % 72) + 72) % 72;
  const seasonOffset = Math.floor(idx / 18);
  const termInSeason = Math.floor((idx % 18) / 3);
  const houInTerm = (idx % 3) + 1;

  const seasonNames = ['spring', 'summer', 'autumn', 'winter'];
  const season = seasonNames[seasonOffset];
  const termNum = termInSeason + 1;
  const houNum = houInTerm;

  const path = `hou-pages/${season}/${termNum}_${houNum}.html`;
  const iframe = document.getElementById('hou-iframe');
  if (iframe) {
    iframe.src = path;
  }
};