// assets/js/app.js
window.createParticles = () => {
  const box = document.getElementById('particles');
  box.innerHTML = '';
  for(let i=0;i<26;i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.left = `${Math.random()*100}%`;
    p.style.animationDuration = `${10+Math.random()*15}s`;
    p.style.animationDelay = `${Math.random()*-18}s`;
    box.appendChild(p);
  }
};
window.addEventListener('load', () => {
  document.getElementById('current-date').textContent = window.todayCN();
  window.initCharts();
  window.initTimeline();
  window.createParticles();
  window.bindEvents();
  window.selectRegion('south');
  window.selectTerm(1);
  setTimeout(() => Object.values(window.charts).forEach(c=>c.resize()), 180);
});