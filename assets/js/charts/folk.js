// assets/js/charts/folk.js
// 功能：渲染【民俗活跃度】圆环饼图
// 展示内容：当前节气的两个民俗活动 + 时令游赏 的占比分布

// 更新民俗图表
// raw = 当前选中的节气完整数据（来自 data.js）
window.updateFolk = (raw) => {

  // 1. 获取当前主题文字颜色（适配深色/浅色模式）
  const tc = window.textColor();

  // 2. 当前节气的主题色（用于第一个民俗项）
  const color = raw.color;

  // 3. 根据南北地区，调整节气数据
  const d = window.adjusted(raw);

  // 4. 渲染 ECharts 圆环饼图
  window.charts['folk-chart'].setOption({

    // 悬浮提示框：显示 名称 + 占比（保留2位小数）
    tooltip: {
      trigger: 'item',
      formatter: p => `${p.name}<br>占比：${window.fmt(p.percent, 2)}%`
    },

    // 饼图系列（核心）
    series: [{
      type: 'pie',                // 类型：饼图
      radius: ['42%', '70%'],     // 空心圆环：内径42%，外径70%
      center: ['50%', '53%'],      // 位置：水平居中，垂直略偏下
      
      // 圆环样式：圆角、白色边框
      itemStyle: {
        borderRadius: 10,           // 圆环块圆角
        borderColor: 'rgba(255,255,255,.78)', // 边框白色
        borderWidth: 2               // 边框宽度
      },
      
      // 饼图文字标签颜色
      label: { color: tc, fontSize: 10 },

      // 圆环的3段数据（固定3部分）
      data: [
        // 第一段：节气第一个民俗（如赏牡丹）→ 节气主色
        { value: 42, name: raw.folk[0], itemStyle: { color } },
        
        // 第二段：节气第二个民俗（如喝茶）→ 主题金色
        { value: 33, name: raw.folk[1], itemStyle: { color: '#d6a928' } },
        
        // 第三段：时令游赏 → 灰色
        { value: 25, name: '时令游赏', itemStyle: { color: 'rgba(150,150,150,.32)' } }
      ]
    }],

    // 图表中心文字（民俗综合指数）
    graphic: [{
      type: 'text',
      left: 'center',
      top: 'center',
      style: {
        // 文字内容：民俗 + 计算出来的分数
        text: `民俗\n${Math.round((d.active + d.rain) / 2)}`,
        textAlign: 'center',
        fill: tc,               // 文字颜色
        font: '700 14px Noto Sans SC' // 字体
      }
    }]
  });
};