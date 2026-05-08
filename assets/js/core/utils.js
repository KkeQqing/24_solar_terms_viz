// 全局工具函数
const $ = id => document.getElementById(id);

// 数字格式化
function fmt(n, d = 2) {
  return Number(n).toFixed(d);
}

// 提示框
function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t.timer);
  t.timer = setTimeout(() => t.classList.remove('show'), 1600);
}

// 获取当前中文日期
function todayCN() {
  const d = new Date();
  return `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(2, '0')}月${String(d.getDate()).padStart(2, '0')}日`;
}

// 计算距离下一个节气的天数
function daysToNextTerm(index) {
  const now = new Date();
  const term = solarTerms[(index + 1) % 24];
  const [m, d] = term.date.split('.').map(Number);
  let target = new Date(now.getFullYear(), m - 1, d);
  if (target < now) target = new Date(now.getFullYear() + 1, m - 1, d);
  return Math.max(0, Math.ceil((target - now) / 86400000));
}

// 根据区域修正节气数据
function adjusted(term) {
  const r = regionProfiles[currentRegion];
  return {
    ...term,
    temp: Math.round((term.temp + r.tempOffset) * 10) / 10,
    rain: Math.max(0, Math.min(100, Math.round(term.rain * r.rainFactor))),
    active: Math.max(5, Math.min(100, 64 + r.activeOffset + Math.round(term.rain / 4))),
    lag: r.lag
  };
}

// 获取主题文字颜色
function textColor() {
  return document.body.classList.contains('dark') ? '#f5efe4' : '#263238';
}

// 获取次要文字颜色
function subColor() {
  return document.body.classList.contains('dark') ? '#b9b0a2' : '#8a8276';
}

// 气候数据序列
function climateSeries(term) {
  const d = adjusted(term);
  const years = Array.from({ length: 10 }, (_, i) => 2016 + i);
  const regionBias = currentRegion === 'south' ? 1.6 : -1.1;
  const temp = years.map((y, i) => Number((d.temp + (i - 4.5) * 0.16 + Math.sin((i + currentTermIndex) * 0.8) * 0.55 + regionBias * .15).toFixed(1)));
  const rain = years.map((y, i) => Math.max(2, Math.round(d.rain * .78 + i * 1.6 + Math.cos(i * 1.5 + currentTermIndex) * 5 + (currentRegion === 'south' ? 8 : -4))));
  const sun = years.map((y, i) => Math.max(3, Number((7 + Math.cos(i + currentTermIndex / 3) * 1.4 + (24 - currentTermIndex % 12) / 12 - (currentRegion === 'south' ? .5 : 0)).toFixed(1))));
  return { years, temp, rain, sun };
}

// 文旅趋势数据
function trendSeries(term) {
  const d = adjusted(term);
  const base = 22 + currentTermIndex * 2.1 + d.rain * .18 + (currentRegion === 'south' ? 6 : 0);
  return [0, 8, -2, 12, 7, 16, 22].map((v, i) => Number(Math.max(10, Math.min(100, base + v + i * .9)).toFixed(2)));
}

// 模块评分计算
function moduleScores(term) {
  const d = adjusted(term), cs = climateSeries(term), trend = cs.temp.at(-1) - cs.temp[0];
  const folkScore = Math.round((d.active + d.rain + trendSeries(term).at(-1)) / 3);
  const agriScore = Math.round((d.active + d.rain + Math.max(10, 92 - Math.abs(d.temp - 24) * 2)) / 3);
  const travelScore = trendSeries(term).at(-1);
  return {
    temp: d.temp,
    rain: d.rain,
    active: d.active,
    lag: d.lag,
    trend: Number(trend.toFixed(2)),
    folk: folkScore,
    travel: travelScore,
    agri: agriScore,
    sun: Number((cs.sun.reduce((a, b) => a + b, 0) / cs.sun.length).toFixed(1)),
    avgTemp: Number((cs.temp.reduce((a, b) => a + b, 0) / cs.temp.length).toFixed(1)),
    avgRain: Math.round(cs.rain.reduce((a, b) => a + b, 0) / cs.rain.length)
  };
}

// 图表提示框格式化
function chartTooltipValue(params) {
  if (Array.isArray(params)) {
    return params.map(p => `${p.marker}${p.seriesName}：${typeof p.value === 'number' ? fmt(p.value, 2) : p.value}`).join('<br>');
  }
  return `${p.marker}${p.name}<br>${p.seriesName || '数值'}：${typeof p.value === 'number' ? fmt(p.value, 2) : p.value}`;
}