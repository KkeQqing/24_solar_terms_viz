// assets/js/events.js
// 功能：【全局事件绑定中心】
// 作用：把所有按钮、点击、搜索、键盘、弹窗 全部绑定事件

// 1. 全局绑定所有交互事件（页面一加载就执行）
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
  // 2. 搜索框：输入/聚焦时触发搜索
  // ————————————————————————————————
  document.getElementById('search-input').addEventListener('input', window.doSearch);
  document.getElementById('search-input').addEventListener('focus', window.doSearch);

  // ————————————————————————————————
  // 3. 点击页面空白处 → 关闭搜索面板
  // ————————————————————————————————
  document.addEventListener('click', e => {
    const input = document.getElementById('search-input');
    const panel = document.getElementById('search-panel');
    if (!input.contains(e.target) && !panel.contains(e.target)) {
      panel.style.display = 'none';
    }
  });

  // ————————————————————————————————
  // 4. 上一个 / 下一个节气
  // ————————————————————————————————
  document.getElementById('prev-btn').onclick = () => 
    window.selectTerm(window.currentTermIndex - 1);
  document.getElementById('next-btn').onclick = () => 
    window.selectTerm(window.currentTermIndex + 1);

  // ————————————————————————————————
  // 5. 自动轮播按钮
  // ————————————————————————————————
  document.getElementById('auto-btn').onclick = window.toggleAuto;

  // ————————————————————————————————
  // 6. 主题切换（深色/浅色）
  // ————————————————————————————————
  document.getElementById('theme-btn').onclick = window.toggleTheme;

  // ————————————————————————————————
  // 7. 全屏切换
  // ————————————————————————————————
  document.getElementById('fullscreen-btn').onclick = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // ————————————————————————————————
  // 8. 收藏按钮
  // ————————————————————————————————
  document.getElementById('fav-btn').onclick = e => {
    e.stopPropagation();
    window.toggleFavorite();
  };

  // ————————————————————————————————
  // 9. 打开节气对比弹窗
  // ————————————————————————————————
  document.getElementById('compare-btn').onclick = e => {
    e.stopPropagation();
    window.openCompare();
  };

  // ————————————————————————————————
  // 10. 打开节气详情弹窗
  // ————————————————————————————————
  document.getElementById('detail-btn').onclick = e => {
    e.stopPropagation();
    window.openDetail();
  };

  // ————————————————————————————————
  // 11. 打开节气海报（勋章）
  // ————————————————————————————————
  document.getElementById('stamp-btn').onclick = e => {
    e.stopPropagation();
    window.openPoster();
  };

  // ————————————————————————————————
  // 12. 手动触发对比图刷新
  // ————————————————————————————————
  document.getElementById('compare-render-btn').onclick = window.renderCompare;

  // ————————————————————————————————
  // 13. 复制分享文案
  // ————————————————————————————————
  document.getElementById('copy-btn').onclick = window.copyShare;

  // ————————————————————————————————
  // 14. 打开综合分析（数据解读）
  // ————————————————————————————————
  document.getElementById('data-story-btn').onclick = () => 
    window.openAnalysis('summary');

  // ————————————————————————————————
  // 15. 所有带 data-analysis 属性的元素 → 打开对应分析
  // ————————————————————————————————
  document.querySelectorAll('[data-analysis]').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.closest('button,input,select')) return;
      e.stopPropagation();
      window.openAnalysis(el.dataset.analysis);
    });
  });

  // ————————————————————————————————
  // 16. 关闭弹窗按钮（data-close）
  // ————————————————————————————————
  document.querySelectorAll('[data-close]').forEach(b => {
    b.addEventListener('click', () => {
      document.getElementById(b.dataset.close).style.display = 'none';
    });
  });

  // ————————————————————————————————
  // 17. 点击弹窗空白处 → 关闭弹窗
  // ————————————————————————————————
  document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('click', e => {
      if (e.target === m) m.style.display = 'none';
    });
  });

  // ————————————————————————————————
  // 18. 键盘快捷键
  // 方向右键 → 下一个节气
  // 方向左键 → 上一个节气
  // ESC → 关闭所有弹窗
  // ————————————————————————————————
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') window.selectTerm(window.currentTermIndex + 1);
    if (e.key === 'ArrowLeft') window.selectTerm(window.currentTermIndex - 1);
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    }
  });
};

// =====================================================================
// 2. 打开【节气详情弹窗】（完整介绍当前节气）
// =====================================================================
window.openDetail = () => {
  // 获取当前节气 + 地区适配数据
  const t = window.solarTerms[window.currentTermIndex];
  const d = window.adjusted(t);

  // ————————————————————————————————
  // 填充弹窗内容
  // ————————————————————————————————
  // 标题：节气名 + 拼音
  document.getElementById('detail-title').textContent = `${t.name} · ${t.pinyin}`;

  // 摘要：日期、地区、气温、降水、诗句
  document.getElementById('detail-summary').textContent = 
    `${t.name}通常在 ${t.date} 前后。当前选择为${window.regionProfiles[window.currentRegion].label}，
    估算平均气温 ${window.fmt(d.temp,1)}°C，降水指数 ${window.fmt(d.rain,0)}%。
    诗意表达：${t.poem}`;

  // 民俗、农事、三候、建议
  document.getElementById('detail-custom').textContent = 
    `代表民俗：${t.folk.join('、')}。
    主要农事：${t.agri}。
    三候：${t.hou.join('、')}。
    今日建议：${t.advice}`;

  // 数据说明
  document.getElementById('detail-data').textContent = 
    `南北物候差异：北方表现为“${t.north}”，南方表现为“${t.south}”。
    模拟近十年数据用于演示气候趋势。`;

  // 显示详情弹窗
  document.getElementById('detail-modal').style.display = 'flex';
};