// Nav background solidifies after scrolling past the hero
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu toggle
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');
toggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});
menu.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ---------------------------------------------------------
// Film cards: hover preview (desktop only) + click-to-play lightbox
// ---------------------------------------------------------
const canHover = window.matchMedia('(hover: hover)').matches;

function buildPreviewSrc(id) {
  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`;
}
function buildLightboxSrc(id) {
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
}

const lightbox = document.getElementById('lightbox');
const lightboxFrame = document.getElementById('lightboxFrame');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(id) {
  lightboxFrame.src = buildLightboxSrc(id);
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightboxFrame.src = '';
  document.body.style.overflow = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
});

document.querySelectorAll('.reel__media').forEach((media) => {
  const id = media.dataset.videoId;

  if (canHover) {
    media.addEventListener('mouseenter', () => {
      if (media.querySelector('.reel__preview-frame')) return;
      const iframe = document.createElement('iframe');
      iframe.className = 'reel__preview-frame';
      iframe.src = buildPreviewSrc(id);
      iframe.setAttribute('allow', 'autoplay; encrypted-media');
      iframe.setAttribute('tabindex', '-1');
      media.appendChild(iframe);
      media.classList.add('is-previewing');
    });
    media.addEventListener('mouseleave', () => {
      const iframe = media.querySelector('.reel__preview-frame');
      if (iframe) iframe.remove();
      media.classList.remove('is-previewing');
    });
  }

  media.addEventListener('click', () => openLightbox(id));
  media.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(id);
    }
  });
});
