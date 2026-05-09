// assets/js/modules/search.js
// 功能：【节气全文搜索】
// 支持搜索：节气名、拼音、农事、民俗、诗词、建议、南北描述、三候
// 搜索结果：显示卡片 + 3个按钮（查看 / 综合分析 / 对比）

// 1. 构建单条搜索结果卡片（HTML）
window.buildSearchResult = (t) => {
  // 计算当前节气适配南北地区的数据
  const d = window.adjusted(t);

  // 返回搜索卡片HTML结构
  return `
    <div class="search-card">
      <!-- 左侧：节气名称 + 日期 -->
      <div class="text-center">
        <div class="text-2xl font-black">${t.name}</div>
        <div class="hint">${t.date}</div>
      </div>

      <!-- 中间：民俗 / 农事 / 诗词 / 三候 / 气温降水 -->
      <div>
        <div class="font-bold mb-1">${t.folk.join(' / ')} · ${t.agri}</div>
        <div class="hint">${t.poem}</div>
        <div class="hint">
          气温 ${window.fmt(d.temp,1)}°C · 
          降水 ${window.fmt(d.rain,0)}% · 
          三候：${t.hou.join('、')}
        </div>
      </div>

      <!-- 右侧：3个功能按钮 -->
      <div class="flex flex-col gap-2">
        <button type="button" class="btn small-btn search-go" data-index="${t.i}">查看</button>
        <button type="button" class="btn small-btn search-analysis" data-index="${t.i}">综合分析</button>
        <button type="button" class="btn small-btn search-compare" data-index="${t.i}">对比</button>
      </div>
    </div>
  `;
};

// 2. 执行搜索（核心函数）
window.doSearch = () => {
  // 获取输入框关键词（转小写，去空格）
  const key = document.getElementById('search-input').value.trim().toLowerCase();
  const panel = document.getElementById('search-panel'); // 搜索结果面板

  // 如果搜索词为空 → 隐藏面板，退出
  if (!key) {
    panel.style.display = 'none';
    return;
  }

  // --------------------------
  // 【全文搜索逻辑】
  // 从所有节气中 查找包含关键词的内容
  // 搜索范围：名称、拼音、农事、民俗、诗词、建议、南北描述、三候
  // --------------------------
  const hits = window.solarTerms
    .map((t, i) => ({ ...t, i })) // 给节气加上索引 i
    .filter(t => {
      // 把所有字段拼成一段文字，判断是否包含关键词
      const searchText = [
        t.name, t.pinyin, t.agri, t.poem, t.advice,
        t.north, t.south, ...t.folk, ...t.hou
      ].join(' ').toLowerCase();
      return searchText.includes(key);
    });

  // --------------------------
  // 无结果 → 显示提示
  // --------------------------
  if (!hits.length) {
    panel.innerHTML = '<div style="color:var(--sub);padding:8px">没有找到结果，可以试试：茶、牡丹、插秧、汤圆、登高。</div>';
  }
  // --------------------------
  // 有结果 → 渲染卡片 + 绑定按钮事件
  // --------------------------
  else {
    // 最多显示 6 条结果
    panel.innerHTML = hits.slice(0, 6).map(window.buildSearchResult).join('');

    // 按钮1：【查看】→ 切换到该节气
    panel.querySelectorAll('.search-go').forEach(b => {
      b.addEventListener('click', () => {
        window.selectTerm(Number(b.dataset.index));
        document.getElementById('search-input').value = window.solarTerms[Number(b.dataset.index)].name;
        panel.style.display = 'none';
      });
    });

    // 按钮2：【综合分析】→ 切换节气并打开分析弹窗
    panel.querySelectorAll('.search-analysis').forEach(b => {
      b.addEventListener('click', () => {
        window.selectTerm(Number(b.dataset.index));
        panel.style.display = 'none';
        window.openAnalysis('summary');
      });
    });

    // 按钮3：【对比】→ 直接打开该节气的对比弹窗
    panel.querySelectorAll('.search-compare').forEach(b => {
      b.addEventListener('click', () => {
        panel.style.display = 'none';
        window.openCompare(Number(b.dataset.index));
      });
    });
  }

  // 显示搜索结果面板
  panel.style.display = 'block';
};