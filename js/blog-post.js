const slug = new URLSearchParams(window.location.search).get('slug');

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

async function loadPost() {
  if (!slug) { window.location.href = 'blog.html'; return; }

  try {
    const text        = await fetch(`content/blog/${slug}/index.md`).then(r => r.text());
    const { meta, body } = parseFrontmatter(text);

    document.title = `${meta.title} — Evoiu`;
    document.getElementById('post-date').textContent  = fmtDate(meta.date);
    document.getElementById('post-title').textContent = meta.title;

    if (meta.cover) {
      const img = document.createElement('img');
      img.className = 'post-cover';
      img.src = meta.cover;
      img.alt = meta.title;
      document.getElementById('post-body').before(img);
    }

    document.getElementById('post-body').innerHTML = marked.parse(body);
  } catch {
    document.getElementById('post-body').innerHTML = '<p>Could not load post.</p>';
  }
}

loadPost();
