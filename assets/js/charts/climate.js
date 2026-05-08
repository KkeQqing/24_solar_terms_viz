import { $, charts, climateSeries, textColor, subColor } from '../core/utils.js';
import { solarTerms } from '../core/data.js';

export function initClimateChart(idx) {
  const dom = $('climate-chart');
  const myChart = echarts.init(dom);
  charts.climate = myChart;

  const ser = climateSeries(solarTerms[idx]);
  const option = {
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['年均温', '降水量', '日照指数'],
      textStyle: { color: textColor() },
      top: 0
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ser.years,
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
        name: '年均温',
        type: 'line',
        smooth: true,
        data: ser.temp,
        itemStyle: { color: '#d6a928' },
        areaStyle: { color: 'rgba(214,169,40,0.15)' }
      },
      {
        name: '降水量',
        type: 'line',
        smooth: true,
        data: ser.rain,
        itemStyle: { color: '#9CCC65' },
        areaStyle: { color: 'rgba(156,204,101,0.15)' }
      },
      {
        name: '日照指数',
        type: 'line',
        smooth: true,
        data: ser.sun,
        itemStyle: { color: '#FF7043' },
        areaStyle: { color: 'rgba(255,112,67,0.15)' }
      }
    ]
  };

  myChart.setOption(option);
  window.addEventListener('resize', () => myChart.resize());
}

export function updateClimateChart(idx) {
  const ser = climateSeries(solarTerms[idx]);
  const opt = charts.climate.getOption();
  opt.series[0].data = ser.temp;
  opt.series[1].data = ser.rain;
  opt.series[2].data = ser.sun;
  charts.climate.setOption(opt);
}