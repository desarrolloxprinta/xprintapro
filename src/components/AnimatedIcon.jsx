import React, { useState, useEffect } from 'react';
import { useIconAnimation } from '../animations/useIconAnimation';
import './AnimatedIcon.css';

/**
 * Componente de icono animado con draw-on effect y breathing loop
 *
 * @param {Object} props
 * @param {string} props.archivo - Nombre del archivo SVG
 * @param {string} props.nombre - Nombre del paso
 * @param {string} props.descripcion - Descripción del paso
 * @param {number} props.delay - Delay para entrada secuencial
 * @param {boolean} props.enableBreathing - Activar animación de respiración
 * @param {string} props.className - Clase CSS adicional
 */
const AnimatedIcon = ({
  archivo,
  nombre,
  descripcion,
  delay = 0,
  enableBreathing = true,
  className = ''
}) => {
  const [svgContent, setSvgContent] = useState('');
  const containerRef = useIconAnimation(delay, enableBreathing);

  useEffect(() => {
    // Cargar el SVG
    fetch(`/iconos/${archivo}`)
      .then(response => response.text())
      .then(svg => {
        // Limpiar el SVG y añadir clases para animación
        let cleanedSvg = svg;

        // Asegurar que los paths tengan fillOpacity inicial en 0
        cleanedSvg = cleanedSvg.replace(
          /<path/g,
          '<path style="fill-opacity: 0;"'
        );

        setSvgContent(cleanedSvg);
      })
      .catch(error => {
        console.error(`Error cargando icono ${archivo}:`, error);
      });
  }, [archivo]);

  return (
    <div
      ref={containerRef}
      className={`animated-icon ${className}`}
      data-nombre={nombre}
    >
      <div
        className="animated-icon__svg"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      <div className="animated-icon__text">
        <h3 className="animated-icon__nombre">{nombre}</h3>
        <p className="animated-icon__descripcion">{descripcion}</p>
      </div>
    </div>
  );
};

export default AnimatedIcon;
