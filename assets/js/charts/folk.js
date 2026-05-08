import { $, charts, moduleScores, textColor, subColor } from '../core/utils.js';
import { solarTerms } from '../core/data.js';

export function initFolkChart(idx) {
  const dom = $('folk-chart');
  const myChart = echarts.init(dom);
  charts.folk = myChart;

  const score = moduleScores(solarTerms[idx]);
  const option = {
    tooltip: { trigger: 'item' },
    legend: { top: 0, textStyle: { color: textColor() } },
    series: [
      {
        name: '民俗分布',
        type: 'pie',
        radius: ['35%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          color: ['#d6a928','#9CCC65','#FF7043','#87CEEB','#B5E48C']
        },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold', color: textColor() }
        },
        data: [
          { name: '北方民俗', value: score.folk * 0.9 },
          { name: '江南民俗', value: score.folk * 1.1 },
          { name: '岭南民俗', value: score.folk * 0.75 },
          { name: '西南民俗', value: score.folk * 0.85 },
          { name: '西北民俗', value: score.folk * 0.65 }
        ]
      }
    ]
  };

  myChart.setOption(option);
  window.addEventListener('resize', () => myChart.resize());
}

export function updateFolkChart(idx) {
  const score = moduleScores(solarTerms[idx]);
  const opt = charts.folk.getOption();
  opt.series[0].data = [
    { name: '北方民俗', value: score.folk * 0.9 },
    { name: '江南民俗', value: score.folk * 1.1 },
    { name: '岭南民俗', value: score.folk * 0.75 },
    { name: '西南民俗', value: score.folk * 0.85 },
    { name: '西北民俗', value: score.folk * 0.65 }
  ];
  charts.folk.setOption(opt);
}