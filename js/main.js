const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
    });
  });
}

const signalLine = document.querySelector('.signal-line');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (signalLine && !prefersReducedMotion) {
  signalLine.addEventListener('animationend', () => {
    window.setTimeout(() => {
      signalLine.style.animation = 'none';
      void signalLine.getBoundingClientRect();
      signalLine.style.animation = '';
    }, 350);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.lab-card, .learning-grid article, .resource-list a').forEach((element) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(18px)';
  element.style.transition += ', opacity .55s ease, transform .55s ease';
  observer.observe(element);
});

const revealStyle = document.createElement('style');
revealStyle.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(revealStyle);