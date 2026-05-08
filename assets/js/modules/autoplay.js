// 自动轮播
function toggleAuto() {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
    $('auto-btn').classList.remove('active');
    $('auto-btn').innerHTML = '<iconify-icon icon="ph:play-bold"></iconify-icon>自动轮播';
    toast('已停止自动轮播');
  } else {
    autoTimer = setInterval(() => selectTerm(currentTermIndex + 1), 2800);
    $('auto-btn').classList.add('active');
    $('auto-btn').innerHTML = '<iconify-icon icon="ph:pause-bold"></iconify-icon>轮播中';
    toast('已开启自动轮播');
  }
}