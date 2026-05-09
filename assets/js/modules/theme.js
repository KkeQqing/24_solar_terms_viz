// assets/js/modules/theme.js
// 功能：【深色/浅色主题切换】
// 作用：点击按钮 → 切换亮/暗模式 → 所有图表自动刷新适配新主题

// 切换主题（亮 ↔ 暗）
window.toggleTheme = () => {

  // 1. 给页面 body 切换 .dark 类
  // CSS 会根据这个类自动切换颜色变量
  document.body.classList.toggle('dark');

  // 2. 如果有全局刷新图表方法 → 调用（重新渲染所有图表）
  if (window.updateCharts) {
    window.updateCharts(window.solarTerms[window.currentTermIndex]);
  } 
  // 备用刷新方法
  else if (window.refreshAllCharts) {
    window.refreshAllCharts();
  }

  // 3. 如果【对比弹窗】已打开 → 刷新对比图
  if (window.compareChart) {
    window.renderCompare();
  }

  // 4. 如果【分析弹窗】已打开 → 刷新分析图
  if (window.analysisChart) {
    window.analysisChart.renderAnalysisChart(window.currentAnalysisType);
  }
};