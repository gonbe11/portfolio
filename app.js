const container = document.querySelector('#projects');
const dialog = document.querySelector('#project-dialog');
let previousFocus;
window.portfolioProjects.forEach((project, index) => {
  const button = document.createElement('button');
  button.className = `project project-${index + 1}`;
  const art = document.createElement('span'); art.className = 'project-art';
  if (project.image) {
    const img = document.createElement('img'); img.src = project.image; img.alt = project.title; img.loading = 'lazy'; art.append(img);
  } else {
    const shape = document.createElement('span'); shape.className = 'placeholder-shape'; shape.setAttribute('aria-hidden', 'true'); art.append(shape);
    const label = document.createElement('span'); label.className = 'placeholder-label'; label.textContent = '작업 공개 예정'; art.append(label);
  }
  const top = document.createElement('span'); top.className = 'project-top';
  const number = document.createElement('span'); number.textContent = `0${index + 1}`;
  const status = document.createElement('span'); status.textContent = project.ready ? 'VIEW PROJECT ↗' : '준비 중 ↗'; top.append(number, status); art.append(top);
  const caption = document.createElement('span'); caption.className = 'project-caption';
  const category = document.createElement('span'); category.className = 'small-label'; category.textContent = project.category;
  const title = document.createElement('strong'); title.textContent = project.title; caption.append(category, title); button.append(art, caption);
  button.addEventListener('click', () => {
    previousFocus = button;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-description').textContent = project.description;
    const meta = document.querySelector('#dialog-meta'); meta.replaceChildren();
    [['담당 역할', project.role], ['사용 도구', project.tools], ['작업 과정', project.process]].forEach(([label, value]) => {
      if (!value) return;
      const row = document.createElement('div'); const dt = document.createElement('dt'); const dd = document.createElement('dd'); dt.textContent = label; dd.textContent = value; row.append(dt, dd); meta.append(row);
    });
    if (project.video) {
      try { const url = new URL(project.video); if (url.protocol === 'https:') { const a = document.createElement('a'); a.href = url.href; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.className = 'video-link'; a.textContent = '작업 영상 보기 ↗'; meta.append(a); } } catch {}
    }
    dialog.showModal(); document.body.classList.add('modal-open');
  });
  container.append(button);
});
document.querySelectorAll('.close,.dialog-dismiss').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); previousFocus?.focus(); });
document.querySelector('#year').textContent = new Date().getFullYear();
const links = document.querySelectorAll('nav a');
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) links.forEach(link => { if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); }); }), {rootMargin:'-15% 0px -50% 0px'});
document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
