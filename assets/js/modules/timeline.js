// assets/js/modules/timeline.js
window.initTimeline = () => {
  const box = document.getElementById('timeline');
  box.innerHTML = '';
  window.solarTerms.forEach((t,i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'timeline-item font-sans text-xs';
    btn.title = `${t.name}：${t.hou.join(' / ')}`;
    btn.innerHTML = `<div style="font-size:10px">${t.date}</div><div class="dot"></div><div>${t.name}</div>`;
    btn.addEventListener('click', () => window.selectTerm(i));
    box.appendChild(btn);
  });
};
window.refreshTimeline = () => {
  document.querySelectorAll('.timeline-item').forEach((b,i) => b.classList.toggle('active', i===window.currentTermIndex));
  document.querySelectorAll('.timeline-item')[window.currentTermIndex]?.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
};