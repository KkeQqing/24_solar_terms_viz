// assets/js/core/config.js
// 核心配置文件：存放整个项目的全局变量、状态、开关、实例
// 所有页面、图表、功能都会用到这里的变量

// 当前选中的节气索引（0~23），这里默认 5 = 谷雨
// 24节气按顺序排列：立春、雨水、惊蛰、春分、清明、谷雨...
window.currentTermIndex = 5;

// 当前选中的地区：south 南方 / north 北方
// 用于物候、气候、农事等数据的南北切换
window.currentRegion = 'south';

// 自动轮播定时器
// 存储“自动播放节气”的计时器ID，用于开启/停止自动轮播
window.autoTimer = null;

// 节气对比图表实例（ECharts）
// 打开对比弹窗时，图表对象存在这里
window.compareChart = null;

// 数据分析图表实例（ECharts）
// 打开数据分析弹窗时，图表对象存在这里
window.analysisChart = null;

// 全局图表仓库：存储页面上所有的 ECharts 实例
// 格式：charts.phenology、charts.map、charts.climate ...
window.charts = {};