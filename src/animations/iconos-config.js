/**
 * Configuración de iconos del proceso de fabricación
 * Mapeo de archivos SVG con sus pasos correspondientes
 */

export const iconosConfig = [
  {
    id: 1,
    nombre: 'Brandguide',
    descripcion: 'Análisis de identidad corporativa',
    archivo: 'cD9WRxH0eP.svg',
    duracion: 1.2,
    delay: 0
  },
  {
    id: 2,
    nombre: 'Brandcenter',
    descripcion: 'Plataforma centralizada de documentos',
    archivo: 'IaW8dActvE.svg',
    duracion: 1.2,
    delay: 0.15
  },
  {
    id: 3,
    nombre: 'Auditoría Técnica',
    descripcion: 'Evaluación de viabilidad',
    archivo: '43x4NXx9Aa.svg',
    duracion: 1.2,
    delay: 0.30
  },
  {
    id: 4,
    nombre: 'Optimización de Costes',
    descripcion: 'Ingeniería de valor',
    archivo: 'EqeE4pmuuO.svg',
    duracion: 1.2,
    delay: 0.45
  },
  {
    id: 5,
    nombre: 'Estudio Normativo',
    descripcion: 'Permisos municipales',
    archivo: 'e82esLDdqL.svg',
    duracion: 1.2,
    delay: 0.60
  },
  {
    id: 6,
    nombre: 'Toma de Datos',
    descripcion: 'Mediciones milimétricas',
    archivo: 'poZpUwKehw.svg',
    duracion: 1.2,
    delay: 0.75
  },
  {
    id: 7,
    nombre: 'PIC y Presupuesto',
    descripcion: 'Calendario y valoración',
    archivo: 'IaWI2ILtvE.svg',
    duracion: 1.2,
    delay: 0.90
  },
  {
    id: 8,
    nombre: 'Aceptación del Cliente',
    descripcion: 'Firma y validación',
    archivo: 'rlarmNbxtc.svg',
    duracion: 1.2,
    delay: 1.05
  },
  {
    id: 9,
    nombre: 'Fabricación',
    descripcion: 'Producción ISO',
    archivo: 'NZLNl276D9.svg',
    duracion: 1.2,
    delay: 1.20
  },
  {
    id: 10,
    nombre: 'Instalación',
    descripcion: 'Montaje especializado',
    archivo: '8vY8DmgIrU.svg',
    duracion: 1.2,
    delay: 1.35
  },
  {
    id: 11,
    nombre: 'Trabajo Terminado',
    descripcion: 'QA final llave en mano',
    archivo: 'tfctd0SmZJ.svg',
    duracion: 1.2,
    delay: 1.50
  },
  {
    id: 12,
    nombre: 'Comunicación Digital',
    descripcion: 'Estrategia de lanzamiento online',
    archivo: 'EqeEaaAuuO.svg',
    duracion: 1.2,
    delay: 1.65
  },
  {
    id: 13,
    nombre: 'Reportaje Audiovisual',
    descripcion: 'Fotografía arquitectónica + video',
    archivo: 'jSCjxqsLD0.svg',
    duracion: 1.2,
    delay: 1.80
  },
  {
    id: 14,
    nombre: 'Contenidos en RRSS',
    descripcion: 'Amplificación LinkedIn/Instagram/TikTok',
    archivo: 'Pix99VX42C.svg',
    duracion: 1.2,
    delay: 1.95
  }
];

/**
 * Configuración de animaciones
 */
export const animationConfig = {
  // Draw-on effect
  drawOn: {
    duration: 1.2,
    ease: 'power2.inOut',
    stagger: 0.02 // Stagger entre paths del mismo icono
  },

  // Loop sutil (respiración)
  breathe: {
    duration: 3,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    scale: {
      from: 1,
      to: 1.02
    },
    opacity: {
      from: 1,
      to: 0.85
    }
  },

  // Scroll trigger
  scroll: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    markers: false // Cambiar a true para debugging
  }
};
