// assets/js/modules/autoplay.js
window.toggleAuto = () => {
  if(window.autoTimer) {
    clearInterval(window.autoTimer);
    window.autoTimer = null;
    document.getElementById('auto-btn').classList.remove('active');
    document.getElementById('auto-btn').innerHTML = '<iconify-icon icon="ph:play-bold"></iconify-icon>自动轮播';
    window.toast('已停止自动轮播');
  } else {
    window.autoTimer = setInterval(() => window.selectTerm(window.currentTermIndex+1), 2800);
    document.getElementById('auto-btn').classList.add('active');
    document.getElementById('auto-btn').innerHTML = '<iconify-icon icon="ph:pause-bold"></iconify-icon>轮播中';
    window.toast('已开启自动轮播');
  }
};