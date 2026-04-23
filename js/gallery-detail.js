const slug = new URLSearchParams(window.location.search).get('slug');

async function loadGallery() {
  if (!slug) { window.location.href = 'gallery.html'; return; }

  try {
    const meta = await fetch(`content/galleries/${slug}/meta.json`).then(r => r.json());

    document.title = `${meta.title} — Evoiu`;
    document.getElementById('gallery-title').textContent = meta.title;
    document.getElementById('gallery-desc').textContent  = meta.description;

    const grid = document.getElementById('masonry-grid');
    grid.innerHTML = meta.images.map(img => `
      <a class="masonry-item"
         href="${img.src}"
         data-fancybox="gallery"
         data-caption="${img.caption || ''}">
        <img src="${img.src}" alt="${img.caption || ''}" loading="lazy">
      </a>
    `).join('');

    Fancybox.bind('[data-fancybox="gallery"]', {
      Thumbs: { type: 'classic' },
      Toolbar: {
        display: { left: ['infobar'], middle: [], right: ['zoomIn', 'zoomOut', 'close'] }
      }
    });
  } catch {
    document.getElementById('masonry-grid').innerHTML =
      '<p class="loading">Could not load gallery.</p>';
  }
}

loadGallery();
