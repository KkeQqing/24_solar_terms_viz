import { $, currentTermIndex } from '../core/utils.js';
import { solarTerms } from '../core/data.js';
import { renderAllByIndex } from '../app.js';

export function initTimeline() {
  const wrap = $('timeline');
  wrap.innerHTML = '';
  solarTerms.forEach((item, idx) => {
    const btn = document.createElement('button');
    btn.className = `timeline-item ${idx === currentTermIndex ? 'active' : ''}`;
    btn.innerHTML = `
      <div class="dot"></div>
      <div class="text-xs">${item.name}</div>
    `;
    btn.onclick = () => {
      document.querySelectorAll('.timeline-item').forEach(el => el.classList.remove('active'));
      btn.classList.add('active');
      renderAllByIndex(idx);
    };
    wrap.appendChild(btn);
  });
}

export function updateTimelineActive(idx) {
  document.querySelectorAll('.timeline-item').forEach((el,i) => {
    el.classList.toggle('active', i === idx);
  });
}