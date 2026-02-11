const menuToggle = document.querySelector('.menu-toggle');
const mainMenu = document.querySelector('#main-menu');
const year = document.querySelector('#year');
const modal = document.querySelector('#reel-modal');
const reelFrame = document.querySelector('#reel-frame');
const reelLink = document.querySelector('#reel-link');
const modalTitle = document.querySelector('#modal-title');

const trackEvent = (eventName) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName });
};

menuToggle?.addEventListener('click', () => {
  const isOpen = mainMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mainMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => mainMenu.classList.remove('open'));
});

year.textContent = String(new Date().getFullYear());

const toEmbedUrl = (url) => {
  const clean = url.endsWith('/') ? url : `${url}/`;
  return `${clean}embed`;
};

document.querySelectorAll('[data-event]').forEach((element) => {
  element.addEventListener('click', () => {
    const eventName = element.getAttribute('data-event');
    if (eventName) trackEvent(eventName);
  });
});

document.querySelectorAll('.turma-card').forEach((card) => {
  const turma = card.getAttribute('data-turma');
  const link = card.getAttribute('data-link');
  const button = card.querySelector('.reel-btn');

  button?.addEventListener('click', () => {
    trackEvent('open_turma_modal');
    trackEvent(`click_assistir_reels_turma_${turma}`);

    reelFrame.src = toEmbedUrl(link);
    reelLink.href = link;
    modalTitle.textContent = `Turma ${turma} — Assistir Reels`;
    modal.showModal();
  });
});

document.querySelector('.close-modal')?.addEventListener('click', () => {
  modal.close();
  reelFrame.src = '';
});

modal?.addEventListener('click', (event) => {
  const box = modal.getBoundingClientRect();
  const isOutside =
    event.clientX < box.left ||
    event.clientX > box.right ||
    event.clientY < box.top ||
    event.clientY > box.bottom;

  if (isOutside) {
    modal.close();
    reelFrame.src = '';
  }
});
