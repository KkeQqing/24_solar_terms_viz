// 获取收藏列表
function favorites() {
  return JSON.parse(localStorage.getItem('solarTermFavorites') || '[]');
}

// 保存收藏列表
function setFavorites(list) {
  localStorage.setItem('solarTermFavorites', JSON.stringify(list));
}

// 切换收藏
function toggleFavorite() {
  const name = solarTerms[currentTermIndex].name;
  let list = favorites();
  list = list.includes(name) ? list.filter(x => x !== name) : [...list, name];
  setFavorites(list);
  updateFavoriteUI();
  toast(list.includes(name) ? `已收藏 ${name}` : `已取消收藏 ${name}`);
}

// 更新收藏UI
function updateFavoriteUI() {
  const liked = favorites().includes(solarTerms[currentTermIndex].name);
  $('fav-label').textContent = liked ? '已收藏' : '收藏';
  $('fav-icon').setAttribute('icon', liked ? 'ph:star-fill' : 'ph:star-bold');
}