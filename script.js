// Sticky nav appears once the hero nav bar scrolls out of view
const heroBar = document.querySelector('.hero-bar');
const stickyNav = document.getElementById('sticky-nav');
const heroObserver = new IntersectionObserver(([entry]) => {
  stickyNav.classList.toggle('visible', !entry.isIntersecting);
}, { threshold: 0 });
heroObserver.observe(heroBar);

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal, .about-label, .about-headline .word, .about-body p, .about-body .cta-wrap');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
revealEls.forEach((el, i) => {
  if (el.classList.contains('word')) el.style.transitionDelay = `${i * 0.07}s`;
  revealObserver.observe(el);
});

// Drag-to-scroll gallery
const track = document.getElementById('gallery-track');
let isDown = false, startX, scrollLeft;
track.addEventListener('mousedown', e => {
  isDown = true;
  track.style.cursor = 'grabbing';
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
});
document.addEventListener('mouseup', () => {
  isDown = false;
  track.style.cursor = 'grab';
});
track.addEventListener('mousemove', e => {
  if (!isDown) return;
  e.preventDefault();
  track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX) * 1.4;
});

// AJAX form submission — no redirect
const form = document.getElementById('contact-form');
const btn = document.getElementById('form-btn');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
      btn.style.display = 'none';
      successMsg.style.display = 'block';
    } else {
      btn.textContent = 'Send message';
      btn.disabled = false;
      alert('Something went wrong — please try again or contact us directly.');
    }
  } catch {
    btn.textContent = 'Send message';
    btn.disabled = false;
    alert('Something went wrong — please check your connection and try again.');
  }
});