async function loadGalleries() {
  const container = document.getElementById('gallery-grid');
  try {
    const { galleries } = await fetch('content/galleries/index.json').then(r => r.json());

    const metas = await Promise.all(
      galleries.map(slug =>
        fetch(`content/galleries/${slug}/meta.json`)
          .then(r => r.json())
          .then(meta => ({ slug, ...meta }))
      )
    );

    container.innerHTML = metas.map(g => `
      <a class="gallery-card" href="gallery-detail.html?slug=${g.slug}">
        <div class="gallery-card-img-wrap">
          <img class="gallery-card-img" src="${g.cover}" alt="${g.title}" loading="lazy">
        </div>
        <div class="gallery-card-body">
          <h2 class="gallery-card-title">${g.title}</h2>
          <p class="gallery-card-desc">${g.description}</p>
        </div>
      </a>
    `).join('');
  } catch {
    container.innerHTML = '<p class="loading">Could not load galleries.</p>';
  }
}

loadGalleries();
