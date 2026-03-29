// ── THEME TOGGLE ──
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

function setTheme(dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeIcon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
  setTheme(html.getAttribute('data-theme') !== 'dark');
});

// restore saved theme
if (localStorage.getItem('theme') === 'dark') setTheme(true);

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

// ── ACTIVE NAV LINK ON SCROLL ──
const sections  = document.querySelectorAll('[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});

// ── PROJECT CAROUSEL (2 cards per view) ──
const CARDS_PER_VIEW = 2;
const track    = document.getElementById('projTrack');
const prevBtn  = document.getElementById('projPrev');
const nextBtn  = document.getElementById('projNext');
const dotsWrap = document.getElementById('projDots');

const cards    = track ? track.querySelectorAll('.proj-card') : [];
const total    = cards.length;
const pages    = Math.ceil(total / CARDS_PER_VIEW);
let   current  = 0;

function buildDots() {
  dotsWrap.innerHTML = '';
  for (let i = 0; i < pages; i++) {
    const btn = document.createElement('button');
    btn.className = 'proj-dot' + (i === 0 ? ' active' : '');
    btn.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(btn);
  }
}

function goTo(page) {
  current = Math.max(0, Math.min(page, pages - 1));

  // calculate how wide one card + gap is
  const cardEl  = cards[0];
  const gap     = 20;
  const cardW   = cardEl.offsetWidth + gap;
  track.style.transform = `translateX(-${current * CARDS_PER_VIEW * cardW}px)`;

  // update dots
  dotsWrap.querySelectorAll('.proj-dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });

  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === pages - 1;
}

if (track && total > 0) {
  buildDots();
  goTo(0);
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  window.addEventListener('resize', () => goTo(current));
}

// ── PROJECT IMAGE UPLOAD ──
function loadProjImg(input, imgId) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = document.getElementById(imgId);
    img.src = e.target.result;
    img.style.display = 'block';
    const placeholder = img.nextElementSibling;
    if (placeholder && placeholder.classList.contains('proj-img-placeholder')) {
      placeholder.style.display = 'none';
    }
  };
  reader.readAsDataURL(file);
}
