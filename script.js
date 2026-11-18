const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

document.getElementById('year').textContent = new Date().getFullYear();

const toast = document.querySelector('.toast');
let timer;
document.querySelectorAll('[data-placeholder]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    toast.textContent = `${link.dataset.placeholder}: estamos preparando esta herramienta.`;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 3000);
  });
});

// Active navigation link as sections enter the viewport.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, {rootMargin: '-35% 0px -55% 0px'});
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
