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
  signalLine.style.animation = 'none';
  signalLine.style.strokeDasharray = '1000';

  signalLine.animate(
    [
      { strokeDashoffset: 1000 },
      { strokeDashoffset: 0, offset: 0.72 },
      { strokeDashoffset: 0, offset: 0.88 },
      { strokeDashoffset: 1000 }
    ],
    {
      duration: 4300,
      iterations: Infinity,
      easing: 'ease-in-out'
    }
  );
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