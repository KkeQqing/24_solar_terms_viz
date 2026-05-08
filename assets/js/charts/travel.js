import { $, charts, trendSeries, textColor, subColor } from '../core/utils.js';
import { solarTerms } from '../core/data.js';

export function initTravelChart(idx) {
  const dom = $('travel-chart');
  const myChart = echarts.init(dom);
  charts.travel = myChart;

  const data = trendSeries(solarTerms[idx]);
  const option = {
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['1月','2月','3月','4月','5月','6月','7月'],
      axisLine: { lineStyle: { color: subColor() } },
      axisLabel: { color: subColor() }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(214,169,40,0.1)' } },
      axisLine: { show: false },
      axisLabel: { color: subColor() }
    },
    series: [
      {
        name: '文旅热度',
        type: 'line',
        smooth: true,
        data,
        itemStyle: { color: '#FF7043' },
        areaStyle: { color: 'rgba(255,112,67,0.15)' }
      }
    ]
  };

  myChart.setOption(option);
  window.addEventListener('resize', () => myChart.resize());
}

export function updateTravelChart(idx) {
  const data = trendSeries(solarTerms[idx]);
  const opt = charts.travel.getOption();
  opt.series[0].data = data;
  charts.travel.setOption(opt);
}