// 打开勋章海报
function openPoster() {
  const t = solarTerms[currentTermIndex];
  $('poster-title').textContent = `${t.name} · 节气勋章`;
  $('poster-text').innerHTML = `我点亮了“${t.name}”。<br>${t.poem}<br>${t.advice}`;
  openModal('poster-modal');
}

// 复制分享文案
async function copyShare() {
  const t = solarTerms[currentTermIndex];
  const text = `我在「岁时华夏」点亮了 ${t.name}：${t.poem} ${t.advice}`;
  try {
    await navigator.clipboard.writeText(text);
    toast('分享文案已复制');
  } catch (e) {
    toast(text);
  }
}