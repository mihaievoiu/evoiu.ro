function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  m[1].split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
  });
  return { meta, body: m[2] };
}

function fmtDate(str) {
  return new Date(str).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

async function loadBlog() {
  const container = document.getElementById('blog-grid');
  try {
    const { posts } = await fetch('content/blog/index.json').then(r => r.json());

    const articles = await Promise.all(
      posts.map(slug =>
        fetch(`content/blog/${slug}.md`)
          .then(r => r.text())
          .then(text => ({ slug, ...parseFrontmatter(text).meta }))
      )
    );

    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = articles.map(p => `
      <a class="blog-card" href="blog-post.html?slug=${p.slug}">
        <div class="blog-card-img-wrap">
          <img class="blog-card-img" src="${p.cover}" alt="${p.title}" loading="lazy">
        </div>
        <div class="blog-card-body">
          <div class="blog-card-meta">${fmtDate(p.date)}</div>
          <h2 class="blog-card-title">${p.title}</h2>
          <p class="blog-card-excerpt">${p.excerpt}</p>
        </div>
      </a>
    `).join('');
  } catch {
    container.innerHTML = '<p class="loading">Could not load posts.</p>';
  }
}

loadBlog();
