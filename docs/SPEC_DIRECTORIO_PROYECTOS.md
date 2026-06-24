# SPEC: Directorio de Proyectos - Xprinta Pro

**Fecha:** 2026-06-24
**Objetivo:** Crear página de índice de proyectos con filtrado, grid responsive y animaciones basadas en principios de Ignite Agency pero con el sistema de diseño Xprinta.

---

## 🎯 Principios de Diseño Observados (Ignite Agency)

**Inspiración extraída (NO código):**
- Grid responsive de 12 columnas adaptativo
- Sistema de filtrado por categorías/sectores
- Cards con hover effects (escala, rotación sutil)
- Animaciones GSAP con ScrollTrigger (fade-in, stagger)
- Tipografía fluida y escalable
- Cursor personalizado (ya implementado en Xprinta)
- Navegación suave entre lista y detalle

---

## 📐 Layout y Estructura

### Hero Section
```
┌────────────────────────────────────────────┐
│  PROYECTOS                                 │
│  Nuestro portfolio de éxitos en retail     │
│                                            │
│  [Todos] [Retail] [Industrial] [Logística]│
└────────────────────────────────────────────┘
```

**Especificaciones:**
- **Altura:** min-height: 50vh
- **Background:** var(--color-secondary) #F5F5F5
- **Título:** font-family: var(--font-heading), font-size: clamp(3rem, 5vw, 6rem)
- **Subtítulo:** font-family: var(--font-body), font-size: 1.5rem, color: var(--color-text-muted)
- **Filtros:** Pills horizontales con borde, hover con background naranja

### Grid de Proyectos

**Layout Responsivo:**
```
Desktop (>1024px):  3 columnas
Tablet (768-1023):  2 columnas
Mobile (<767px):    1 columna
```

**Grid Properties:**
- `display: grid`
- `grid-template-columns: repeat(auto-fit, minmax(350px, 1fr))`
- `gap: 4vw` (responsive)
- `padding: 8rem 5vw`

---

## 🎴 Card de Proyecto

### Estructura HTML
```html
<article class="project-card" data-sector="retail">
  <div class="project-card__image-wrapper">
    <img src="..." alt="..." class="project-card__image" />
    <div class="project-card__overlay">
      <span class="project-card__cta">Ver Proyecto →</span>
    </div>
  </div>
  <div class="project-card__content">
    <span class="project-card__category">Retail</span>
    <h3 class="project-card__title">Campaña Redeia</h3>
    <p class="project-card__description">Rebranding nacional...</p>
  </div>
</article>
```

### Estilos del Card

**Estado Normal:**
- Border-radius: var(--border-radius-lg) (20px)
- Background: var(--color-neutral-0) #FFFFFF
- Box-shadow: 0 10px 40px rgba(0,0,0,0.05)
- Transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1)

**Estado Hover:**
- Transform: translateY(-10px) scale(1.02)
- Box-shadow: 0 20px 60px rgba(0,0,0,0.1)
- Image: scale(1.05) (parallax interno)
- Overlay: opacity 1 (muestra CTA)

**Imagen:**
- Aspect-ratio: 16/10
- Object-fit: cover
- Filter: brightness(0.95) (sutil oscurecimiento)

**Overlay:**
- Background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)
- Opacity: 0 (normal) → 1 (hover)
- Align-items: flex-end
- Padding: 2rem

**CTA Button:**
- Color: var(--color-highlight) #FA8029
- Font-size: 1.1rem
- Font-weight: 600
- Transform: translateY(20px) (normal) → translateY(0) (hover)

---

## 🎬 Animaciones GSAP

### 1. Scroll Reveal (Cards)
```javascript
gsap.from('.project-card', {
  scrollTrigger: {
    trigger: '.projects-grid',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.15,
  ease: 'power3.out'
})
```

### 2. Filter Transition
```javascript
// Al cambiar filtro:
gsap.to('.project-card.hidden', {
  opacity: 0,
  scale: 0.8,
  duration: 0.3,
  onComplete: () => { card.style.display = 'none' }
})

gsap.from('.project-card.visible', {
  opacity: 0,
  y: 40,
  duration: 0.5,
  stagger: 0.1,
  ease: 'power2.out'
})
```

### 3. Image Parallax (Hover)
```javascript
card.addEventListener('mouseenter', () => {
  gsap.to(card.querySelector('.project-card__image'), {
    scale: 1.05,
    duration: 0.6,
    ease: 'power2.out'
  })
})
```

---

## 🎨 Sistema de Colores Xprinta

**Aplicación en el directorio:**
- Background página: `var(--color-secondary)` #F5F5F5
- Cards: `var(--color-neutral-0)` #FFFFFF
- Filtro activo: `background: var(--color-primary)` #FA8029, `color: #FFFFFF`
- Filtro inactivo: `border: 2px solid var(--color-neutral-300)`, `color: var(--color-neutral-700)`
- Category badge: `background: var(--color-success)` #34B257, `color: #FFFFFF`
- Hover overlay: `rgba(0, 0, 0, 0.7)`

---

## 📱 Responsive Breakpoints

```css
/* Mobile first */
.projects-grid {
  grid-template-columns: 1fr;
  gap: 3rem;
  padding: 4rem 5vw;
}

/* Tablet */
@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 3vw;
    padding: 6rem 5vw;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 4vw;
    padding: 8rem 5vw;
  }
}
```

---

## 🔌 Integración con Supabase

### Query para Proyectos
```javascript
const { data: projects, error } = await supabase
  .from('projects')
  .select('slug, title, sector, short_description, hero_image, category')
  .order('created_at', { ascending: false })

// Estructura esperada:
// {
//   slug: 'redeia',
//   title: 'Campaña Redeia',
//   sector: 'Infraestructuras',
//   short_description: 'Rebranding nacional...',
//   hero_image: '/proyectos/redeia/hero.jpg',
//   category: 'retail' | 'industrial' | 'logistica'
// }
```

### Filtrado Dinámico
```javascript
const filterProjects = (sector) => {
  const cards = document.querySelectorAll('.project-card')

  cards.forEach(card => {
    const cardSector = card.dataset.sector

    if (sector === 'all' || cardSector === sector) {
      card.classList.remove('hidden')
      card.classList.add('visible')
    } else {
      card.classList.add('hidden')
      card.classList.remove('visible')
    }
  })

  // Trigger GSAP re-animation
  animateVisibleCards()
}
```

---

## 🗂️ Estructura de Archivos

```
src/
├── pages/
│   └── proyectos.js              # Página principal del directorio
├── styles/
│   └── proyectos.css             # Estilos específicos del directorio
├── data/
│   └── sectores.json             # Lista de sectores para filtros
└── lib/
    └── supabase.js               # Query helper para proyectos
```

---

## ✅ Checklist de Implementación

**Estructura:**
- [ ] Crear `src/pages/proyectos.js`
- [ ] Crear `src/styles/proyectos.css`
- [ ] Registrar ruta `/proyectos` en `main.js`

**Contenido:**
- [ ] Hero section con título y filtros
- [ ] Grid responsive de cards
- [ ] Card component con imagen + contenido
- [ ] Overlay con CTA en hover

**Funcionalidad:**
- [ ] Query a Supabase para obtener proyectos
- [ ] Sistema de filtrado por sector
- [ ] Link de cada card a `/proyecto/[slug]`

**Animaciones:**
- [ ] Scroll reveal con stagger en cards
- [ ] Hover effects (escala, imagen parallax)
- [ ] Transición smooth al filtrar

**Responsive:**
- [ ] Mobile: 1 columna
- [ ] Tablet: 2 columnas
- [ ] Desktop: 3 columnas

**Testing:**
- [ ] Verificar carga desde Supabase
- [ ] Probar filtrado en todos los sectores
- [ ] Validar animaciones en scroll
- [ ] Testear hover en todos los navegadores

---

## 🎯 Resultado Esperado

Una página de directorio de proyectos que:
- Carga dinámicamente desde Supabase
- Permite filtrar por sector con animaciones suaves
- Muestra cards con hover effects premium
- Es 100% responsive
- Sigue el sistema de diseño Xprinta
- Se inspira en la calidad de Ignite Agency pero con código original

**URL:** `https://new.xprintapro.com/proyectos`
