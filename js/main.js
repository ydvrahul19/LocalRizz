// ============================================================
// LOCALRIZZ - Shared JS
// ============================================================

// Mobile menu toggle
function toggleMob() {
  const m = document.getElementById('mob-menu');
  const btn = document.getElementById('mob-btn');
  const isOpen = m.style.display === 'flex';
  m.style.display = isOpen ? 'none' : 'flex';
  btn.textContent = isOpen ? '☰' : '✕';
}

// Navbar scroll shadow
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.style.boxShadow = window.scrollY > 20
    ? '0 2px 24px rgba(0,69,52,.12)'
    : '0 1px 4px rgba(0,0,0,.06)';
});

// Set active nav link based on current page
document.addEventListener('DOMContentLoaded', () => {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mob-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === page || (page === 'index.html' && href === 'index.html') || (page === '' && href === 'index.html'))) {
      a.classList.add('active');
    }
  });
});

// Animated counter
function animateCounter(el) {
  const end = parseInt(el.dataset.end);
  const suffix = el.dataset.suffix || '';
  const dur = 2000;
  let start;
  function step(now) {
    if (!start) start = now;
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * end) + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = end + suffix;
  }
  requestAnimationFrame(step);
}

// Intersection observer for counters + fade-up
document.addEventListener('DOMContentLoaded', () => {
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-end]').forEach(el => counterObs.observe(el));

  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        fadeObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    fadeObs.observe(el);
  });
});

// FAQ toggle
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Contact form submit
function submitForm() {
  const name = document.getElementById('f-name')?.value.trim();
  const phone = document.getElementById('f-phone')?.value.trim();
  const type = document.getElementById('f-type')?.value;
  if (!name || !phone || !type) { alert('Please fill in all required fields.'); return; }
  const btn = document.querySelector('.form-submit');
  btn.textContent = '⏳ Sending...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('form-body').style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  }, 1500);
}
