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

const laboratories = [
  {
    title: 'Clasificación de señales',
    description: 'Explora señales continuas, discretas, analógicas y digitales mediante controles y gráficas interactivas.',
    tags: ['Señales', 'Clasificación'],
    file: 'clasificación de señales parte 1.html'
  },
  {
    title: 'Ciclo de instrumentación',
    description: 'Recorre las etapas de adquisición, acondicionamiento, digitalización y procesamiento de señales.',
    tags: ['Instrumentación', 'Adquisición'],
    file: 'ciclo de instrumentación.html'
  },
  {
    title: 'Modulación AM',
    description: 'Analiza la generación, transmisión, espectro y recuperación de señales moduladas en amplitud.',
    tags: ['AM', 'Comunicaciones'],
    file: 'laboratorio_am_v28_matriz_tiempo_frecuencia (1).html'
  },
  {
    title: 'Muestreo uniforme',
    description: 'Experimenta con el teorema de muestreo, sobremuestreo, submuestreo y aliasing.',
    tags: ['Muestreo', 'Aliasing'],
    file: 'laboratorio_de_muestreo (1).html'
  },
  {
    title: 'Multiplexación FDM',
    description: 'Combina señales en diferentes bandas de frecuencia y observa su separación en el receptor.',
    tags: ['FDM', 'Espectro'],
    file: 'laboratorio_virtual_fdm_mejorado_v18_bw_dirac.html'
  },
  {
    title: 'Análisis de imágenes 2D',
    description: 'Aplica ruido, filtrado, procesamiento espacial y herramientas de análisis sobre imágenes.',
    tags: ['Imágenes', 'Filtrado'],
    file: 'laboratorio_virtual_de_an_lisis_de_im_genes_2d (1).html'
  },
  {
    title: 'Notas musicales y Fourier',
    description: 'Relaciona notas, timbres, armónicos y espectros mediante síntesis y reproducción de audio.',
    tags: ['Audio', 'Fourier'],
    file: 'laboratorio_virtual_de_notas_musicales.html'
  },
  {
    title: 'Potencia en corriente alterna',
    description: 'Visualiza tensión, corriente, potencia instantánea y componentes activa, reactiva y aparente.',
    tags: ['Potencia C.A.', 'Fase'],
    file: 'laboratorio_virtual_de_potencia_c_a.html'
  }
];

const labGrid = document.querySelector('.lab-grid');
const labSectionText = document.querySelector('#laboratorios .section-heading p');
const moduleCount = document.querySelector('.hero-stats div:first-child strong');

if (labGrid) {
  labGrid.innerHTML = laboratories.map((lab, index) => `
    <article class="lab-card${index === 0 ? ' featured' : ''}">
      <div class="lab-number">${String(index + 1).padStart(2, '0')}</div>
      <span class="tag available">Disponible</span>
      <h3>${lab.title}</h3>
      <p>${lab.description}</p>
      <div class="lab-meta">${lab.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
      <a class="lab-access" href="${encodeURI(lab.file)}" target="_blank" rel="noopener">
        Abrir laboratorio <span>↗</span>
      </a>
    </article>
  `).join('');
}

if (labSectionText) {
  labSectionText.textContent = 'Selecciona un laboratorio y ábrelo directamente desde el navegador.';
}

if (moduleCount) {
  moduleCount.textContent = String(laboratories.length);
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

.lab-card > a.lab-access {
  opacity: 1;
  pointer-events: auto;
  color: var(--teal-dark);
  transition: color .2s ease;
}

.lab-card.featured > a.lab-access {
  color: var(--teal);
}

.lab-card > a.lab-access:hover {
  color: var(--ink);
}

.lab-card.featured > a.lab-access:hover {
  color: #fff;
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