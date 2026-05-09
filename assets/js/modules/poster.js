// assets/js/modules/poster.js
// 功能：【节气海报弹窗 + 分享文案复制】
// 作用：打开节气勋章海报，展示节气名称、诗词、建议，并复制分享文案

// 1. 打开节气海报弹窗（勋章页面）
window.openPoster = () => {
  // 获取当前选中的节气数据
  const t = window.solarTerms[window.currentTermIndex];

  // 设置弹窗标题：例如 "谷雨 · 节气勋章"
  document.getElementById('poster-title').textContent = `${t.name} · 节气勋章`;

  // 设置弹窗正文：点亮提示 + 节气诗句 + 节气建议
  document.getElementById('poster-text').innerHTML = 
    `我点亮了“${t.name}”。<br>${t.poem}<br>${t.advice}`;

  // 显示海报弹窗
  document.getElementById('poster-modal').style.display = 'flex';
};

// 2. 复制分享文案到剪贴板
window.copyShare = async () => {
  // 获取当前节气
  const t = window.solarTerms[window.currentTermIndex];

  // 拼接分享文案
  const text = `我在「岁时华夏」点亮了 ${t.name}：${t.poem} ${t.advice}`;

  try {
    // 复制到剪贴板
    await navigator.clipboard.writeText(text);
    // 复制成功提示
    window.toast('分享文案已复制');
  } catch (e) {
    // 复制失败时，直接显示文案
    window.toast(text);
  }
};