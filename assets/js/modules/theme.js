// assets/js/modules/theme.js
window.toggleTheme = () => {
  document.body.classList.toggle('dark');
  if(window.updateCharts) window.updateCharts(window.solarTerms[window.currentTermIndex]);
  else if(window.refreshAllCharts) window.refreshAllCharts();
  if(window.compareChart) window.renderCompare();
  if(window.analysisChart) window.renderAnalysisChart(window.currentAnalysisType);
};