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

async function loadAbout() {
  try {
    const text = await fetch('content/about.md').then(r => r.text());
    const { meta, body } = parseFrontmatter(text);

    document.getElementById('about-name').textContent = meta.name  || 'About';
    document.getElementById('about-lead').textContent = meta.lead  || '';

    const photo = document.getElementById('about-photo');
    if (meta.photo) { photo.src = meta.photo; photo.alt = meta.name || ''; }
    else photo.remove();

    document.getElementById('about-body').innerHTML = marked.parse(body);
  } catch {
    document.getElementById('about-body').innerHTML = '<p>Could not load about page.</p>';
  }
}

loadAbout();
