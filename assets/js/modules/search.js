import { $, toast } from '../core/utils.js';
import { solarTerms } from '../core/data.js';
import { renderAllByIndex } from '../app.js';

export function initSearch() {
  const input = $('search-input');
  const panel = $('search-panel');

  input.addEventListener('input', () => {
    const kw = input.value.trim();
    if(!kw) { panel.style.display = 'none'; return; }
    const res = solarTerms.filter(t => 
      t.name.includes(kw) || t.poem.includes(kw) || t.folk.join('').includes(kw)
    );
    if(!res.length) { panel.innerHTML = '<div class="hint p-3">暂无匹配节气</div>'; panel.style.display = 'block'; return; }

    panel.innerHTML = '';
    res.forEach(item => {
      const idx = solarTerms.indexOf(item);
      const card = document.createElement('div');
      card.className = 'search-card';
      card.innerHTML = `
        <div class="font-bold">${item.name}</div>
        <div class="hint truncate">${item.poem}</div>
      `;
      card.onclick = () => {
        input.value = '';
        panel.style.display = 'none';
        renderAllByIndex(idx);
      };
      panel.appendChild(card);
    });
    panel.style.display = 'block';
  });

  document.addEventListener('click', e => {
    if(!input.contains(e.target) && !panel.contains(e.target)) {
      panel.style.display = 'none';
    }
  });
}