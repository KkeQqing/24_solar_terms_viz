// assets/js/events.js
// 功能：【全局事件绑定中心】

window.bindEvents = () => {
  // ————————————————————————————————
  // 1. 地区切换按钮（南方 / 北方）
  // ————————————————————————————————
  document.querySelectorAll('.region-btn').forEach(b => {
    b.addEventListener('click', e => {
      e.stopPropagation();
      window.selectRegion(b.dataset.region);
    });
  });

  // ————————————————————————————————
  // 2. 自动轮播按钮
  // ————————————————————————————————
  const autoBtn = document.getElementById('auto-btn');
  if (autoBtn) autoBtn.onclick = window.toggleAuto;

  // ————————————————————————————————
  // 3. 主题切换
  // ————————————————————————————————
  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) themeBtn.onclick = window.toggleTheme;

  // ————————————————————————————————
  // 4. 全屏切换
  // ————————————————————————————————
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  if (fullscreenBtn) {
    fullscreenBtn.onclick = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    };
  }

  // ————————————————————————————————
  // 5. 数据分析卡片点击（左侧列）
  // ————————————————————————————————
  document.querySelectorAll('[data-analysis]').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.closest('button,input,select')) return;
      e.stopPropagation();
      window.openAnalysis(el.dataset.analysis);
    });
  });

  // ————————————————————————————————
  // 6. 关闭弹窗按钮
  // ————————————————————————————————
  document.querySelectorAll('[data-close]').forEach(b => {
    b.addEventListener('click', () => {
      const modalId = b.dataset.close;
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = 'none';
    });
  });

  // ————————————————————————————————
  // 7. 点击弹窗背景关闭
  // ————————————————————————————————
  document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', e => {
      if (e.target === m) m.style.display = 'none';
    });
  });

  // ————————————————————————————————
  // 8. 键盘快捷键（保留左右箭头切换节气）
  // ————————————————————————————————
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') window.selectTerm(window.currentTermIndex + 1);
    if (e.key === 'ArrowLeft') window.selectTerm(window.currentTermIndex - 1);
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    }
  });
};