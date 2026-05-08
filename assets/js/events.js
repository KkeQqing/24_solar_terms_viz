import { $, resizeCharts } from './core/utils.js';

export function bindGlobalEvents() {
  // 全屏
  $('fullscreen-btn').onclick = () => {
    if(!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // 窗口缩放重绘图表
  window.addEventListener('resize', () => {
    resizeCharts();
  });

  // 关闭弹窗通用
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-close');
      $(id).style.display = 'none';
    };
  });
}