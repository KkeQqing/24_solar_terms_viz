// assets/js/render.js
window.updateCharts = (raw) => {
  window.updatePhenology(raw);
  window.updateMainMap(raw);
  window.updateFolk(raw);
  window.updateAgri(raw);
  window.updateTravel(raw);
  window.updateClimate(raw);
};
window.selectTerm = (i) => {
  window.currentTermIndex = (i+24)%24;
  const raw = window.solarTerms[window.currentTermIndex];
  document.documentElement.style.setProperty('--season', raw.color);
  document.documentElement.style.setProperty('--season2', raw.color2);
  document.getElementById('solar-title').textContent = raw.name;
  document.getElementById('solar-pinyin').textContent = raw.pinyin;
  document.getElementById('current-solar-term').textContent = raw.name;
  document.getElementById('next-term-label').textContent = `| 距${window.solarTerms[(window.currentTermIndex+1)%24].name}约${window.daysToNextTerm(window.currentTermIndex)}天`;
  document.getElementById('poem-content').textContent = `“${raw.poem}”`;
  document.getElementById('three-hou').innerHTML = raw.hou.map((h,idx)=>`<span>${['一','二','三'][idx]}候 · ${h}</span>`).join('');
  document.getElementById('daily-advice').textContent = raw.advice;
  document.getElementById('medal-tip').textContent = `领取·${raw.name}勋章`;
  window.refreshTimeline();
  window.updateFavoriteUI();
  window.updateCharts(raw);
};
window.selectRegion = (region) => {
  window.currentRegion = region;
  document.getElementById('region-label').textContent = window.regionProfiles[region].label;
  document.querySelectorAll('.region-btn').forEach(b=>b.classList.toggle('active', b.dataset.region===region));
  window.selectTerm(window.currentTermIndex);
  window.toast(`已切换到${window.regionProfiles[region].label}`);
};
window.initCharts = () => {
  ['phenology-chart','main-map','folk-chart','agri-chart','travel-chart','climate-chart'].forEach(id=>window.charts[id]=echarts.init(document.getElementById(id)));
  window.addEventListener('resize', () => Object.values(window.charts).forEach(c=>c.resize()));
};
window.refreshAllCharts = () => window.updateCharts(window.solarTerms[window.currentTermIndex]);
window.chartTooltipValue = (params) => { if(Array.isArray(params)) return params.map(p=>`${p.marker}${p.seriesName}：${typeof p.value==='number'?window.fmt(p.value,2):p.value}`).join('<br>'); return `${params.marker}${params.name}<br>数值：${typeof params.value==='number'?window.fmt(params.value,2):params.value}`; };