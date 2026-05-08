// assets/js/modules/poster.js
window.openPoster = () => {
  const t = window.solarTerms[window.currentTermIndex];
  document.getElementById('poster-title').textContent = `${t.name} · 节气勋章`;
  document.getElementById('poster-text').innerHTML = `我点亮了“${t.name}”。<br>${t.poem}<br>${t.advice}`;
  document.getElementById('poster-modal').style.display = 'flex';
};
window.copyShare = async () => {
  const t = window.solarTerms[window.currentTermIndex];
  const text = `我在「岁时华夏」点亮了 ${t.name}：${t.poem} ${t.advice}`;
  try { await navigator.clipboard.writeText(text); window.toast('分享文案已复制'); } catch(e) { window.toast(text); }
};