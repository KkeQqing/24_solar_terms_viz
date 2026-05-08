import { $, charts, textColor } from '../core/utils.js';

export function initMainMap() {
  const dom = $('main-map');
  const myChart = echarts.init(dom);
  charts.map = myChart;

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      textStyle: { color: '#fff' }
    },
    geo: {
      map: 'china',
      roam: false,
      zoom: 1.2,
      label: {
        show: true,
        color: textColor(),
        fontSize: 10
      },
      itemStyle: {
        areaColor: 'rgba(214,169,40,0.12)',
        borderColor: 'rgba(214,169,40,0.35)'
      },
      emphasis: {
        itemStyle: { areaColor: 'rgba(214,169,40,0.25)' }
      }
    },
    series: []
  };

  myChart.setOption(option);
  window.addEventListener('resize', () => myChart.resize());
}