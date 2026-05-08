import { $, currentTermIndex, moduleScores, daysToNextTerm } from './core/utils.js';
import { solarTerms, regionProfiles } from './core/data.js';
import { updatePhenologyChart } from './charts/phenology';
import { updateClimateChart } from './charts/climate';
import { updateFolkChart } from './charts/folk';
import { updateAgriChart } from './charts/agri';
import { updateTravelChart } from './charts/travel';
import { updateTimelineActive } from './modules/timeline';
import { refreshFavUI } from './modules/favorite';

export function renderAll(index) {
  currentTermIndex = index;
  const term = solarTerms[index];
  const score = moduleScores(term);

  // 头部文字
  $('solar-title').innerText = term.name;
  $('solar-pinyin').innerText = term.pinyin;
  $('region-label').innerText = regionProfiles.north.label;
  $('current-solar-term').innerText = term.name;
  $('next-term-label').innerText = `｜ 距下一节气还有 ${daysToNextTerm(index)} 天`;

  // 诗句物候
  $('poem-content').innerText = `“${term.poem}”`;
  $('three-hou').innerHTML = term.hou.map(h => `<span>• ${h}</span>`).join('');
  $('daily-advice').innerText = term.advice;

  // 统计数值
  $('avg-temp').innerText = `${score.avgTemp} ℃`;
  $('avg-rain').innerText = `${score.avgRain} mm`;
  $('climate-trend').innerText = score.trend > 0 ? '升温↑' : '降温↓';
  $('trend-score').innerText = `热度值 ${score.travel}`;

  // 图表更新
  updatePhenologyChart(index);
  updateClimateChart(index);
  updateFolkChart(index);
  updateAgriChart(index);
  updateTravelChart(index);

  // 时间轴、收藏状态
  updateTimelineActive(index);
  refreshFavUI();
}