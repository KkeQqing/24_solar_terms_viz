// 初始化时间轴
function initTimeline() {
  const box = $('timeline');
  box.innerHTML = '';
  solarTerms.forEach((t, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'timeline-item font-sans text-xs';
    b.title = `${t.name}：${t.hou.join(' / ')}`;
    b.innerHTML = `<div style="font-size:10px">${t.date}</div><div class="dot"></div><div>${t.name}</div>`;
    b.addEventListener('click', () => selectTerm(i));
    box.appendChild(b);
  });
}

// 刷新时间轴选中状态
function refreshTimeline() {
  document.querySelectorAll('.timeline-item').forEach((b, i) => b.classList.toggle('active', i === currentTermIndex));
  document.querySelectorAll('.timeline-item')[currentTermIndex]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

// 刷新区域按钮状态
function refreshRegions() {
  document.querySelectorAll('.region-btn').forEach(b => b.classList.toggle('active', b.dataset.region === currentRegion));
}

// 切换区域
function selectRegion(region) {
  currentRegion = region;
  $('region-label').textContent = regionProfiles[region].label;
  refreshRegions();
  selectTerm(currentTermIndex);
  toast(`已切换到${regionProfiles[region].label}`);
}