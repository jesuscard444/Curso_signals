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

if (signalLine) {
  // Se controla la animación desde JavaScript para garantizar que se repita
  // continuamente, independientemente de la animación CSS inicial.
  signalLine.style.animation = 'none';
  signalLine.style.strokeDasharray = '1000';
  signalLine.style.strokeDashoffset = '1000';

  signalLine.animate(
    [
      { strokeDashoffset: 1000, opacity: 0.25 },
      { strokeDashoffset: 0, opacity: 1, offset: 0.68 },
      { strokeDashoffset: 0, opacity: 1, offset: 0.86 },
      { strokeDashoffset: 1000, opacity: 0.25 }
    ],
    {
      duration: 4400,
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