// assets/js/modules/favorite.js
// 功能：【节气收藏功能】
// 原理：使用浏览器 localStorage 本地存储，永久保存收藏列表
// 作用：点击收藏按钮 → 保存/取消当前节气

// 1. 获取当前所有收藏的节气（从本地存储读取）
window.favorites = () => {
  // 读取本地存储的收藏列表，没有就返回空数组
  return JSON.parse(localStorage.getItem('solarTermFavorites') || '[]');
};

// 2. 把新的收藏列表保存到本地存储
window.setFavorites = (list) => {
  localStorage.setItem('solarTermFavorites', JSON.stringify(list));
};

// 3. 切换收藏状态（收藏 / 取消收藏）
window.toggleFavorite = () => {
  // 获取当前节气名称
  const name = window.solarTerms[window.currentTermIndex].name;
  
  // 读取已收藏列表
  let list = window.favorites();

  // 如果已经收藏 → 移除；没收藏 → 添加
  if (list.includes(name)) {
    // 已收藏 → 取消收藏
    list = list.filter(x => x !== name);
  } else {
    // 未收藏 → 加入收藏
    list = [...list, name];
  }

  // 保存新列表到本地
  window.setFavorites(list);
  
  // 更新按钮图标和文字
  window.updateFavoriteUI();
  
  // 弹出提示：已收藏 / 已取消收藏
  window.toast(list.includes(name) ? `已收藏 ${name}` : `已取消收藏 ${name}`);
};

// 4. 更新收藏按钮的显示状态（星星图标 + 文字）
window.updateFavoriteUI = () => {
  // 判断当前节气是否已收藏
  const liked = window.favorites().includes(window.solarTerms[window.currentTermIndex].name);

  // 更新按钮文字
  document.getElementById('fav-label').textContent = liked ? '已收藏' : '收藏';
  
  // 更新图标：实心星星 / 空心星星
  document.getElementById('fav-icon').setAttribute('icon', liked ? 'ph:star-fill' : 'ph:star-bold');
};