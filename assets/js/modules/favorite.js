import { $, toast } from '../core/utils.js';

let favList = JSON.parse(localStorage.getItem('solarFav') || '[]');

export function initFav() {
  const btn = $('fav-btn');
  const icon = $('fav-icon');
  const label = $('fav-label');

  refreshFavUI();

  btn.onclick = () => {
    const name = $('solar-title').innerText;
    if(favList.includes(name)) {
      favList = favList.filter(x => x !== name);
      toast('已取消收藏');
    } else {
      favList.push(name);
      toast('收藏成功');
    }
    localStorage.setItem('solarFav', JSON.stringify(favList));
    refreshFavUI();
  };
}

export function refreshFavUI() {
  const name = $('solar-title').innerText;
  const icon = $('fav-icon');
  const label = $('fav-label');
  if(favList.includes(name)) {
    icon.setAttribute('icon','ph:star-fill');
    label.innerText = '已收藏';
  } else {
    icon.setAttribute('icon','ph:star-bold');
    label.innerText = '收藏';
  }
}