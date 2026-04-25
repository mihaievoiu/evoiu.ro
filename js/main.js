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
