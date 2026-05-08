// 初始化图表实例
function initCharts() {
  ['phenology-chart', 'main-map', 'folk-chart', 'agri-chart', 'travel-chart', 'climate-chart'].forEach(id => charts[id] = echarts.init($(id)));
  window.addEventListener('resize', resizeCharts);
}

// 图表自适应
function resizeCharts() {
  Object.values(charts).forEach(c => c.resize());
  if (compareChart) compareChart.resize();
  if (analysisChart) analysisChart.resize();
}

// 切换节气
function selectTerm(i) {
  currentTermIndex = (i + 24) % 24;
  const raw = solarTerms[currentTermIndex];
  document.documentElement.style.setProperty('--season', raw.color);
  document.documentElement.style.setProperty('--season2', raw.color2);
  $('solar-title').textContent = raw.name;
  $('solar-pinyin').textContent = raw.pinyin;
  $('current-solar-term').textContent = raw.name;
  $('next-term-label').textContent = `| 距${solarTerms[(currentTermIndex + 1) % 24].name}约${daysToNextTerm(currentTermIndex)}天`;
  $('poem-content').textContent = `“${raw.poem}”`;
  $('three-hou').innerHTML = raw.hou.map((h, idx) => `<span>${['一', '二', '三'][idx]}候 · ${h}</span>`).join('');
  $('daily-advice').textContent = raw.advice;
  $('medal-tip').textContent = `领取·${raw.name}勋章`;
  refreshTimeline();
  updateFavoriteUI();
  updateCharts(raw);
}

// 更新所有图表
function updateCharts(raw) {
  updatePhenology(raw);
  updateMainMap(raw);
  updateFolk(raw);
  updateAgri(raw);
  updateTravel(raw);
  updateClimate(raw);
}

// 打开模态框
function openModal(id) {
  $(id).style.display = 'flex';
  resizeCharts();
}

// 关闭模态框
function closeModal(id) {
  $(id).style.display = 'none';
}

// 创建粒子背景
function createParticles() {
  const box = $('particles');
  box.innerHTML = '';
  for (let i = 0; i < 26; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${10 + Math.random() * 15}s`;
    p.style.animationDelay = `${Math.random() * -18}s`;
    box.appendChild(p);
  }
}

// 全屏切换
function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
}