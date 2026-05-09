// assets/js/modules/compare.js
// 功能：【节气双维度对比弹窗】
// 作用：选择任意两个节气，用雷达图进行 5 维度指标对比

// 1. 打开对比弹窗（compareIndex：默认要对比的节气）
window.openCompare = (compareIndex) => {
  // 获取两个下拉选择框（节气A / 节气B）
  const a = document.getElementById('compare-a');
  const b = document.getElementById('compare-b');

  // 给两个下拉框 动态生成 24 个节气的选项
  a.innerHTML = b.innerHTML = window.solarTerms.map((t, i) => 
    `<option value="${i}">${t.name}</option>`
  ).join('');

  // 左侧默认选中：当前正在查看的节气
  a.value = window.currentTermIndex;

  // 右侧默认选中：传入的节气 或 当前节气 +6 个（间隔6个节气，对比更明显）
  b.value = typeof compareIndex === 'number' 
    ? compareIndex 
    : (window.currentTermIndex + 6) % 24;

  // 如果两个节气选重复了，强制右侧+6，避免相同
  if (Number(a.value) === Number(b.value)) {
    b.value = (Number(a.value) + 6) % 24;
  }

  // 显示对比弹窗
  document.getElementById('compare-modal').style.display = 'flex';

  // 延迟初始化图表（保证DOM已渲染）
  setTimeout(() => {
    if (!window.compareChart) {
      window.compareChart = echarts.init(document.getElementById('compare-chart'));
    }
    // 渲染对比雷达图
    window.renderCompare();
  }, 60);
};

// 2. 渲染【双节气对比雷达图】
window.renderCompare = () => {
  // 获取选中的两个节气的序号
  const ai = Number(document.getElementById('compare-a').value);
  const bi = Number(document.getElementById('compare-b').value);

  // 获取节气数据（已自动适配南北地区）
  const a = window.adjusted(window.solarTerms[ai]);
  const b = window.adjusted(window.solarTerms[bi]);
  
  // 适配深色/浅色模式文字颜色
  const tc = window.textColor();

  // 渲染 ECharts 双雷达图对比
  window.compareChart.setOption({
    // 图例（两个节气名称）
    legend: { 
      data: [a.name, b.name], 
      bottom: 0, 
      left: 'center', 
      textStyle: { color: tc } 
    },
    
    // 雷达图 5 个维度
    radar: {
      indicator: [
        { name: '气温', max: 46 },
        { name: '文旅', max: 100 },
        { name: '农时', max: 100 },
        { name: '物候', max: 100 },
        { name: '降雨', max: 100 }
      ],
      axisName: { color: tc }
    },

    // 两组数据（节气A、节气B）
    series: [{
      type: 'radar',
      data: [
        // 节气A数据
        {
          name: a.name,
          value: [
            Math.abs(a.temp) + 10,
            window.trendSeries(window.solarTerms[ai]).at(-1),
            72,
            a.active,
            a.rain
          ]
        },
        // 节气B数据
        {
          name: b.name,
          value: [
            Math.abs(b.temp) + 10,
            window.trendSeries(window.solarTerms[bi]).at(-1),
            68,
            b.active,
            b.rain
          ]
        }
      ]
    }]
  });

  window.compareChart.resize();
};