// assets/js/modules/timeline.js
// 功能：【底部节气时间轴】
// 作用：生成24个节气按钮、点击切换节气、高亮当前节气、自动滚动居中

// 1. 初始化时间轴：动态创建 24 个节气按钮
window.initTimeline = () => {
  // 获取时间轴容器
  const box = document.getElementById('timeline');
  // 清空容器
  box.innerHTML = '';

  // 循环遍历 24 节气，为每个节气创建按钮
  window.solarTerms.forEach((t, i) => {
    // 创建 button 元素
    const btn = document.createElement('button');
    btn.type = 'button';
    // 设置样式类名
    btn.className = 'timeline-item font-sans text-xs';
    // 鼠标悬浮提示：节气名 + 三候
    btn.title = `${t.name}：${t.hou.join(' / ')}`;

    // 按钮内部结构：日期 + 中间小圆点 + 节气名称
    btn.innerHTML = `
      <div style="font-size:10px">${t.date}</div>
      <div class="dot"></div>
      <div>${t.name}</div>
    `;

    // 点击按钮 → 切换到对应节气
    btn.addEventListener('click', () => window.selectTerm(i));

    // 把按钮添加到时间轴容器中
    box.appendChild(btn);
  });
};

// 2. 刷新时间轴状态：高亮当前节气 + 自动滚动居中
window.refreshTimeline = () => {
  // 遍历所有时间轴按钮
  document.querySelectorAll('.timeline-item').forEach((b, i) => {
    // 给【当前节气】添加 .active 高亮样式
    b.classList.toggle('active', i === window.currentTermIndex);
  });

  // 让当前节气按钮自动【平滑滚动到视图中间】
  document.querySelectorAll('.timeline-item')[window.currentTermIndex]?.scrollIntoView({
    behavior: 'smooth',   // 平滑滚动
    inline: 'center',    // 水平居中
    block: 'nearest'      // 垂直不偏移
  });
};