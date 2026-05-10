// assets/js/charts/hourly-wheel.js
window.updateHourlyWheel = (raw) => {
  const chartDom = document.getElementById('hourly-wheel');
  const myChart = window.charts['hourly-wheel'];
  if (!myChart) return;

  const currentTermIndex = window.currentTermIndex;
  const seasonColors = {
    spring: ['#C3E88D', '#AED581', '#81C784'],
    summer: ['#FF7043', '#FF8A65', '#FFB4A2'],
    autumn: ['#FFE082', '#FFEE58', '#FFF176'],
    winter: ['#E8EEF6', '#B6CBE1', '#CFE0F2']
  };
  const colors = seasonColors[raw.season];

  // 辅助函数
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1],16)},${parseInt(result[2],16)},${parseInt(result[3],16)}` : '255,255,255';
  };

  // ------- 1. 中心节气圆盘 -------
  const centerData = [{ name: raw.name, value: 1 }];

  // ------- 2. 24节气环数据 -------
  const jdMap = { '春分':'0°','夏至':'90°','秋分':'180°','冬至':'270°' };
  const solarTermsRing = window.solarTerms.map((t, i) => ({
    name: t.name,
    value: 1, // 等分
    itemStyle: {
      color: i === currentTermIndex ? '#FFD700' : colors[i % 3],
      borderColor: i === currentTermIndex ? '#FFD700' : 'transparent',
      borderWidth: i === currentTermIndex ? 2 : 0
    },
    label: {
      show: true,
      formatter: () => {
        const angle = i * 15;
        const jd = jdMap[t.name] || `${angle}°`;
        return `${t.name}\n${jd}`;
      },
      fontSize: 10,
      color: '#fff'
    },
    emphasis: {
      scale: true,
      scaleSize: 8,
      label: { fontSize: 14 }
    }
  }));

  // ------- 3. 72候扇形数据 -------
  const houData = [];
  window.solarTerms.forEach((t, ti) => {
    t.hou.forEach((h, hi) => {
      const isCurrent = ti === currentTermIndex;
      houData.push({
        name: h,
        value: 1,
        itemStyle: {
          color: isCurrent ? 'rgba(255,215,0,0.4)' : `rgba(${hexToRgb(colors[ti % 3])},0.25)`,
          borderColor: isCurrent ? '#FFD700' : 'transparent',
          borderWidth: isCurrent ? 2 : 0
        },
        label: {
          show: true,
          formatter: h.length > 4 ? h.slice(0,4)+'…' : h,
          color: isCurrent ? '#FFD700' : '#ffffffcc',
          fontSize: 8
        },
        tooltip: {
          formatter: () => `${t.name}·${['一候','二候','三候'][hi]}：${h}`
        }
      });
    });
  });

  // ------- 构建 ECharts 配置 -------
  const option = {
    backgroundColor: 'transparent',
    polar: {
      radius: ['0%', '95%'],
      center: ['50%', '50%']
    },
    angleAxis: {
      type: 'category',
      startAngle: 90,
      clockwise: false,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      data: Array.from({length:72}, (_,i) => i)
    },
    radiusAxis: {
      type: 'value',
      min: 0,
      max: 10,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    },
    series: [
      // 第一圈：中心节气
      {
        type: 'pie',
        radius: ['0%', '13%'],
        center: ['50%', '50%'],
        label: {
          show: true,
          position: 'center',
          formatter: `{b}\n{rich|${raw.pinyin}}`,
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff',
          rich: {
            rich: { fontSize: 10, color: '#FFD700', padding: [4,0] }
          }
        },
        itemStyle: { color: raw.color, borderColor: '#FFD700', borderWidth: 2 },
        data: centerData,
        animation: true,
        animationDelay: 0
      },
      // 第二圈：24节气环
      {
        type: 'pie',
        radius: ['16%', '32%'],
        center: ['50%', '50%'],
        data: solarTermsRing,
        label: { position: 'inside', rotate: 0, fontSize: 10 },
        roseType: undefined,
        animation: true,
        animationDelay: 200
      },
      // 第三圈：72候扇形
      {
        type: 'bar',
        data: houData,
        coordinateSystem: 'polar',
        barWidth: 1,
        barGap: 0,
        barCategoryGap: 0,
        z: 2,
        animation: true,
        animationDelay: (idx) => idx * 10
      },
      // 四季方位标
      {
        type: 'scatter',
        coordinateSystem: 'polar',
        symbol: 'none',
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}',
          fontSize: 18,
          fontWeight: 'bold',
          color: '#FFD700',
          distance: 10
        },
        data: [
          { name: '春', value: [0, 9.5] },
          { name: '夏', value: [90, 9.5] },
          { name: '秋', value: [180, 9.5] },
          { name: '冬', value: [270, 9.5] }
        ]
      }
    ]
  };

  // 设置图表，保留动画
  myChart.setOption(option, true);

  // ------- 交互逻辑 -------
  // 清除之前的事件（避免重复绑定）
  myChart.off('click');
  myChart.getZr().off('mousedown');
  myChart.getZr().off('mousemove');
  myChart.getZr().off('mouseup');

  // 点击候扇形 → 显示外环详情（调用全局函数）
  myChart.on('click', (params) => {
    if (params.seriesName === '72候') {
      const termIdx = Math.floor(params.dataIndex / 3);
      const houIdx = params.dataIndex % 3;
      window.showHouDetail(termIdx, houIdx);
    }
  });

  // 拖拽旋转与自动吸附
  let isDragging = false;
  let startX = 0;
  let currentAngleOffset = 0;
  const totalAnglePerTerm = 15;

  myChart.getZr().on('mousedown', (e) => {
    isDragging = true;
    startX = e.offsetX;
  });

  myChart.getZr().on('mousemove', (e) => {
    if (!isDragging) return;
    const delta = e.offsetX - startX;
    currentAngleOffset += delta * 0.1;
    startX = e.offsetX;
    myChart.setOption({
      angleAxis: { startAngle: 90 + currentAngleOffset }
    });
  });

  myChart.getZr().on('mouseup', () => {
    isDragging = false;
    // 吸附到最近节气（每个15°）
    const steps = Math.round(currentAngleOffset / totalAnglePerTerm);
    const targetTermIndex = (currentTermIndex - steps + 24) % 24; // 顺时针旋转等效
    currentAngleOffset = 0;
    window.selectTerm(targetTermIndex); // 触发全局切换
  });
};

// 显示外环详情的函数（将被 events.js 或 render.js 调用）
window.showHouDetail = (termIdx, houIdx) => {
  const term = window.solarTerms[termIdx];
  const houName = term.hou[houIdx];
  // 更新右侧或悬浮卡片
  const detailCard = document.getElementById('hou-detail-card');
  if (detailCard) {
    detailCard.innerHTML = `
      <div class="text-lg font-bold" style="color:var(--gold)">${term.name}·${['一候','二候','三候'][houIdx]}</div>
      <div class="mt-2">物候：${houName}</div>
      <div>诗句：${term.poem}</div>
      <div>民俗吃食：${term.folk.join('、')}</div>
      <div>养生：${term.advice}</div>
    `;
    detailCard.style.display = 'block';
  }
};