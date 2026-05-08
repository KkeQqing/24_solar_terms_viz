// 页面加载完成后初始化
window.addEventListener('load', () => {
  $('current-date').textContent = todayCN();
  initCharts();
  initTimeline();
  createParticles();
  bindEvents();
  selectRegion('south');
  selectTerm(1);
  setTimeout(resizeCharts, 180);
});