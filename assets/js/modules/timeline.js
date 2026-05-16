// assets/js/modules/timeline.js
// 功能：【底部节气时间轴 + 72候轴】 严格对齐，候单行完整显示，日期右置

window.initTimeline = () => {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';

  // 遍历 24 节气，每个节气创建一个列容器
  window.solarTerms.forEach((term, tIndex) => {
    const col = document.createElement('div');
    col.className = 'term-column';

    // ----- 节气按钮（新布局：圆点在上，名称+日期在下） -----
    const termBtn = document.createElement('button');
    termBtn.type = 'button';
    termBtn.className = 'timeline-item';
    termBtn.title = `${term.name}：${term.hou.join(' / ')}`;
    termBtn.innerHTML = `
      <div class="dot"></div>
      <div class="term-info">
        <span class="term-name">${term.name}</span>
        <span class="term-date">${term.date}</span>
      </div>
    `;
    termBtn.addEventListener('click', () => window.selectTerm(tIndex));

    // ----- 三候按钮组 -----
    const houGroup = document.createElement('div');
    houGroup.className = 'hou-group';

    term.hou.forEach((houName, hIndex) => {
      const globalHouIndex = tIndex * 3 + hIndex;
      const houBtn = document.createElement('button');
      houBtn.type = 'button';
      houBtn.className = 'hou-item';
      houBtn.textContent = houName;
      houBtn.title = `${term.name}·${houName}`;
      houBtn.addEventListener('click', () => {
        window.selectTerm(tIndex);
        window.currentHouIndex = globalHouIndex;
        window.loadHouPage(globalHouIndex);   // ← 新增：加载候页面
        window.refreshTimeline();
      });
      houGroup.appendChild(houBtn);
    });

    col.appendChild(termBtn);
    col.appendChild(houGroup);
    timeline.appendChild(col);
  });
};

// 刷新时间轴与候轴的高亮、滚动居中
window.refreshTimeline = () => {
  const termIndex = window.currentTermIndex ?? 0;
  const houIndex = window.currentHouIndex ?? 0;

  // 高亮节气按钮
  document.querySelectorAll('.timeline-item').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === termIndex);
  });

  // 高亮候按钮
  document.querySelectorAll('.hou-item').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === houIndex);
  });

  // 将当前候按钮滚动到水平居中位置
  const activeHou = document.querySelectorAll('.hou-item')[houIndex];
  if (activeHou) {
    activeHou.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });
  }
};