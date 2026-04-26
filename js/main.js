// Track real visual viewport height for iOS Safari where 100vh doesn't
// update when the browser chrome shows/hides.
(function () {
  function setVh() {
    var h = (window.visualViewport ? window.visualViewport.height : window.innerHeight) + 'px';
    document.documentElement.style.setProperty('--vh', h);
  }
  setVh();
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', setVh, { passive: true });
  }
  window.addEventListener('resize', setVh, { passive: true });
})();

const nav    = document.getElementById('site-nav');
const toggle = nav.querySelector('.nav-toggle');
const list   = nav.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  const open = list.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('menu-open', open);
});


if (document.querySelector('.hero')) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}
