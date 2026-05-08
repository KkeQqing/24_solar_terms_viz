import { $, charts, adjusted, textColor, subColor } from '../core/utils.js';
import { solarTerms } from '../core/data.js';

export function initPhenologyChart(idx) {
  const dom = $('phenology-chart');
  const myChart = echarts.init(dom);
  charts.phenology = myChart;

  const term = solarTerms[idx];
  const data = adjusted(term);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: ['气温', '降水', '物候活跃度'],
      textStyle: { color: textColor() },
      top: 0
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['气温℃', '降水指数', '物候活跃', '南北时差'],
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
        name: '气温',
        type: 'bar',
        data: [data.temp, 0, 0, 0],
        itemStyle: { color: term.color }
      },
      {
        name: '降水',
        type: 'bar',
        data: [0, data.rain, 0, 0],
        itemStyle: { color: term.color2 }
      },
      {
        name: '物候活跃度',
        type: 'bar',
        data: [0, 0, data.active, 0],
        itemStyle: { color: '#d6a928' }
      },
      {
        name: '南北时差',
        type: 'bar',
        data: [0, 0, 0, Math.abs(data.lag)],
        itemStyle: { color: '#87CEEB' }
      }
    ]
  };

  myChart.setOption(option);
  window.addEventListener('resize', () => myChart.resize());
}

export function updatePhenologyChart(idx) {
  const term = solarTerms[idx];
  const data = adjusted(term);
  const opt = charts.phenology.getOption();
  opt.series[0].data = [data.temp, 0, 0, 0];
  opt.series[1].data = [0, data.rain, 0, 0];
  opt.series[2].data = [0, 0, data.active, 0];
  opt.series[3].data = [0, 0, 0, Math.abs(data.lag)];
  charts.phenology.setOption(opt);
}