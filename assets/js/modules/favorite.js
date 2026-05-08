// assets/js/modules/favorite.js
window.favorites = () => JSON.parse(localStorage.getItem('solarTermFavorites')||'[]');
window.setFavorites = (list) => localStorage.setItem('solarTermFavorites', JSON.stringify(list));
window.toggleFavorite = () => {
  const name = window.solarTerms[window.currentTermIndex].name;
  let list = window.favorites();
  list = list.includes(name) ? list.filter(x=>x!==name) : [...list, name];
  window.setFavorites(list);
  window.updateFavoriteUI();
  window.toast(list.includes(name) ? `已收藏 ${name}` : `已取消收藏 ${name}`);
};
window.updateFavoriteUI = () => {
  const liked = window.favorites().includes(window.solarTerms[window.currentTermIndex].name);
  document.getElementById('fav-label').textContent = liked ? '已收藏' : '收藏';
  document.getElementById('fav-icon').setAttribute('icon', liked ? 'ph:star-fill' : 'ph:star-bold');
};