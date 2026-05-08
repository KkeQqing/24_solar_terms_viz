import { solarTerms } from './core/data.js';
window.solarTerms = solarTerms;

// 工具
import { $, currentTermIndex } from './core/utils.js';

// 图表初始化
import { initPhenologyChart } from './charts/phenology';
import { initClimateChart } from './charts/climate';
import { initMainMap } from './charts/map';
import { initFolkChart } from './charts/folk';
import { initAgriChart } from './charts/agri';
import { initTravelChart } from './charts/travel';

// 模块初始化
import { bindThemeBtn } from './modules/theme';
import { initTimeline } from './modules/timeline';
import { initSearch } from './modules/search';
import { initFav } from './modules/favorite';
import { initAutoPlay } from './modules/autoplay';
import { initPoster } from './modules/poster';

// 渲染、事件
import { renderAll } from './render';
import { bindGlobalEvents } from './events';

// 对外暴露切换方法
export function renderAllByIndex(idx) {
  renderAll(idx);
}

// 初始化入口
function init() {
  // 初始化所有图表
  initPhenologyChart(currentTermIndex);
  initClimateChart(currentTermIndex);
  initMainMap();
  initFolkChart(currentTermIndex);
  initAgriChart(currentTermIndex);
  initTravelChart(currentTermIndex);

  // 绑定模块
  bindThemeBtn();
  initTimeline();
  initSearch();
  initFav();
  initAutoPlay();
  initPoster();

  // 全局事件
  bindGlobalEvents();

  // 首次渲染
  renderAll(currentTermIndex);
}

// 页面加载完成启动
window.onload = init;