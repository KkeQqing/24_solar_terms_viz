// assets/js/modules/analysis.js
window.openAnalysis = (type='summary') => {
  window.currentAnalysisType = type;
  const t = window.solarTerms[window.currentTermIndex], s = window.moduleScores(t);
  const meta = { summary:{title:'综合解读',subtitle:'把节气文化、气候、农事、民俗、文旅统一成一个可讲述的数据故事。'}, phenology:{title:'南北物候分析',subtitle:'展示同一节气在南北地区的时间差、温度差、植被差。'}, climate:{title:'气候变化分析',subtitle:'把近十年均温、降水、日照作为专业数据支撑。'}, folk:{title:'民俗分布分析',subtitle:'用民俗参与度、地域覆盖、文化热度表达节气文化。'}, agri:{title:'农事适宜分析',subtitle:'突出节气对传统农业生产节奏的指导价值。'}, travel:{title:'文旅热度分析',subtitle:'将节气与现代文旅消费、景点热度进行关联。'}, space:{title:'空间分异分析',subtitle:'把华北、江南、岭南、西北、青藏、东北差异可视化。'} };
  document.getElementById('analysis-title').textContent = `${t.name} · ${meta[type]?.title || '综合分析'}`;
  document.getElementById('analysis-subtitle').textContent = meta[type]?.subtitle || '';
  const kpisHtml = `<div class="modal-kpi"><p class="hint">综合指数</p><div class="text-2xl font-black">${window.fmt((s.folk+s.agri+s.travel)/3,2)}</div><p class="hint">文化、生产、文旅三维均值</p></div><div class="modal-kpi"><p class="hint">物候活跃</p><div class="text-2xl font-black">${s.active}</div><p class="hint">反映植被与候鸟等节律</p></div><div class="modal-kpi"><p class="hint">核心农事</p><div class="text-2xl font-black">${t.agri}</div><p class="hint">关联${t.name}生产节奏</p></div>`;
  document.getElementById('analysis-kpis').innerHTML = kpisHtml;
  document.getElementById('analysis-text').innerHTML = `<p>${t.name}的综合解读应围绕“物候现象—气候条件—农事行动—民俗传播”展开。当前综合指数为 ${window.fmt((s.folk+s.agri+s.travel)/3,2)}，说明该节气既有自然节律，也具备文化转译价值。</p><p class="mt-2">在页面讲解中，可以先用主地图说明地域差异，再用左右两侧卡片补充气候、农事、民俗和文旅热度，形成完整叙事链。</p>`;
  document.getElementById('analysis-source').innerHTML = `<p>当前数据为演示型指数数据，已随“节气序号 + 南北区域参数”动态计算。节气：${t.name}；区域：${window.regionProfiles[window.currentRegion].label}；基础温度：${t.temp}°C；基础降水：${t.rain}%。</p>`;
  document.getElementById('analysis-modal').style.display = 'flex';
  setTimeout(() => window.renderAnalysisChart(type), 60);
};
window.renderAnalysisChart = (type) => {
  const t = window.solarTerms[window.currentTermIndex], s = window.moduleScores(t), tc = window.textColor();
  if(!window.analysisChart) window.analysisChart = echarts.init(document.getElementById('analysis-chart'));
  window.analysisChart.clear();
  window.analysisChart.setOption({ tooltip:{}, radar:{ indicator:[{name:'气候',max:100},{name:'物候',max:100},{name:'民俗',max:100},{name:'农事',max:100},{name:'文旅',max:100}], axisName:{color:tc} }, series:[{ type:'radar', data:[{ name:t.name, value:[Math.min(100,Math.abs(s.temp)+30), s.active, s.folk, s.agri, s.travel], areaStyle:{opacity:.22}, lineStyle:{width:3}, itemStyle:{color:t.color} }] }] });
  window.analysisChart.resize();
};