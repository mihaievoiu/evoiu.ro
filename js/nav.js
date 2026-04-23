(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  const links = [
    { href: 'index.html',   label: 'Home' },
    { href: 'gallery.html', label: 'Galleries' },
    { href: 'blog.html',    label: 'Blog' },
    { href: 'about.html',   label: 'About' },
  ];

  const hasHero = !!document.querySelector('.hero');

  const nav = document.createElement('nav');
  nav.className = hasHero ? '' : 'solid';
  nav.innerHTML = `
    <a class="nav-logo" href="index.html">Evoiu</a>
    <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links">
      ${links.map(l => `<li><a href="${l.href}"${l.href === page ? ' class="active"' : ''}>${l.label}</a></li>`).join('')}
    </ul>
  `;

  document.body.prepend(nav);

  const toggle  = nav.querySelector('.nav-toggle');
  const navList = nav.querySelector('.nav-links');

  toggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  navList.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navList.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );

  if (hasHero) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }
})();
