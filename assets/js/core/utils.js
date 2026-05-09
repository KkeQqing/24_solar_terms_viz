// assets/js/core/utils.js
// 工具函数库：全局通用的小工具、计算方法、格式化、提示框
// 所有 JS 模块都会调用这里的函数

// 1. 数字格式化：保留指定位数小数（默认2位）
// 用于温度、降水、指数等显示
window.fmt = (n, d=2) => Number(n).toFixed(d);

// 2. 消息提示框（页面顶部弹出提示）
// 使用：toast("收藏成功")
window.toast = (msg) => {
  const t = document.getElementById('toast');
  t.textContent = msg;                // 设置提示文字
  t.classList.add('show');            // 显示提示
  clearTimeout(t.timer);              // 清除上一次计时器
  t.timer = setTimeout(() => {
    t.classList.remove('show');        // 1.6秒后自动消失
  }, 1600);
};

// 3. 获取当前日期（中文格式：xxxx年xx月xx日）
window.todayCN = () => {
  const d = new Date();
  return `${d.getFullYear()}年${String(d.getMonth()+1).padStart(2,'0')}月${String(d.getDate()).padStart(2,'0')}日`;
};

// 4. 计算距离下一个节气还有多少天
window.daysToNextTerm = (index) => {
  const now = new Date();
  const term = window.solarTerms[(index+1)%24]; // 取下一个节气
  const [m,d] = term.date.split('.').map(Number);
  let target = new Date(now.getFullYear(), m-1, d);
  if(target < now) target = new Date(now.getFullYear()+1, m-1, d);
  return Math.max(0, Math.ceil((target-now)/86400000));
};

// 5. 根据当前地区（南北）调整节气数据（温度、降水、物候）
window.adjusted = (term) => {
  const r = window.regionProfiles[window.currentRegion || 'north'];
  return {
    ...term,
    temp: Math.round((term.temp + r.tempOffset)*10)/10,    // 调整温度
    rain: Math.max(0, Math.min(100, Math.round(term.rain * r.rainFactor))), // 调整降水
    active: Math.max(5, Math.min(100, 64 + r.activeOffset + Math.round(term.rain/4))), // 物候活跃度
    lag: r.lag
  };
};

// 6. 生成近10年气候模拟数据（温度、降水、日照）
window.climateSeries = (term) => {
  const d = window.adjusted(term);
  const years = Array.from({length:10},(_,i)=>2016+i); // 2016~2025
  const regionBias = (window.currentRegion === 'south') ? 1.6 : -1.1;

  // 生成10年温度曲线
  const temp = years.map((y,i)=>Number((d.temp + (i-4.5)*0.16 + Math.sin((i+(window.currentTermIndex||0))*0.8)*0.55 + regionBias*0.15).toFixed(1)));
  
  // 生成10年降水曲线
  const rain = years.map(()=>Math.max(2, Math.round(d.rain*0.78 + (Math.random()*10-4) + (window.currentRegion==='south'?8:-4))));
  
  // 生成10年日照曲线
  const sun = years.map(()=>Math.max(3, Number((7 + Math.cos(Math.random()*10)/2 + (24-(window.currentTermIndex||0)%12)/12 - (window.currentRegion==='south'?0.5:0)).toFixed(1))));

  return { years, temp, rain, sun };
};

// 7. 生成文旅热度趋势数据（7个点）
window.trendSeries = (term) => {
  const d = window.adjusted(term);
  const base = 22 + (window.currentTermIndex||0)*2.1 + d.rain*0.18 + (window.currentRegion==='south'?6:0);
  return [0,8,-2,12,7,16,22].map((v,i)=>Number(Math.max(10,Math.min(100, base+v+i*0.9)).toFixed(2)));
};

// 8. 计算模块评分：温度、降水、民俗、农事、文旅、日照、均值等
window.moduleScores = (term) => {
  const d = window.adjusted(term);
  const cs = window.climateSeries(term);
  const trend = cs.temp.at(-1)-cs.temp[0];

  const folkScore   = Math.round((d.active + d.rain + window.trendSeries(term).at(-1))/3);
  const agriScore   = Math.round((d.active + d.rain + Math.max(10,92-Math.abs(d.temp-24)*2))/3);
  const travelScore= window.trendSeries(term).at(-1);

  return {
    temp: d.temp,
    rain: d.rain,
    active: d.active,
    lag: d.lag,
    trend: Number(trend.toFixed(2)),
    folk: folkScore,
    travel: travelScore,
    agri: agriScore,
    sun: Number((cs.sun.reduce((a,b)=>a+b,0)/cs.sun.length).toFixed(1)),
    avgTemp: Number((cs.temp.reduce((a,b)=>a+b,0)/cs.temp.length).toFixed(1)),
    avgRain: Math.round(cs.rain.reduce((a,b)=>a+b,0)/cs.rain.length)
  };
};

// 9. 获取当前主题的文字主色（适配深色/浅色模式）
window.textColor = () => document.body.classList.contains('dark') ? '#f5efe4' : '#263238';

// 10. 获取当前主题的文字次要色（适配深色/浅色模式）
window.subColor = () => document.body.classList.contains('dark') ? '#b9b0a2' : '#8a8276';