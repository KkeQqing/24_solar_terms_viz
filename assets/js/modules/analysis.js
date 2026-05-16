// assets/js/modules/analysis.js
// 功能：【节气分析弹窗】
// 作用：点击分析卡片 → 弹出弹窗，展示该类型下的详实数据解读 + 图表
// 修改：趣味科普(travel) 展示真实的科学解释（来自 funFacts），无占位符

window.openAnalysis = (type = 'summary') => {
  window.currentAnalysisType = type;

  const t = window.solarTerms[window.currentTermIndex] || {};
  const s = window.moduleScores ? window.moduleScores(t) : {};
  const region = window.currentRegion || 'south';
  const regionLabel = window.regionProfiles?.[region]?.label || '南方';

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

  const meta = {
    summary:  { title: '综合解读',   subtitle: '从物候、气候、农事、民俗、文旅多维度全面认识这个节气。' },
    phenology:{ title: '南北物候分析',subtitle: '对比南方与北方在同一节气下的物候差异及其成因。' },
    climate:  { title: '气候变化分析',subtitle: '基于近十年模拟数据的温度、降水与日照变化趋势。' },
    folk:     { title: '民俗分布分析',subtitle: '展现该节气的代表性民俗活动及其南北地域差异。' },
    agri:     { title: '农事适宜分析',subtitle: '节气对应的传统农事活动与现代农业生产建议。' },
    travel:   { title: '节气趣味科普',subtitle: '深入解读节气背后的科学原理与物候花信。' },
    space:    { title: '空间分异分析',subtitle: '华北、江南、岭南、西北等区域在节气期间的气候与物候对比。' }
  };

  document.getElementById('analysis-title').textContent = `${name} · ${meta[type]?.title || '综合分析'}`;
  document.getElementById('analysis-subtitle').textContent = meta[type]?.subtitle || '';

  // ---------- KPI 卡片 ----------
  let kpisHtml = '';
  if (type === 'folk') {
    kpisHtml = `
      <div class="modal-kpi">
        <p class="hint">民俗活动</p>
        <div class="text-2xl font-black">${folkList.length} 项</div>
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
      } else if (type === 'climate') {
      const rcd = window.realClimateData;
      const regionKey = region === 'north' ? 'beijing' : 'guangzhou';
      const decadeData = rcd?.decadalTrend?.[regionKey];
      let avgTemp = '--', avgRain = '--', trendVal = '--', tempRange = '--';

      if (decadeData) {
        // 计算十年均温
        const temps = decadeData.annualTemp;
        avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
        // 计算温度趋势（最后一年 - 第一年）
        const trend = temps[temps.length - 1] - temps[0];
        trendVal = (trend >= 0 ? '+' : '') + trend.toFixed(1);
        // 计算十年均降水
        const rains = decadeData.annualRain;
        avgRain = Math.round(rains.reduce((a, b) => a + b, 0) / rains.length);
        // 计算温度波动范围（所有年份最低 ~ 最高）
        const allMins = decadeData.tempMin;
        const allMaxs = decadeData.tempMax;
        tempRange = `${Math.min(...allMins)} ~ ${Math.max(...allMaxs)}°C`;
      }

      kpisHtml = `
        <div class="modal-kpi">
          <p class="hint">十年均温</p>
          <div class="text-2xl font-black">${avgTemp}°C</div>
          <p class="hint">波动 ${tempRange}</p>
        </div>
        <div class="modal-kpi">
          <p class="hint">十年均降水</p>
          <div class="text-2xl font-black">${avgRain} mm</div>
          <p class="hint">${regionLabel}</p>
        </div>
        <div class="modal-kpi">
          <p class="hint">温度趋势</p>
          <div class="text-2xl font-black">${trendVal}°C</div>
          <p class="hint">十年变化</p>
        </div>
      `;
    }else if (type === 'travel') {
    kpisHtml = ''; // 无 KPI 卡片
  } else {
  }
  document.getElementById('analysis-kpis').innerHTML = kpisHtml;

  // ---------- 分析文字 ----------
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
    const currentRegion = window.currentRegion === 'north' ? '北方' : '南方';
    const otherRegion = window.currentRegion === 'north' ? '南方' : '北方';
    analysisText = `
      <div style="line-height:1.8;">
        <p><strong>🌍 当前地区：${currentRegion}</strong></p>
        <p>${window.currentRegion === 'north' ? northDesc : southDesc}</p>
        <p class="mt-2"><strong>🌏 对比${otherRegion}：</strong></p>
        <p>${window.currentRegion === 'north' ? southDesc : northDesc}</p>
        <p class="mt-2"><strong>📊 差异分析：</strong></p>
        <p>南北纬度差导致太阳辐射量不同，物候期通常北方比南方晚7~15天。当前节气下，南方植被萌动早，昆虫活动频繁；北方则仍可能出现霜冻，植物处于休眠末期。</p>
        <p class="mt-2"><strong>🗺️ 物候区划参考：</strong></p>
        <p>华北地区：${t.north_cn || '气温回升，干燥多风'}；江南地区：${t.south_cn || '春雨增多，湿润温和'}；岭南地区：${t.lingnan || '已入初夏体感'}。</p>
      </div>
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
    const folkNames = folkList.map(f => (typeof f === 'string' ? f : f.name)).join('、') || '暂无';
    analysisText = `
      <p><strong>民俗溯源：</strong>${folkNames}等习俗在${name}广泛流传，多与农事祭祀、祈福迎祥相关，体现了古人顺应天时的智慧。</p>
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
    // 深层科学解释
    const scienceDetail = (window.scienceExplanations && window.scienceExplanations[name]) 
      ? window.scienceExplanations[name] 
      : `每个节气背后都蕴含着丰富的科学知识。${name}标志着太阳黄经达到${t.degrees || '?'}°，地球公转位置改变引起日照、温度等气象要素的规律性变化，从而影响物候和人类活动。`;

    // 物候与花信
    const flowerList = (window.flowerPhenology && window.flowerPhenology[name]) 
      ? window.flowerPhenology[name] 
      : ['应季花卉'];
    const phenoText = `${name}时节，${flowerList.join('、')}等植物进入最佳观赏期。`;

    analysisText = `
      <div style="line-height:1.8;">
        <p><strong>🔍 背后的知识</strong></p>
        <p>${scienceDetail}</p>
        <p class="mt-3"><strong>🌸 物候与花信</strong></p>
        <p>${phenoText}</p>
      </div>
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

  document.getElementById('analysis-modal').style.display = 'flex';
  setTimeout(() => window.renderAnalysisChart(type), 60);
};

// 2. 渲染图表（雷达图 / 自定义图表）
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
    const folkItems = folkList.map(item => {
      if (typeof item === 'string') return `<li>▪ ${item}</li>`;
      return `<li style="margin-bottom:10px;">
        <div style="font-weight:bold;">▪ ${item.name}</div>
        ${item.desc ? `<div style="font-size:12px; opacity:0.7; margin-top:4px;">${item.desc}</div>` : ''}
      </li>`;
    }).join('');
    
    chartDom.innerHTML = `
      <div style="padding:20px; height:100%; overflow-y:auto; font-family:'Noto Sans SC', sans-serif; color:${tc};">
        <h3 style="margin-bottom:12px; color:${t.color || '#d6a928'};">📜 ${t.name}·民俗活动</h3>
        <ul style="list-style:none; padding:0;">${folkItems}</ul>
        <h3 style="margin-bottom:12px; color:${t.color || '#d6a928'};">🗺️ 地域差异</h3>
        <div style="background:rgba(135,206,235,0.1); border-radius:10px; padding:12px; margin-bottom:8px;">
          <span style="background:#87CEEB; color:#fff; border-radius:4px; padding:2px 8px; font-size:12px; font-weight:bold;">北方</span>
          <p style="margin-top:6px; font-size:14px;">${t.north || '暂无描述'}</p>
        </div>
        <div style="background:rgba(255,182,193,0.1); border-radius:10px; padding:12px;">
          <span style="background:#FFB6C1; color:#fff; border-radius:4px; padding:2px 8px; font-size:12px; font-weight:bold;">南方</span>
          <p style="margin-top:6px; font-size:14px;">${t.south || '暂无描述'}</p>
        </div>
      </div>
    `;
    return;
  }

  // 气候变化：带误差线的折线图（已添加数值标签）
  if (type === 'climate') {
    if (window.analysisChart) {
      window.analysisChart.dispose();
      window.analysisChart = null;
    }
    window.analysisChart = echarts.init(chartDom);

    const rcd = window.realClimateData;
    const regionKey = window.currentRegion === 'north' ? 'beijing' : 'guangzhou';
    const decadeData = rcd?.decadalTrend?.[regionKey];

    if (!decadeData) return;

    const years = decadeData.years;
    const temps = decadeData.annualTemp;
    const tempMax = decadeData.tempMax;
    const tempMin = decadeData.tempMin;
    const rains = decadeData.annualRain;
    const rainMax = decadeData.rainMax;
    const rainMin = decadeData.rainMin;

    // 计算温度误差（正负各一条）
    const tempUpper = temps.map((t, i) => tempMax[i] - t);
    const tempLower = temps.map((t, i) => t - tempMin[i]);
    // 降水误差
    const rainUpper = rains.map((r, i) => rainMax[i] - r);
    const rainLower = rains.map((r, i) => r - rainMin[i]);

    // 温度阈值（用于背景着色）
    const tempWarm = 23;
    const tempCold = 18;
    // 降水阈值
    const rainWet = 800;
    const rainDry = 500;

    // 生成颜色渐变（年份越新颜色越深）
    const colorStops = years.map((_, i) => {
      const ratio = i / (years.length - 1);
      const r = Math.round(255 * ratio + 180 * (1 - ratio));
      const g = Math.round(80 * ratio + 100 * (1 - ratio));
      const b = Math.round(60 * ratio + 120 * (1 - ratio));
      return `rgb(${r},${g},${b})`;
    });
    const rainColorStops = years.map((_, i) => {
      const ratio = i / (years.length - 1);
      const r = Math.round(80 * ratio + 40 * (1 - ratio));
      const g = Math.round(140 * ratio + 120 * (1 - ratio));
      const b = Math.round(220 * ratio + 200 * (1 - ratio));
      return `rgb(${r},${g},${b})`;
    });

    window.analysisChart.setOption({
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['年均温', '年降水'],
        textStyle: { color: tc }
      },
      // 增加顶部留白，避免标签被裁剪
      grid: { left: 70, right: 70, top: 70, bottom: 50 },
      xAxis: {
        type: 'category',
        data: years,
        axisLabel: { color: tc }
      },
      yAxis: [
        {
          type: 'value',
          name: '°C',
          min: tempCold - 5,
          max: tempWarm + 5,
          axisLabel: { color: tc },
          nameTextStyle: { color: tc },
          splitLine: { lineStyle: { color: 'rgba(128,128,128,0.15)' } }
        },
        {
          type: 'value',
          name: 'mm',
          axisLabel: { color: tc },
          nameTextStyle: { color: tc },
          splitLine: { show: false }
        }
      ],
      series: [
  // 年降水系列（无标签）
      {
        name: '年降水',
        type: 'line',
        yAxisIndex: 1,
        data: rains.map((r, i) => ({
          value: r,
          itemStyle: { color: rainColorStops[i] }
        })),
        lineStyle: { width: 2 },
        errorBar: {
          data: rains.map((_, i) => [rainLower[i], rainUpper[i]]),
          itemStyle: { color: 'rgba(100,180,255,0.6)', width: 1.5 }
        },
        markArea: {
          silent: true,
          data: [
            [{ yAxis: rainWet, itemStyle: { color: 'rgba(0,0,255,0.05)' } }, { yAxis: 9999 }],
            [{ yAxis: 0, itemStyle: { color: 'rgba(255,0,0,0.05)' } }, { yAxis: rainDry }]
          ]
        }
      },
      // 年均温系列（无标签）
      {
        name: '年均温',
        type: 'line',
        data: temps.map((t, i) => ({
          value: t,
          itemStyle: { color: colorStops[i] }
        })),
        lineStyle: { width: 2.5 },
        errorBar: {
          data: temps.map((_, i) => [tempLower[i], tempUpper[i]]),
          itemStyle: { color: 'rgba(255,150,100,0.6)', width: 1.5 }
        },
        markArea: {
          silent: true,
          data: [
            [{ yAxis: tempWarm, itemStyle: { color: 'rgba(255,0,0,0.05)' } }, { yAxis: 999 }],
            [{ yAxis: -999, itemStyle: { color: 'rgba(0,0,255,0.05)' } }, { yAxis: tempCold }]
          ]
        }
      }
    ]
    });

    window.analysisChart.resize();
    return;
  }

  // 物候分析：哑铃图（南北对比）
  if (type === 'phenology') {
    if (window.analysisChart) {
      window.analysisChart.dispose();
      window.analysisChart = null;
    }
    window.analysisChart = echarts.init(chartDom);

    const rcd = window.realClimateData;
    const termName = t.name || '';
    const bj = rcd?.terms?.[termName]?.beijing || {};
    const gz = rcd?.terms?.[termName]?.guangzhou || {};

    const getVal = (city, key, fallback) => (city[key] !== undefined ? city[key] : fallback);
    const nTemp = getVal(bj, 'temp', t.temp - 3);
    const nRain = getVal(bj, 'rain', t.rain - 10);
    const nHum  = getVal(bj, 'humidity', 45);
    const sTemp = getVal(gz, 'temp', t.temp);
    const sRain = getVal(gz, 'rain', t.rain);
    const sHum  = getVal(gz, 'humidity', 75);

    const indicators = [
      { name: '均温(℃)', min: -10, max: 40, north: nTemp, south: sTemp, unit: '℃' },
      { name: '降水(mm)', min: 0,   max: 400, north: nRain, south: sRain, unit: 'mm' },
      { name: '湿度(%)', min: 20,  max: 100, north: nHum,  south: sHum,  unit: '%' }
    ];

    const norm = (val, min, max) => Math.min(100, Math.max(0, ((val - min) / (max - min)) * 100));
    const data = indicators.map((item, idx) => ({
      y: idx,
      northRaw: item.north,
      southRaw: item.south,
      north: norm(item.north, item.min, item.max),
      south: norm(item.south, item.min, item.max),
      name: item.name,
      unit: item.unit
    }));

    const climateComment = (window.scienceExplanations && window.scienceExplanations[termName])
      || `${termName}期间，北方干燥多风，南方温润多雨，南北物候差异显著。`;

    const dumbbellSeries = {
      type: 'custom',
      renderItem: function (params, api) {
        const yIndex = api.value(0);
        const northVal = api.value(1);   // 归一化后的值（0~100）
        const southVal = api.value(2);
        const name     = api.value(3);
        const northRaw = api.value(4);
        const southRaw = api.value(5);
        const unit     = api.value(6) || '';

        const y  = api.coord([0, yIndex])[1];
        const x1 = api.coord([northVal, yIndex])[0];
        const x2 = api.coord([southVal, yIndex])[0];

        // 根据差值变化连线颜色
        const diff = Math.abs(southVal - northVal);
        const ratio = Math.min(diff / 100, 1);
        const r = Math.round(111 + (212 - 111) * ratio);
        const g = Math.round(168 + (138 - 168) * ratio);
        const b = Math.round(220 + (138 - 220) * ratio);
        const lineColor = `rgb(${r}, ${g}, ${b})`;

        return {
          type: 'group',
          children: [
            // 连接线
            { type: 'line', shape: { x1, y1: y, x2, y2: y }, style: { stroke: lineColor, lineWidth: 3 } },
            // 左端点（北方）
            { type: 'circle', shape: { cx: x1, cy: y, r: 8 }, style: { fill: '#6FA8DC', stroke: '#fff', lineWidth: 2 } },
            // 右端点（南方）
            { type: 'circle', shape: { cx: x2, cy: y, r: 8 }, style: { fill: '#D48A8A', stroke: '#fff', lineWidth: 2 } },
            // ---- 新增常驻数值标签 ----
            // 北方数值（圆点左上方）
            {
              type: 'text',
              x: x1 - 10,
              y: y - 14,
              style: {
                text: `${northRaw.toFixed(1)}${unit}`,
                fill: '#6FA8DC',
                font: 'bold 11px "Noto Sans SC", sans-serif',
                textAlign: 'right',
                textVerticalAlign: 'bottom'
              }
            },
            // 南方数值（圆点右上方）
            {
              type: 'text',
              x: x2 + 10,
              y: y - 14,
              style: {
                text: `${southRaw.toFixed(1)}${unit}`,
                fill: '#D48A8A',
                font: 'bold 11px "Noto Sans SC", sans-serif',
                textAlign: 'left',
                textVerticalAlign: 'bottom'
              }
            }
            // -------------------------
          ]
        };
      },
      data: data.map(d => [d.y, d.north, d.south, d.name, d.northRaw, d.southRaw, d.unit]),
      z: 10
    };

    window.analysisChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          if (params.seriesName === '哑铃图') {
            const d = data[params.dataIndex];
            return `<strong>${d.name}</strong><br/>北方：${d.northRaw.toFixed(1)} ${d.unit}<br/>南方：${d.southRaw.toFixed(1)} ${d.unit}<br/>差值：${(d.southRaw - d.northRaw).toFixed(1)} ${d.unit}<br/><small>${climateComment}</small>`;
          }
          return '';
        }
      },
      grid: { left: 80, right: 40, top: 30, bottom: 40 },
      xAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLabel: { show: false },
        splitLine: { show: false }
      },
      yAxis: {
        type: 'category',
        data: indicators.map(i => i.name),
        axisLabel: { color: tc, fontSize: 13, fontWeight: 'bold' },
        axisTick: { show: false },
        axisLine: { show: false }
      },
      series: [dumbbellSeries],
      graphic: [
        { type: 'text', left: 70, top: 20, style: { text: '← 北方', fill: '#6FA8DC', fontSize: 12, fontWeight: 'bold' } },
        { type: 'text', right: 30, top: 20, style: { text: '南方 →', fill: '#D48A8A', fontSize: 12, fontWeight: 'bold' } }
      ]
    });

    window.analysisChart.resize();
    return;
  }

  // 趣味科普：全年昼长变化曲线
  if (type === 'travel') {
    if (window.analysisChart) {
      window.analysisChart.dispose();
      window.analysisChart = null;
    }
    window.analysisChart = echarts.init(chartDom);

    const currentTerm = t.name;
    const allTerms = window.solarTerms.map(t => t.name);
    const xiazhiIndex = 9;
    const dongzhiIndex = 21;
    const currentIndex = allTerms.indexOf(currentTerm);

    const dayLengths = allTerms.map((_, i) => {
      const phase = (i - 21) / 24 * 2 * Math.PI;
      return +(12 + 3.5 * Math.sin(phase)).toFixed(2);
    });

    window.analysisChart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: 60, right: 30, top: 30, bottom: 60 },
      xAxis: {
        type: 'category',
        data: allTerms,
        axisLabel: { rotate: 45, fontSize: 10, color: tc }
      },
      yAxis: {
        type: 'value',
        name: '昼长 (小时)',
        min: 8,
        max: 16,
        axisLabel: { color: tc },
        nameTextStyle: { color: tc }
      },
      series: [{
        name: '全年昼长',
        type: 'line',
        data: dayLengths,
        smooth: true,
        lineStyle: { color: '#FFB74D', width: 3 },
        itemStyle: { color: '#FFB74D' },
        markPoint: {
          data: [
            { name: '夏至', coord: [allTerms[xiazhiIndex], dayLengths[xiazhiIndex]], symbol: 'pin', symbolSize: 40, itemStyle: { color: '#FF5252' } },
            { name: '冬至', coord: [allTerms[dongzhiIndex], dayLengths[dongzhiIndex]], symbol: 'pin', symbolSize: 40, itemStyle: { color: '#448AFF' } }
          ],
          label: { color: tc }
        },
        markLine: {
          silent: true,
          data: [{ xAxis: currentTerm }],
          lineStyle: { color: '#FFD54F', type: 'dashed' },
          label: { show: false }
        }
      }]
    });

    window.analysisChart.resize();
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