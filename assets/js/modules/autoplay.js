import { $, autoTimer, toast } from '../core/utils.js';
import { solarTerms } from '../core/data.js';
import { renderAllByIndex } from '../app.js';

export function initAutoPlay() {
  const btn = $('auto-btn');
  let flag = false;

  btn.onclick = () => {
    flag = !flag;
    if(flag) {
      toast('自动轮播已开启');
      let idx = 0;
      autoTimer = setInterval(() => {
        idx = (idx + 1) % solarTerms.length;
        renderAllByIndex(idx);
      }, 3500);
    } else {
      clearInterval(autoTimer);
      toast('自动轮播已关闭');
    }
  };
}