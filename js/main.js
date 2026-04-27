// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const html        = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}

// Sync aria-label with whatever the inline script already applied
setTheme(html.getAttribute('data-theme') || 'light');

themeToggle.addEventListener('click', () => {
  setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

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
