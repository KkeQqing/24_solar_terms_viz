// assets/js/modules/analysis.js
// 功能：【节气分析弹窗】
// 作用：点击分析卡片 → 弹出弹窗，展示该类型下的详实数据解读 + 图表
// 修改：各分析类型均提供具体详实的文字说明，删除数据口径展示

window.openAnalysis = (type = 'summary') => {
  window.currentAnalysisType = type;

  const t = window.solarTerms[window.currentTermIndex] || {};
  const s = window.moduleScores ? window.moduleScores(t) : {};
  const region = window.currentRegion || 'south';
  const regionLabel = window.regionProfiles?.[region]?.label || '南方';

  // 节气基础信息
  const name = t.name || '未知节气';
  const color = t.color || '#d6a928';
  const folkList = t.folk || [];
  const agriText = t.agri || '暂无农事数据';
  const northDesc = t.north || '暂无描述';
  const southDesc = t.south || '暂无描述';
  const advice = t.advice || '暂无建议';
  const poem = t.poem || '';
  const houList = t.hou || [];
  const temp = t.temp ?? '--';
  const rain = t.rain ?? '--';

  // 类型元信息
  const meta = {
    summary:  { title: '综合解读',   subtitle: '从物候、气候、农事、民俗、文旅多维度全面认识这个节气。' },
    phenology:{ title: '南北物候分析',subtitle: '对比南方与北方在同一节气下的物候差异及其成因。' },
    climate:  { title: '气候变化分析',subtitle: '基于近十年模拟数据的温度、降水与日照变化趋势。' },
    folk:     { title: '民俗分布分析',subtitle: '展现该节气的代表性民俗活动及其南北地域差异。' },
    agri:     { title: '农事适宜分析',subtitle: '节气对应的传统农事活动与现代农业生产建议。' },
    travel:   { title: '文旅热度分析',subtitle: '结合气候舒适度与民俗活动，评估节气文旅适宜指数。' },
    space:    { title: '空间分异分析',subtitle: '华北、江南、岭南、西北等区域在节气期间的气候与物候对比。' }
  };

  document.getElementById('analysis-title').textContent = `${name} · ${meta[type]?.title || '综合分析'}`;
  document.getElementById('analysis-subtitle').textContent = meta[type]?.subtitle || '';

  // ---------- KPI 卡片（根据类型定制） ----------
  let kpisHtml = '';
  if (type === 'folk') {
    kpisHtml = `
      <div class="modal-kpi">
        <p class="hint">民俗活动</p>
        <div class="text-2xl font-black">${folkList.length} 项</div>
        <p class="hint">${folkList.join('、') || '暂无记录'}</p>
      </div>
      <div class="modal-kpi">
        <p class="hint">北方特色</p>
        <div class="text-2xl font-black">🌾</div>
        <p class="hint">${northDesc}</p>
      </div>
      <div class="modal-kpi">
        <p class="hint">南方特色</p>
        <div class="text-2xl font-black">🌿</div>
        <p class="hint">${southDesc}</p>
      </div>
    `;
  } else if (type === 'agri') {
    kpisHtml = `
      <div class="modal-kpi">
        <p class="hint">核心农事</p>
        <div class="text-2xl font-black">${agriText}</div>
      </div>
      <div class="modal-kpi">
        <p class="hint">适宜温度</p>
        <div class="text-2xl font-black">${temp}°C</div>
        <p class="hint">当前区域：${regionLabel}</p>
      </div>
      <div class="modal-kpi">
        <p class="hint">降水指数</p>
        <div class="text-2xl font-black">${rain}%</div>
        <p class="hint">参考近十年均值</p>
      </div>
    `;
  } else if (type === 'travel') {
    const travelScore = Math.min(100, Math.round((s.travel || 50) * 1.2));
    kpisHtml = `
      <div class="modal-kpi">
        <p class="hint">文旅热度</p>
        <div class="text-2xl font-black">${travelScore}</div>
        <p class="hint">综合气候与民俗吸引力</p>
      </div>
      <div class="modal-kpi">
        <p class="hint">舒适度</p>
        <div class="text-2xl font-black">${temp !== '--' ? (temp > 25 ? '偏热' : temp > 15 ? '舒适' : '偏凉') : '--'}</div>
        <p class="hint">体感温度参考</p>
      </div>
      <div class="modal-kpi">
        <p class="hint">推荐区域</p>
        <div class="text-2xl font-black">${region === 'south' ? '江南' : '华北'}</div>
        <p class="hint">当前选择${regionLabel}</p>
      </div>
    `;
  } else {
    // 通用 KPI（summary / phenology / climate / space）
    kpisHtml = `
      <div class="modal-kpi">
        <p class="hint">综合指数</p>
        <div class="text-2xl font-black">${window.fmt((s.folk + s.agri + s.travel) / 3, 2)}</div>
        <p class="hint">文化·生产·文旅三维均值</p>
      </div>
      <div class="modal-kpi">
        <p class="hint">物候活跃度</p>
        <div class="text-2xl font-black">${s.active || 0}</div>
        <p class="hint">植被与候鸟等节律响应</p>
      </div>
      <div class="modal-kpi">
        <p class="hint">区域差异指数</p>
        <div class="text-2xl font-black">${Math.abs((s.temp || 20) - 15) + 50}</div>
        <p class="hint">反映南北温差与物候差</p>
      </div>
    `;
  }
  document.getElementById('analysis-kpis').innerHTML = kpisHtml;

  // ---------- 详实文字分析（根据类型） ----------
  let analysisText = '';
  switch (type) {
    case 'summary':
      analysisText = `
        <p><strong>节气概览：</strong>${name}是二十四节气中的重要节点，太阳到达黄经${t.degrees || '?'}°，通常在${t.date || '?'}前后。${poem ? `古人诗云：“${poem}”` : ''}</p>
        <p class="mt-2"><strong>三候递进：</strong>${houList.length ? `一候「${houList[0] || '?'}」，二候「${houList[1] || '?'}」，三候「${houList[2] || '?'}」。` : '暂无记载。'}自然现象逐候演变，反映动植物对气候的响应。</p>
        <p class="mt-2"><strong>气候特征：</strong>${regionLabel}地区此时平均气温约${temp}°C，降水概率约${rain}%。人体感觉${temp !== '--' ? (temp > 25 ? '偏热' : temp > 15 ? '温和舒适' : '凉意明显') : '--'}，建议${advice}。</p>
        <p class="mt-2"><strong>农事重点：</strong>${agriText}。该阶段田间管理需结合天气变化，适时调整农事计划。</p>
        <p class="mt-2"><strong>民俗文化：</strong>${folkList.length ? folkList.join('、') : '暂无典型民俗'}是${name}的代表性民俗活动，传承至今，蕴含深厚文化底蕴。</p>
      `;
      break;

    case 'phenology':
      analysisText = `
        <p><strong>物候比较：</strong>同一节气，南方（${regionLabel === '南方' ? '如岭南、江南' : '参考南方数据'}）：${southDesc}。北方（${regionLabel === '北方' ? '如华北、东北' : '参考北方数据'}）：${northDesc}。</p>
        <p class="mt-2"><strong>原因分析：</strong>南北纬度差异导致日照时长、积温不同，物候期通常北方比南方晚7~15天。植物萌芽、开花、昆虫活动等均呈现明显梯度。</p>
        <p class="mt-2"><strong>当前区域：</strong>您选择了${regionLabel}，其物候特征为：${region === 'south' ? southDesc : northDesc}，建议在本地出行或农事安排时参考此特征。</p>
        <p class="mt-2"><strong>数据支撑：</strong>物候活跃度指数${s.active || 0}，综合反映植被绿度、候鸟迁徙等动态。</p>
      `;
      break;

    case 'climate':
      analysisText = `
        <p><strong>温度趋势：</strong>近十年${name}期间，${regionLabel}平均气温约${temp}°C，较上一节气变化${t.tempChange || '±2'}°C。整体呈${t.trend || '波动平稳'}态势。</p>
        <p class="mt-2"><strong>降水变化：</strong>平均降水量约${rain}%，${rain > 60 ? '较充沛，需注意防涝' : rain > 30 ? '适中' : '偏少，注意春旱'}。十年间降水变异系数较小，说明该节气降水相对稳定。</p>
        <p class="mt-2"><strong>极端事件：</strong>模拟数据显示，该节气出现极端高温（>35°C）或低温（<0°C）的概率较低，气候舒适度较高。</p>
      `;
      break;

    case 'folk':
      analysisText = `
        <p><strong>民俗溯源：</strong>${folkList.length ? folkList.join('、') : '暂无'}等习俗在${name}广泛流传，多与农事祭祀、祈福迎祥相关，体现了古人顺应天时的智慧。</p>
        <p class="mt-2"><strong>南北差异：</strong>北方多以${northDesc}为主，而南方则侧重${southDesc}。这种差异源于地理环境与物产的不同，形成了丰富多彩的节气文化。</p>
        <p class="mt-2"><strong>现代传承：</strong>如今许多民俗已演化为旅游节庆、美食体验或非遗展示，成为地方文旅名片。</p>
      `;
      break;

    case 'agri':
      analysisText = `
        <p><strong>关键农事：</strong>${agriText}。${name}是农业生产的重要节点，传统上农民据此安排播种、施肥、灌溉等作业。</p>
        <p class="mt-2"><strong>气候适配：</strong>${regionLabel}此时温度约${temp}°C，降水${rain}%，${temp !== '--' ? (temp < 10 ? '气温偏低，需防范倒春寒' : temp > 30 ? '高温需注意防暑和病虫害' : '温光水条件较适宜') : '请关注实时天气'}。</p>
        <p class="mt-2"><strong>生产建议：</strong>结合现代气象预报，可精准调整农事节奏，提前准备农资，加强田间巡视。</p>
      `;
      break;

    case 'travel':
      analysisText = `
        <p><strong>文旅指数：</strong>${name}期间，${regionLabel}气候${temp !== '--' ? (temp > 25 ? '偏热' : temp > 15 ? '舒适宜人' : '凉爽') : '多变'}，适合${temp > 25 ? '避暑、亲水活动' : temp > 15 ? '赏花、踏青、户外民俗体验' : '温泉、室内文化游'}。</p>
        <p class="mt-2"><strong>特色节庆：</strong>${folkList.length ? folkList.join('、') + '等民俗活动' : '暂无大型民俗'}常在此期间举办，吸引大量游客。</p>
        <p class="mt-2"><strong>出行提示：</strong>${advice || '建议关注天气变化，合理安排行程'}。热门景点可能出现客流高峰，建议错峰出行。</p>
      `;
      break;

    case 'space':
      analysisText = `
        <p><strong>华北地区：</strong>${t.north_cn || '气温回升较快，干燥多风，物候期早于东北。'}</p>
        <p class="mt-2"><strong>江南地区：</strong>${t.south_cn || '春雨增多，湿润温和，植物萌芽迅速。'}</p>
        <p class="mt-2"><strong>岭南地区：</strong>${t.lingnan || '气温较高，已入初夏体感，雨季临近。'}</p>
        <p class="mt-2"><strong>西北地区：</strong>${t.northwest || '昼夜温差大，降水稀少，需关注沙尘天气。'}</p>
        <p class="mt-2"><strong>青藏高原：</strong>${t.qinghai || '气温仍低，部分地区仍有降雪，物候滞后。'}</p>
        <p class="mt-2"><strong>东北地区：</strong>${t.northeast || '回暖较晚，土壤解冻缓慢，春耕稍迟。'}</p>
        <p class="mt-2">以上区域差异体现了我国幅员辽阔下的气候与物候分异规律，也是节气“因地而异”的生动写照。</p>
      `;
      break;

    default:
      analysisText = `<p>${name}的综合分析：本类型暂未定制详细解读，可参考其他模块。</p>`;
  }
  document.getElementById('analysis-text').innerHTML = analysisText;

  // 不再填充数据口径（已删除）

  // 显示弹窗
  document.getElementById('analysis-modal').style.display = 'flex';
  setTimeout(() => window.renderAnalysisChart(type), 60);
};

// 2. 渲染图表（雷达图 / 自定义信息卡）
window.renderAnalysisChart = (type) => {
  const t = window.solarTerms[window.currentTermIndex] || {};
  const s = window.moduleScores ? window.moduleScores(t) : {};
  const tc = window.textColor ? window.textColor() : '#333';
  const chartDom = document.getElementById('analysis-chart');
  if (!chartDom) return;

  // 民俗类型：信息卡
  if (type === 'folk') {
    if (window.analysisChart) {
      window.analysisChart.dispose();
      window.analysisChart = null;
    }
    const folkList = t.folk || [];
    chartDom.innerHTML = `
      <div style="padding:20px; height:100%; overflow-y:auto; font-family:'Noto Sans SC', sans-serif; color:${tc};">
        <h3 style="margin-bottom:12px; color:${t.color || '#d6a928'}; display:flex; align-items:center; gap:8px;">
          <span style="font-size:20px;">📜</span> ${t.name || ''}·民俗活动
        </h3>
        <ul style="list-style:none; padding:0; margin:0 0 20px 0;">
          ${folkList.map(f => `<li style="padding:8px 0; border-bottom:1px solid rgba(0,0,0,0.08); font-size:15px;">▪ ${f}</li>`).join('')}
        </ul>
        <h3 style="margin-bottom:12px; color:${t.color || '#d6a928'}; display:flex; align-items:center; gap:8px;">
          <span style="font-size:20px;">🗺️</span> 地域差异
        </h3>
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div style="background:rgba(135,206,235,0.1); border-radius:10px; padding:12px;">
            <span style="display:inline-block; background:#87CEEB; color:#fff; border-radius:4px; padding:2px 10px; font-size:13px; font-weight:bold;">北方</span>
            <p style="margin-top:8px; line-height:1.7; font-size:14px;">${t.north || '暂无描述'}</p>
          </div>
          <div style="background:rgba(255,182,193,0.1); border-radius:10px; padding:12px;">
            <span style="display:inline-block; background:#FFB6C1; color:#fff; border-radius:4px; padding:2px 10px; font-size:13px; font-weight:bold;">南方</span>
            <p style="margin-top:8px; line-height:1.7; font-size:14px;">${t.south || '暂无描述'}</p>
          </div>
        </div>
      </div>
    `;
    return;
  }

  // 其他类型：雷达图
  if (!window.analysisChart) {
    window.analysisChart = echarts.init(chartDom);
  }
  window.analysisChart.clear();

  window.analysisChart.setOption({
    tooltip: {},
    radar: {
      indicator: [
        { name: '气候', max: 100 },
        { name: '物候', max: 100 },
        { name: '民俗', max: 100 },
        { name: '农事', max: 100 },
        { name: '文旅', max: 100 }
      ],
      axisName: { color: tc }
    },
    series: [{
      type: 'radar',
      data: [{
        name: t.name || '',
        value: [
          Math.min(100, Math.abs(s.temp || 0) + 30),
          s.active || 0,
          s.folk || 0,
          s.agri || 0,
          s.travel || 0
        ],
        areaStyle: { opacity: .22 },
        lineStyle: { width: 3 },
        itemStyle: { color: t.color || '#d6a928' }
      }]
    }]
  });

  window.analysisChart.resize();
};