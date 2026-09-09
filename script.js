const body = document.body;
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.nav a,.section-rail .dot')];
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');

const activate = (id) => {
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}` || a.dataset.section === id));
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) activate(entry.target.id);
  });
}, { rootMargin: '-32% 0px -58% 0px', threshold: 0 });
sections.forEach(section => observer.observe(section));

links.forEach(link => link.addEventListener('click', () => {
  if (nav.classList.contains('open')) closeMenu();
}));

function setTheme(light) {
  body.classList.toggle('light', light);
  themeToggle.textContent = light ? '☾' : '☼';
  localStorage.setItem('portfolio-theme', light ? 'light' : 'dark');
}

const savedTheme = localStorage.getItem('portfolio-theme');
setTheme(savedTheme === 'light');
themeToggle.addEventListener('click', () => setTheme(!body.classList.contains('light')));

function closeMenu() {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
