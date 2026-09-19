/* =============================================================
   Solace Construction — interactions + generated SVG artwork
   ============================================================= */

/* ---------- SVG scenes (no external image assets required) ---------- */
const PALETTE = {
  sky1: '#1c242a', sky2: '#0e1315',
  amber: '#e1a459', amberDeep: '#c07f30',
  steel: '#3a464d', steelLight: '#55646c',
  glass: 'rgba(225,164,89,.35)', line: 'rgba(255,255,255,.18)'
};

function skyline(seed = 1, opts = {}) {
  const w = 800, h = 600;
  const rnd = mulberry(seed);
  let bg = '';
  // background towers
  for (let i = 0; i < 9; i++) {
    const bw = 60 + rnd() * 70;
    const x = i * 92 - 20;
    const bh = 140 + rnd() * 300;
    bg += `<rect x="${x.toFixed(0)}" y="${(h - bh).toFixed(0)}" width="${bw.toFixed(0)}" height="${bh.toFixed(0)}" fill="${PALETTE.steel}" opacity="${(0.25 + rnd() * 0.3).toFixed(2)}" rx="3"/>`;
    // windows
    for (let r = 0; r < Math.floor(bh / 34); r++) {
      for (let c = 0; c < Math.floor(bw / 26); c++) {
        if (rnd() > 0.55) continue;
        bg += `<rect x="${(x + 8 + c * 26).toFixed(0)}" y="${(h - bh + 14 + r * 34).toFixed(0)}" width="10" height="14" fill="${PALETTE.amber}" opacity="${(0.15 + rnd() * 0.5).toFixed(2)}"/>`;
      }
    }
  }
  const crane = opts.crane === false ? '' : `
    <g stroke="${PALETTE.amber}" stroke-width="6" fill="none" stroke-linecap="round">
      <path d="M545 520 V150"/>
      <path d="M300 150 H700"/>
      <path d="M545 150 L470 96 L545 96 Z" stroke-width="4" opacity=".85"/>
      <path d="M545 96 L660 150" stroke-width="4" opacity=".85"/>
      <path d="M380 150 V236" stroke-width="4"/>
      <rect x="352" y="236" width="56" height="42" rx="4" fill="${PALETTE.amberDeep}" stroke="none"/>
      <path d="M515 520 h60" stroke-width="10"/>
    </g>`;
  const scaffold = `
    <g stroke="${PALETTE.line}" stroke-width="3" fill="none">
      <path d="M60 560 V300 H240 V560"/>
      <path d="M60 370 H240 M60 440 H240 M60 510 H240"/>
      <path d="M150 300 V560"/>
    </g>`;
  return svgWrap(w, h, `
    <defs>
      <linearGradient id="sky${seed}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${PALETTE.sky1}"/>
        <stop offset="1" stop-color="${PALETTE.sky2}"/>
      </linearGradient>
      <radialGradient id="glow${seed}" cx=".75" cy=".2" r=".7">
        <stop offset="0" stop-color="${PALETTE.amber}" stop-opacity=".28"/>
        <stop offset="1" stop-color="${PALETTE.amber}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sky${seed})"/>
    <rect width="${w}" height="${h}" fill="url(#glow${seed})"/>
    ${bg}${scaffold}${crane}
    <rect y="${h - 40}" width="${w}" height="40" fill="#0b0f11"/>
    <g stroke="${PALETTE.amber}" stroke-width="4" opacity=".55">
      <path d="M0 ${h - 20} H${w}" stroke-dasharray="26 20"/>
    </g>`);
}

function blueprintScene(seed = 2) {
  const w = 800, h = 600;
  const rnd = mulberry(seed);
  let rooms = '';
  let x = 70;
  while (x < 700) {
    const bw = 90 + rnd() * 130;
    let y = 90;
    while (y < 480) {
      const bh = 80 + rnd() * 130;
      rooms += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${Math.min(bw, 700 - x).toFixed(0)}" height="${Math.min(bh, 500 - y).toFixed(0)}" fill="none" stroke="${PALETTE.amber}" stroke-opacity=".5" stroke-width="2"/>`;
      y += bh + 10;
    }
    x += bw + 10;
  }
  return svgWrap(w, h, `
    <rect width="${w}" height="${h}" fill="#101619"/>
    <g stroke="rgba(255,255,255,.06)" stroke-width="1">
      ${gridLines(w, h, 32)}
    </g>
    ${rooms}
    <g stroke="${PALETTE.amber}" stroke-width="3" fill="none">
      <rect x="60" y="80" width="650" height="430"/>
      <circle cx="60" cy="80" r="6" fill="${PALETTE.amber}"/>
      <circle cx="710" cy="510" r="6" fill="${PALETTE.amber}"/>
      <path d="M60 545 H710" stroke-dasharray="8 8" stroke-width="2"/>
      <path d="M60 535 V555 M710 535 V555" stroke-width="2"/>
    </g>
    <text x="60" y="580" fill="rgba(255,255,255,.45)" font-family="monospace" font-size="20">SCALE 1:200 · STRUCTURAL LAYOUT</text>`);
}

function towerScene(seed = 3) {
  const w = 800, h = 600;
  let floors = '';
  for (let i = 0; i < 11; i++) {
    const y = 120 + i * 38;
    floors += `<rect x="260" y="${y}" width="280" height="30" fill="${i % 2 ? '#222c32' : '#2b363d'}"/>`;
    for (let c = 0; c < 7; c++) {
      floors += `<rect x="${272 + c * 38}" y="${y + 7}" width="26" height="16" fill="${PALETTE.amber}" opacity="${(0.12 + (i * c % 5) / 12).toFixed(2)}"/>`;
    }
  }
  return svgWrap(w, h, `
    <rect width="${w}" height="${h}" fill="#0f1417"/>
    <g stroke="rgba(255,255,255,.05)">${gridLines(w, h, 40)}</g>
    <rect x="250" y="96" width="300" height="24" fill="${PALETTE.amberDeep}" rx="4"/>
    ${floors}
    <rect x="250" y="538" width="300" height="24" fill="#39454c" rx="4"/>
    <g stroke="${PALETTE.amber}" stroke-width="5" fill="none" opacity=".9">
      <path d="M170 560 V180 M170 180 H330"/>
      <path d="M300 180 V250" stroke-width="3"/>
      <rect x="282" y="250" width="36" height="28" fill="${PALETTE.amber}" stroke="none"/>
    </g>
    <rect y="560" width="${w}" height="40" fill="#0a0d0f"/>`);
}

function roadScene(seed = 4) {
  const w = 800, h = 600;
  return svgWrap(w, h, `
    <defs><linearGradient id="rd" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1b2429"/><stop offset="1" stop-color="#0d1214"/>
    </linearGradient></defs>
    <rect width="${w}" height="${h}" fill="url(#rd)"/>
    <path d="M0 600 L320 210 L480 210 L800 600 Z" fill="#2a343a"/>
    <path d="M400 210 L400 600" stroke="${PALETTE.amber}" stroke-width="10" stroke-dasharray="40 40" opacity=".85"/>
    <path d="M320 210 L0 600" stroke="rgba(255,255,255,.35)" stroke-width="5"/>
    <path d="M480 210 L800 600" stroke="rgba(255,255,255,.35)" stroke-width="5"/>
    <g fill="${PALETTE.amber}" opacity=".9">
      <rect x="120" y="330" width="14" height="120" rx="3"/>
      <rect x="666" y="330" width="14" height="120" rx="3"/>
      <circle cx="127" cy="320" r="14"/><circle cx="673" cy="320" r="14"/>
    </g>
    <rect y="180" width="${w}" height="34" fill="#0b0f11"/>
    <g stroke="rgba(255,255,255,.08)">${gridLines(w, 180, 30)}</g>`);
}

function interiorScene(seed = 5) {
  const w = 800, h = 600;
  return svgWrap(w, h, `
    <rect width="${w}" height="${h}" fill="#121819"/>
    <rect x="80" y="70" width="640" height="420" fill="#1b2328" stroke="${PALETTE.amber}" stroke-opacity=".4" stroke-width="3"/>
    <rect x="120" y="110" width="250" height="340" fill="rgba(225,164,89,.14)" stroke="${PALETTE.amber}" stroke-opacity=".5"/>
    <rect x="400" y="110" width="280" height="150" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.18)"/>
    <rect x="400" y="290" width="280" height="160" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.14)"/>
    <g stroke="${PALETTE.amber}" stroke-width="4" fill="none">
      <path d="M80 520 H720"/>
      <path d="M150 520 V560 M650 520 V560"/>
    </g>
    <g fill="rgba(255,255,255,.25)">
      ${Array.from({ length: 5 }, (_, i) => `<rect x="${430 + i * 50}" y="${150}" width="30" height="70" rx="4"/>`).join('')}
    </g>`);
}

function gridLines(w, h, step) {
  let s = '';
  for (let x = 0; x <= w; x += step) s += `<path d="M${x} 0 V${h}"/>`;
  for (let y = 0; y <= h; y += step) s += `<path d="M0 ${y} H${w}"/>`;
  return s;
}

function svgWrap(w, h, inner) {
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">${inner}</svg>`;
}

function mulberry(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const SCENES = {
  skyline, blueprint: blueprintScene, tower: towerScene, road: roadScene, interior: interiorScene
};

function paintScenes() {
  document.querySelectorAll('[data-scene]').forEach((el, i) => {
    const fn = SCENES[el.dataset.scene] || skyline;
    el.insertAdjacentHTML('afterbegin', fn(Number(el.dataset.seed || i + 1)));
  });
}

/* ---------- Header + nav ---------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  const bar = document.querySelector('.progress-bar');
  const top = document.querySelector('.scroll-top');

  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 10);
    top?.classList.toggle('show', y > 500);
    if (bar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  top?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const drawer = document.querySelector('.mobile-nav');
  document.querySelector('.nav-toggle')?.addEventListener('click', () => {
    drawer?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  const close = () => { drawer?.classList.remove('open'); document.body.style.overflow = ''; };
  document.querySelector('.mobile-close')?.addEventListener('click', close);
  drawer?.addEventListener('click', e => { if (e.target === drawer) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      entry.target.style.transitionDelay = `${Math.min(i * 70, 280)}ms`;
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px' });
  items.forEach(el => io.observe(el));
}

/* ---------- Animated counters ---------- */
function initCounters() {
  const nodes = document.querySelectorAll('[data-count]');
  if (!nodes.length) return;
  const run = (el) => {
    const target = Number(el.dataset.count);
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  nodes.forEach(n => io.observe(n));
}

/* ---------- Accordion ---------- */
function initAccordion() {
  document.querySelectorAll('.acc-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.acc-item');
      const panel = item.querySelector('.acc-panel');
      const open = item.classList.contains('open');
      item.closest('.accordion').querySelectorAll('.acc-item.open').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.acc-panel').style.maxHeight = null;
        other.querySelector('.acc-trigger').setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        item.classList.add('open');
        panel.style.maxHeight = `${panel.scrollHeight}px`;
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ---------- Project filter ---------- */
function initFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  if (!buttons.length) return;
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('[data-category]').forEach(card => {
        card.classList.toggle('is-hidden', f !== 'all' && card.dataset.category !== f);
      });
    });
  });
}

/* ---------- Contact form ---------- */
function initForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach(input => {
      const field = input.closest('.field');
      const valid = input.checkValidity() && input.value.trim() !== '';
      field.classList.toggle('invalid', !valid);
      if (!valid) ok = false;
    });
    if (!ok) { form.querySelector('.invalid input, .invalid textarea')?.focus(); return; }
    form.querySelector('.form-success')?.classList.add('show');
    form.reset();
    form.querySelector('.form-success')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  form.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('input', () => input.closest('.field')?.classList.remove('invalid'));
  });
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  paintScenes();
  initHeader();
  initReveal();
  initCounters();
  initAccordion();
  initFilter();
  initForm();
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
});
