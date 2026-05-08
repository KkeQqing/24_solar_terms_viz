import { $, toast } from '../core/utils.js';
import { solarTerms } from '../core/data.js';

export function initPoster() {
  const stampBtn = $('stamp-btn');
  const modal = $('poster-modal');
  const closeBtns = document.querySelectorAll('[data-close="poster-modal"]');
  const copyBtn = $('copy-btn');

  stampBtn.onclick = () => {
    const name = $('solar-title').innerText;
    const term = solarTerms.find(t => t.name === name);
    $('poster-title').innerText = `${name} · 勋章`;
    $('poster-text').innerText = term.poem;
    modal.style.display = 'flex';
  };

  closeBtns.forEach(btn => {
    btn.onclick = () => modal.style.display = 'none';
  });

  copyBtn.onclick = () => {
    const text = `${$('poster-title').innerText}\n${$('poster-text').innerText}\n——岁时华夏二十四节气大屏`;
    navigator.clipboard.writeText(text).then(() => toast('复制成功'));
  };
}