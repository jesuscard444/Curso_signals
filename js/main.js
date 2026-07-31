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

const dynamicStyle = document.createElement('style');
dynamicStyle.textContent = `
.visible {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.course-team {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  max-width: 620px;
  margin: 0 0 34px;
}

.course-person {
  position: relative;
  min-width: 0;
  padding: 18px 18px 17px 20px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.055);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(8px);
  overflow: hidden;
}

.course-person::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: var(--teal);
}

.course-role {
  display: block;
  margin-bottom: 7px;
  color: var(--teal);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.course-person strong,
.course-person small,
.course-person a {
  display: block;
}

.course-person strong {
  margin-bottom: 5px;
  color: #fff;
  font-size: 0.92rem;
  line-height: 1.35;
}

.course-person small {
  margin-bottom: 11px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.7rem;
  line-height: 1.45;
}

.course-person a {
  width: fit-content;
  color: rgba(255, 255, 255, 0.76);
  font-size: 0.74rem;
  font-weight: 600;
  transition: color 0.2s ease;
}

.course-person a::before {
  content: '✉';
  margin-right: 7px;
  color: var(--teal);
}

.course-person a:hover {
  color: var(--teal);
}

@media (max-width: 650px) {
  .course-team {
    grid-template-columns: 1fr;
    margin-bottom: 30px;
  }

  .course-person {
    padding: 16px 16px 15px 18px;
  }
}
`;
document.head.appendChild(dynamicStyle);