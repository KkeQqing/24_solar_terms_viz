import { $, resizeCharts } from '../core/utils.js';

export function bindThemeBtn() {
  const btn = $('theme-btn');
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    resizeCharts();
  });
}