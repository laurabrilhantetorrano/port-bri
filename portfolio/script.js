/**
 * PORTFÓLIO: LAURA BRILHANTE TORRANO
 * Interatividade & Animações em JavaScript Puro
 * Inspiração: Igloo.inc (cursor & microinterações) + Cagdas Cecen (clock & status)
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initLiveClock();
  initThemeToggle();
  initMagneticButton();
  initInteractiveTitle();
});

function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (!cursor || !dot || !ring) return;

  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    cursor.style.display = 'none';
    return;
  }

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  const interactiveElements = document.querySelectorAll('a, button, .hero-word, .gothic-accent-tag');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
  });

  window.addEventListener('mousedown', () => cursor.classList.add('is-clicking'));
  window.addEventListener('mouseup', () => cursor.classList.remove('is-clicking'));
}

function initLiveClock() {
  const clockEl = document.getElementById('liveClock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}:${seconds} BRT`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const themeLabel = document.getElementById('themeLabel');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('lbt-theme') || 'brand';
  if (savedTheme === 'dark') {
    htmlRoot.setAttribute('data-theme', 'dark');
    if (themeLabel) themeLabel.textContent = 'Modo Vibrante';
  } else {
    htmlRoot.setAttribute('data-theme', 'brand');
    if (themeLabel) themeLabel.textContent = 'Modo Escuro';
  }

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'brand' : 'dark';

    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('lbt-theme', newTheme);

    if (themeLabel) {
      themeLabel.textContent = newTheme === 'dark' ? 'Modo Vibrante' : 'Modo Escuro';
    }
  });
}

function initMagneticButton() {
  const primaryBtn = document.getElementById('heroCtaBtn');
  if (!primaryBtn) return;

  primaryBtn.addEventListener('mousemove', (e) => {
    const rect = primaryBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    primaryBtn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  });

  primaryBtn.addEventListener('mouseleave', () => {
    primaryBtn.style.transform = 'translate(0px, 0px)';
  });
}

function initInteractiveTitle() {
  const words = document.querySelectorAll('.hero-word');
  words.forEach(word => {
    word.addEventListener('mouseenter', () => {
      word.style.letterSpacing = '-0.02em';
    });
    word.addEventListener('mouseleave', () => {
      word.style.letterSpacing = '';
    });
  });
}
