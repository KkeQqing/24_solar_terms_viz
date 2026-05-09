// assets/js/charts/map.js
// 核心功能：渲染大屏中央【全国区域物候节律动态散点图】
// 展示：华北 / 江南 / 岭南 / 西北 / 青藏 / 东北 六个区域的状态
window.updateMainMap = (raw) => {

  // 1. 根据当前南北地区，自动调整温度、降水、物候数据
  const d = window.adjusted(raw);

  // 2. 当前节气的主题色（所有点、线都会用这个颜色）
  const color = raw.color;

  // 3. 文字颜色（适配深色/浅色模式）
  const tc = window.textColor();

  // 4. 全国 6 大区域数据（坐标 + 数值 + 提示文字）
  // value[x坐标, y坐标, 节律指数]
  // custom：鼠标悬浮时显示的描述文字
  const points = [
    { name:'华北', value:[30,58,d.temp+18], custom:`北方：${raw.north}` },
    { name:'江南', value:[58,72,d.rain],    custom:`南方：${raw.south}` },
    { name:'岭南', value:[72,78,Math.max(10,d.rain-2)], custom:`岭南：湿热更早，民俗游赏活跃` },
    { name:'西北', value:[22,42,d.active],  custom:`西北：干旱少雨，农时依赖灌溉` },
    { name:'青藏', value:[36,78,Math.max(8,d.active-10)], custom:`青藏：高寒物候滞后，昼夜温差大` },
    { name:'东北', value:[46,30,d.temp+24], custom:`东北：积温不足，物候整体偏迟` }
  ];

  // 5. 渲染 ECharts 图表
  window.charts['main-map'].setOption({

    // 悬浮提示框：显示区域名、节律指数、地区描述
    tooltip: {
      formatter: p => `${p.name}<br>节律指数：${window.fmt(p.value[2],2)}<br>${p.data.custom}`
    },

    // 图表布局：充满整个容器
    grid: { left:10, right:10, top:10, bottom:10 },

    // X/Y 轴：隐藏（因为是地图散点图，不需要坐标轴）
    xAxis: { min:0, max:100, show:false },
    yAxis: { min:0, max:100, show:false },

    // 系列1：区域之间的动态连线（带流光效果）
    series: [
      {
        type:'lines',  // 连线图
        coordinateSystem:'cartesian2d',
        // 各个区域之间的连线关系（6个点之间的连线）
        data:[[[30,58],[58,72]],[[58,72],[72,78]],[[22,42],[36,78]],[[46,30],[30,58]],[[30,58],[36,78]]].map(coords=>({coords})),
        lineStyle:{ color, opacity:.25, width:2, curveness:.22 }, // 线条样式
        effect:{ show:true, symbolSize:5, color, period:5 } // 流光动画
      },

      // 系列2：带动态效果的散点（6个区域的圆点）
      {
        type:'effectScatter',  // 带涟漪效果的散点图
        data: points,          // 6大区域数据
        symbolSize: v => Math.max(15, v[2]/2.2), // 圆点大小：节律指数越大，点越大
        label:{ show:true, formatter:'{b}', color:tc, fontSize:12 }, // 显示区域名称
        itemStyle:{ color, opacity:.75 } // 圆点颜色
      }
    ]
  });
};