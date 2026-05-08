// assets/js/events.js
window.bindEvents = () => {
  document.querySelectorAll('.region-btn').forEach(b=>b.addEventListener('click',e=>{ e.stopPropagation(); window.selectRegion(b.dataset.region); }));
  document.getElementById('search-input').addEventListener('input', window.doSearch);
  document.getElementById('search-input').addEventListener('focus', window.doSearch);
  document.addEventListener('click', e=>{ if(!document.getElementById('search-input').contains(e.target) && !document.getElementById('search-panel').contains(e.target)) document.getElementById('search-panel').style.display='none'; });
  document.getElementById('prev-btn').onclick = () => window.selectTerm(window.currentTermIndex-1);
  document.getElementById('next-btn').onclick = () => window.selectTerm(window.currentTermIndex+1);
  document.getElementById('auto-btn').onclick = window.toggleAuto;
  document.getElementById('theme-btn').onclick = window.toggleTheme;
  document.getElementById('fullscreen-btn').onclick = () => { if(!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.(); };
  document.getElementById('fav-btn').onclick = e=>{ e.stopPropagation(); window.toggleFavorite(); };
  document.getElementById('compare-btn').onclick = e=>{ e.stopPropagation(); window.openCompare(); };
  document.getElementById('detail-btn').onclick = e=>{ e.stopPropagation(); window.openDetail(); };
  document.getElementById('stamp-btn').onclick = e=>{ e.stopPropagation(); window.openPoster(); };
  document.getElementById('compare-render-btn').onclick = window.renderCompare;
  document.getElementById('copy-btn').onclick = window.copyShare;
  document.getElementById('data-story-btn').onclick = () => window.openAnalysis('summary');
  document.querySelectorAll('[data-analysis]').forEach(el=>el.addEventListener('click',e=>{ if(e.target.closest('button,input,select')) return; e.stopPropagation(); window.openAnalysis(el.dataset.analysis); }));
  document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>{ document.getElementById(b.dataset.close).style.display='none'; }));
  document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{ if(e.target===m) m.style.display='none'; }));
  document.addEventListener('keydown',e=>{ if(e.key==='ArrowRight') window.selectTerm(window.currentTermIndex+1); if(e.key==='ArrowLeft') window.selectTerm(window.currentTermIndex-1); if(e.key==='Escape') document.querySelectorAll('.modal').forEach(m=>m.style.display='none'); });
};
window.openDetail = () => {
  const t = window.solarTerms[window.currentTermIndex], d = window.adjusted(t);
  document.getElementById('detail-title').textContent = `${t.name} · ${t.pinyin}`;
  document.getElementById('detail-summary').textContent = `${t.name}通常在 ${t.date} 前后。当前选择为${window.regionProfiles[window.currentRegion].label}，估算平均气温 ${window.fmt(d.temp,1)}°C，降水指数 ${window.fmt(d.rain,0)}%。诗意表达：${t.poem}`;
  document.getElementById('detail-custom').textContent = `代表民俗：${t.folk.join('、')}。主要农事：${t.agri}。三候：${t.hou.join('、')}。今日建议：${t.advice}`;
  document.getElementById('detail-data').textContent = `南北物候差异：北方表现为“${t.north}”，南方表现为“${t.south}”。模拟近十年数据用于演示气候趋势。`;
  document.getElementById('detail-modal').style.display = 'flex';
};