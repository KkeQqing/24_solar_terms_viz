// 绑定所有事件
function bindEvents() {
  // 区域切换
  document.querySelectorAll('.region-btn').forEach(b => b.addEventListener('click', e => {
    e.stopPropagation();
    selectRegion(b.dataset.region);
  }));

  // 搜索
  $('search-input').addEventListener('input', doSearch);
  $('search-input').addEventListener('focus', doSearch);
  $('search-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const first = document.querySelector('.search-go');
      if (first) first.click();
    }
  });
  document.addEventListener('click', e => {
    if (!$('search-input').contains(e.target) && !$('search-panel').contains(e.target)) {
      $('search-panel').style.display = 'none';
    }
  });

  // 上下节气
  $('prev-btn').onclick = () => selectTerm(currentTermIndex - 1);
  $('next-btn').onclick = () => selectTerm(currentTermIndex + 1);

  // 功能按钮
  $('auto-btn').onclick = toggleAuto;
  $('theme-btn').onclick = toggleTheme;
  $('fullscreen-btn').onclick = toggleFullscreen;
  $('fav-btn').onclick = e => { e.stopPropagation(); toggleFavorite(); };
  $('compare-btn').onclick = e => { e.stopPropagation(); openCompare(); };
  $('detail-btn').onclick = e => { e.stopPropagation(); openDetail(); };
  $('stamp-btn').onclick = e => { e.stopPropagation(); openPoster(); };
  $('compare-render-btn').onclick = renderCompare;
  $('copy-btn').onclick = copyShare;
  $('data-story-btn').onclick = () => openAnalysis('summary');

  // 模块点击分析
  document.querySelectorAll('[data-analysis]').forEach(el => el.addEventListener('click', e => {
    if (e.target.closest('button,input,select')) return;
    e.stopPropagation();
    openAnalysis(el.dataset.analysis);
  }));

  // 关闭模态框
  document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => closeModal(b.dataset.close)));
  document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', e => {
    if (e.target === m) closeModal(m.id);
  }));

  // 键盘快捷键
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') selectTerm(currentTermIndex + 1);
    if (e.key === 'ArrowLeft') selectTerm(currentTermIndex - 1);
    if (e.key === 'Escape') document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  });
}