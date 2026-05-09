// assets/js/app.js
// 整个项目的【主入口文件】
// 作用：页面加载完成后 → 初始化所有功能、图表、粒子、时间轴、事件

// 1. 创建背景动态粒子（飘落的光点动效）
window.createParticles = () => {
  const box = document.getElementById('particles'); // 粒子容器
  box.innerHTML = ''; // 清空

  // 生成 26 个动态粒子
  for (let i = 0; i < 26; i++) {
    const p = document.createElement('span');
    p.className = 'particle'; // 粒子样式
    p.style.left = `${Math.random() * 100}%`; // 随机水平位置
    p.style.animationDuration = `${10 + Math.random() * 15}s`; // 随机下落速度
    p.style.animationDelay = `${Math.random() * -18}s`; // 随机延迟
    box.appendChild(p);
  }
};

// 2. 页面加载完成后执行【所有初始化】
window.addEventListener('load', () => {
  // 显示当前日期（顶部右上角）
  document.getElementById('current-date').textContent = window.todayCN();

  // 初始化所有 ECharts 图表（气候、物候、民俗、农事、地图、文旅）
  window.initCharts();

  // 初始化底部 24 节气时间轴
  window.initTimeline();

  // 创建背景动态粒子动效
  window.createParticles();

  // 绑定所有按钮事件（搜索、收藏、分享、主题、轮播等）
  window.bindEvents();

  // 默认选中【南方】地区
  window.selectRegion('south');

  // 默认打开【第 2 个节气：雨水】(索引 1)
  window.selectTerm(1);

  // 延迟 180ms 刷新图表大小（避免错位）
  setTimeout(() => {
    Object.values(window.charts).forEach(c => c.resize());
  }, 180);
});