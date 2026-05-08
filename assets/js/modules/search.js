// 搜索结果模板
function buildSearchResult(t) {
  const d = adjusted(t);
  return `<div class="search-card"><div class="text-center"><div class="text-2xl font-black">${t.name}</div><div class="hint">${t.date}</div></div><div><div class="font-bold mb-1">${t.folk.join(' / ')} · ${t.agri}</div><div class="hint">${t.poem}</div><div class="hint">气温 ${fmt(d.temp, 1)}°C · 降水 ${fmt(d.rain, 0)}% · 三候：${t.hou.join('、')}</div></div><div class="flex flex-col gap-2"><button type="button" class="btn small-btn search-go" data-index="${t.i}">查看</button><button type="button" class="btn small-btn search-analysis" data-index="${t.i}">综合分析</button><button type="button" class="btn small-btn search-compare" data-index="${t.i}">对比</button></div></div>`;
}

// 执行搜索
function doSearch() {
  const key = $('search-input').value.trim().toLowerCase(), panel = $('search-panel');
  if (!key) {
    panel.style.display = 'none';
    return;
  }
  const hits = solarTerms.map((t, i) => ({ ...t, i })).filter(t => [t.name, t.pinyin, t.agri, t.poem, t.advice, t.north, t.south, ...t.folk, ...t.hou].join(' ').toLowerCase().includes(key));
  if (!hits.length) {
    panel.innerHTML = '<div style="color:var(--sub);padding:8px">没有找到结果，可以试试：茶、牡丹、插秧、汤圆、登高。</div>';
  } else {
    panel.innerHTML = hits.slice(0, 6).map(buildSearchResult).join('');
    panel.querySelectorAll('.search-go').forEach(b => b.addEventListener('click', () => {
      selectTerm(Number(b.dataset.index));
      $('search-input').value = solarTerms[Number(b.dataset.index)].name;
      panel.style.display = 'none';
    }));
    panel.querySelectorAll('.search-analysis').forEach(b => b.addEventListener('click', () => {
      selectTerm(Number(b.dataset.index));
      panel.style.display = 'none';
      openAnalysis('summary');
    }));
    panel.querySelectorAll('.search-compare').forEach(b => b.addEventListener('click', () => {
      panel.style.display = 'none';
      openCompare(Number(b.dataset.index));
    }));
  }
  panel.style.display = 'block';
}