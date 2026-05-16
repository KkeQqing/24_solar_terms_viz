// assets/js/modules/favorite.js
// 收藏功能（UI 按钮已移除，仅保留数据存储）

// 收藏列表，存储节气的索引
window.favorites = [];

// 切换收藏状态（不再更新 DOM）
window.toggleFavorite = () => {
  const idx = window.currentTermIndex;
  const pos = window.favorites.indexOf(idx);
  if (pos > -1) {
    window.favorites.splice(pos, 1);
    // 可以在此处添加 toast 提示
    // window.toast('已取消收藏');
  } else {
    window.favorites.push(idx);
    // window.toast('已收藏');
  }
  // 不再调用 updateFavoriteUI
};

// 已弃用，保留空函数以防其他地方调用报错
window.updateFavoriteUI = () => {
  // 不做任何操作
};