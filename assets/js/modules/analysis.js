// assets/js/modules/analysis.js
// 功能：【节气分析弹窗】
// 作用：点击分析按钮 → 弹出弹窗，展示当前节气的综合指标 + 雷达图 + 文字说明

// 1. 打开分析弹窗（type=分析类型：summary/phenology/climate等）
window.openAnalysis = (type='summary') => {
  // 记录当前打开的分析类型
  window.currentAnalysisType = type;

  // 获取当前节气数据 + 计算好的评分
  const t = window.solarTerms[window.currentTermIndex];
  const s = window.moduleScores(t);

  // 各种分析类型对应的标题和副标题
  const meta = {
    summary:  {title:'综合解读',   subtitle:'把节气文化、气候、农事、民俗、文旅统一成一个可讲述的数据故事。'},
    phenology:{title:'南北物候分析',subtitle:'展示同一节气在南北地区的时间差、温度差、植被差。'},
    climate:  {title:'气候变化分析',subtitle:'把近十年均温、降水、日照作为专业数据支撑。'},
    folk:     {title:'民俗分布分析',subtitle:'用民俗参与度、地域覆盖、文化热度表达节气文化。'},
    agri:     {title:'农事适宜分析',subtitle:'突出节气对传统农业生产节奏的指导价值。'},
    travel:   {title:'文旅热度分析',subtitle:'将节气与现代文旅消费、景点热度进行关联。'},
    space:    {title:'空间分异分析',subtitle:'把华北、江南、岭南、西北、青藏、东北差异可视化。'}
  };

  // --------------------------
  // 把标题、副标题渲染到页面
  // --------------------------
  document.getElementById('analysis-title').textContent = `${t.name} · ${meta[type]?.title || '综合分析'}`;
  document.getElementById('analysis-subtitle').textContent = meta[type]?.subtitle || '';

  // --------------------------
  // 生成 3 个核心 KPI 指标卡片
  // --------------------------
  const kpisHtml = `
    <div class="modal-kpi">
      <p class="hint">综合指数</p>
      <div class="text-2xl font-black">${window.fmt((s.folk+s.agri+s.travel)/3,2)}</div>
      <p class="hint">文化、生产、文旅三维均值</p>
    </div>
    <div class="modal-kpi">
      <p class="hint">物候活跃</p>
      <div class="text-2xl font-black">${s.active}</div>
      <p class="hint">反映植被与候鸟等节律</p>
    </div>
    <div class="modal-kpi">
      <p class="hint">核心农事</p>
      <div class="text-2xl font-black">${t.agri}</div>
      <p class="hint">关联${t.name}生产节奏</p>
    </div>
  `;
  document.getElementById('analysis-kpis').innerHTML = kpisHtml;

  // --------------------------
  // 渲染分析说明文字
  // --------------------------
  document.getElementById('analysis-text').innerHTML = `
    <p>${t.name}的综合解读应围绕“物候现象—气候条件—农事行动—民俗传播”展开。当前综合指数为 ${window.fmt((s.folk+s.agri+s.travel)/3,2)}，说明该节气既有自然节律，也具备文化转译价值。</p>
    <p class="mt-2">在页面讲解中，可以先用主地图说明地域差异，再用左右两侧卡片补充气候、农事、民俗和文旅热度，形成完整叙事链。</p>
  `;

  // --------------------------
  // 渲染数据来源说明
  // --------------------------
  document.getElementById('analysis-source').innerHTML = `
    <p>当前数据为演示型指数数据，已随“节气序号 + 南北区域参数”动态计算。
    节气：${t.name}；
    区域：${window.regionProfiles[window.currentRegion].label}；
    基础温度：${t.temp}°C；
    基础降水：${t.rain}%。</p>
  `;

  // --------------------------
  // 显示弹窗
  // --------------------------
  document.getElementById('analysis-modal').style.display = 'flex';

  // 延迟一点，渲染雷达图（避免DOM未加载完）
  setTimeout(() => window.renderAnalysisChart(type), 60);
};

// 2. 渲染弹窗里的【五维雷达图】
window.renderAnalysisChart = (type) => {
  const t = window.solarTerms[window.currentTermIndex];
  const s = window.moduleScores(t);
  const tc = window.textColor();

  // 初始化图表
  if(!window.analysisChart) 
    window.analysisChart = echarts.init(document.getElementById('analysis-chart'));
  
  window.analysisChart.clear();

  // 设置雷达图：气候、物候、民俗、农事、文旅 5个维度
  window.analysisChart.setOption({
    tooltip:{},
    radar: {
      indicator: [
        {name:'气候',max:100},
        {name:'物候',max:100},
        {name:'民俗',max:100},
        {name:'农事',max:100},
        {name:'文旅',max:100}
      ],
      axisName:{color: tc} // 适配深色/浅色模式
    },
    series: [{
      type:'radar',
      data: [{
        name: t.name,
        // 5个维度的数值
        value: [
          Math.min(100, Math.abs(s.temp)+30),
          s.active,
          s.folk,
          s.agri,
          s.travel
        ],
        areaStyle:{ opacity:.22 },
        lineStyle:{ width:3 },
        itemStyle:{ color: t.color }
      }]
    }]
  });

  window.analysisChart.resize();
};