import { $, charts, moduleScores, textColor, subColor } from '../core/utils.js';
import { solarTerms } from '../core/data.js';

export function initAgriChart(idx) {
  const dom = $('agri-chart');
  const myChart = echarts.init(dom);
  charts.agri = myChart;

  const score = moduleScores(solarTerms[idx]);
  const option = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['播种', '灌溉', '除草', '收获', '储藏'],
      axisLine: { lineStyle: { color: subColor() } },
      axisLabel: { color: subColor() }
    },
    yAxis: {
      type: 'value',
      max: 100,
      splitLine: { lineStyle: { color: 'rgba(214,169,40,0.1)' } },
      axisLine: { show: false },
      axisLabel: { color: subColor() }
    },
    series: [
      {
        name: '农事适宜度',
        type: 'bar',
        data: [
          score.agri * 0.85,
          score.agri * 0.95,
          score.agri * 1.05,
          score.agri * 1.1,
          score.agri * 0.75
        ],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0,0,0,1,[
            {offset:0,color:'#d6a928'},
            {offset:1,color:'#9CCC65'}
          ])
        },
        borderRadius: 6
      }
    ]
  };

  myChart.setOption(option);
  window.addEventListener('resize', () => myChart.resize());
}

export function updateAgriChart(idx) {
  const score = moduleScores(solarTerms[idx]);
  const opt = charts.agri.getOption();
  opt.series[0].data = [
    score.agri * 0.85,
    score.agri * 0.95,
    score.agri * 1.05,
    score.agri * 1.1,
    score.agri * 0.75
  ];
  charts.agri.setOption(opt);
}