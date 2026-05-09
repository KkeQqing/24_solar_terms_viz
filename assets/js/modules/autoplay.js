// assets/js/modules/autoplay.js
// 功能：【自动轮播控制】
// 作用：点击按钮，自动切换24节气（播放/暂停）

// 切换自动轮播（开启 / 停止）
window.toggleAuto = () => {

  // ————————————————————————————————
  // 情况1：如果正在轮播 → 停止轮播
  // ————————————————————————————————
  if (window.autoTimer) {
    clearInterval(window.autoTimer);      // 清除定时器
    window.autoTimer = null;             // 标记为停止状态

    // 恢复按钮样式：显示“播放图标 + 自动轮播”文字
    document.getElementById('auto-btn').classList.remove('active');
    document.getElementById('auto-btn').innerHTML = 
      '<iconify-icon icon="ph:play-bold"></iconify-icon>自动轮播';

    window.toast('已停止自动轮播');      // 弹出提示
  }

  // ————————————————————————————————
  // 情况2：如果没有轮播 → 开启轮播
  // ————————————————————————————————
  else {
    // 设置定时器：每 2800ms（2.8秒）切换下一个节气
    window.autoTimer = setInterval(() => {
      window.selectTerm(window.currentTermIndex + 1);
    }, 2800);

    // 按钮样式切换为：暂停图标 + 轮播中
    document.getElementById('auto-btn').classList.add('active');
    document.getElementById('auto-btn').innerHTML = 
      '<iconify-icon icon="ph:pause-bold"></iconify-icon>轮播中';

    window.toast('已开启自动轮播');      // 弹出提示
  }
};