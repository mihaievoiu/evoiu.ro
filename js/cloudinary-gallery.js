(async function () {
  const grid = document.getElementById('masonry-grid');
  if (!grid || !grid.dataset.tag) return;

  const tag       = grid.dataset.tag;
  const cloudName = grid.dataset.cloud;
  const sort      = grid.dataset.sort || 'alphabetical';
  const base      = `https://res.cloudinary.com/${cloudName}/image/upload/`;

  const fetchUrl = `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`;
  console.log('[cloudinary-gallery] tag:', JSON.stringify(tag), '| cloud:', JSON.stringify(cloudName), '| url:', fetchUrl);

  try {
    const res = await fetch(fetchUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status} — check Cloudinary Settings → Security → Resource list`);
    const data   = await res.json();
    let   images = data.resources || [];
    if (images.length === 0) {
      grid.innerHTML = '<p class="loading">No images found for this tag.</p>';
      return;
    }

    switch (sort) {
      case 'alphabetical': images.sort((a, b) => a.public_id.localeCompare(b.public_id, undefined, { numeric: true })); break;
      case 'reverse':      images.sort((a, b) => b.public_id.localeCompare(a.public_id, undefined, { numeric: true })); break;
      case 'newest':       images.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); break;
      case 'oldest':       images.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)); break;
    }

    const url = (img, w) =>
      `${base}f_auto,q_auto,w_${w}/v${img.version}/${img.public_id}.${img.format}`;

    grid.innerHTML = images.map(img => `
      <a class="masonry-item"
         href="${url(img, 2500)}"
         data-fancybox="gallery"
         data-caption="">
        <img src="${url(img, 800)}"
             srcset="${url(img, 400)} 400w,
                     ${url(img, 800)} 800w,
                     ${url(img, 1200)} 1200w"
             sizes="(max-width: 480px) 100vw, (max-width: 900px) 50vw, 400px"
             alt=""
             loading="lazy"
             decoding="async">
      </a>`).join('');

    Fancybox.bind('[data-fancybox="gallery"]', {
      Thumbs: { type: 'classic' },
      Toolbar: { display: { left: ['infobar'], middle: [], right: ['zoomIn', 'zoomOut', 'close'] } }
    });
  } catch (err) {
    console.error('[cloudinary-gallery]', err.message);
    grid.innerHTML = `<p class="loading">Could not load images — see console for details.</p>`;
  }
})();
