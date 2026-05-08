// 主题切换
function toggleTheme() {
  document.body.classList.toggle('dark');
  updateCharts(solarTerms[currentTermIndex]);
  if (compareChart) renderCompare();
  if (analysisChart) renderAnalysisChart(currentAnalysisType);
}