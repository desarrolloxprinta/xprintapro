# Patrón de Layout Asimétrico (Estilo Ignite)

Este documento detalla la estructura y metodología empleada para crear el layout del directorio de proyectos (`proyectos.html`), diseñado para replicarse en otras páginas (como Servicios).

## 1. Estructura HTML Dual

El diseño abandona la cuadrícula tradicional (`display: grid` con tarjetas iguales) en favor de un enfoque asimétrico de dos columnas:

```html
<section class="section_work">
  <div class="work-container">
    
    <!-- Barra de Filtros (Pegajosa / Sticky) -->
    <div class="filter-form-sticky">
      <!-- Filtros dinámicos -->
    </div>

    <div class="work_component">
      <!-- Lado Izquierdo: Menú de Navegación -->
      <div class="work_project-nav">
        <div class="work_project-nav_items">
          <!-- Títulos dinámicos anclados a IDs -->
        </div>
      </div>

      <!-- Lado Derecho: Visor de Contenido -->
      <div class="work_item_content-wrapper">
        <!-- Bloques gigantes de contenido -->
      </div>
    </div>

  </div>
</section>
```

## 2. Configuración CSS (Grid y Sticky)

El comportamiento clave se logra dividiendo el contenedor principal y usando `position: sticky`.

1. **Grid Asimétrico:**
   ```css
   .work_component {
     display: grid;
     grid-template-columns: 300px 1fr;
     gap: 4vw;
     align-items: start; /* Importante para que funcione el sticky interno */
   }
   ```
2. **Menú Izquierdo Sticky:**
   ```css
   .work_project-nav {
     position: sticky;
     top: 200px;
     max-height: calc(100vh - 220px);
     overflow-y: auto;
   }
   ```
3. **El Truco del "Telón Invisible":**
   Para evitar que el contenido de la derecha (al hacer scroll) pase por encima del menú o se vea por debajo de un header transparente, se usa un pseudo-elemento en el contenedor de filtros:
   ```css
   .filter-form-sticky::before {
     content: "";
     position: absolute;
     bottom: 100%;
     width: 100%;
     height: 200px; /* Cubre el hueco superior */
     background-color: var(--color-background);
   }
   ```

## 3. Lógica JavaScript (ScrollSpy y Filtros)

1. **Filtros Sincronizados:**
   Al pulsar un filtro, se usa GSAP para hacer un *fade-out* tanto en el título del menú izquierdo como en el contenido gigante del lado derecho. Esto mantiene ambos lados perfectamente sincronizados.
   Tras ocultar/mostrar elementos, es mandatorio llamar a `ScrollTrigger.refresh()` para que GSAP recalcule el alto de la página.

2. **ScrollSpy (Resalte Inteligente):**
   Se utiliza `ScrollTrigger` en modo evento de cruce (`onToggle`):
   ```javascript
   ScrollTrigger.create({
     trigger: content, // El contenedor de la imagen derecha
     start: "top 60%", // Cuando su parte superior cruza el 60% de la pantalla
     end: "bottom 60%", // Hasta que su base cruce el 60%
     onToggle: (self) => {
       if (self.isActive) {
         // Quitar clase activa a todos y asignarla al título correspondiente
         navItem.classList.add('is-active');
       }
     }
   });
   ```

## 4. Reproducción Automática (Hover)

Para añadir dinamismo al estilo "Ignite", el CSS esconde un `<video>` detrás de la imagen con `opacity: 0`. Al hacer hover, Javascript interviene usando `.play()` y CSS cambia la opacidad para un cross-fade muy suave.

## Replicabilidad

Para usar este patrón en "Servicios":
- Mantener las clases núcleo (`work_component`, `work_project-nav`, etc.) o crear equivalentes semánticos (`services_component`).
- Mantener el CSS de layout pero cambiar el contenido interno (el visor de la derecha puede contener tarjetas de servicios en lugar de renders gigantes).
