import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animationConfig } from './iconos-config';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook personalizado para animar iconos SVG con draw-on effect y loop sutil
 *
 * @param {number} delay - Delay para entrada secuencial (segundos)
 * @param {boolean} enableBreathing - Activar animación de respiración (default: true)
 * @returns {React.RefObject} - Ref para el contenedor del SVG
 */
export const useIconAnimation = (delay = 0, enableBreathing = true) => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const svg = containerRef.current.querySelector('svg');
    if (!svg) return;

    // Obtener todos los paths del SVG
    const paths = svg.querySelectorAll('path, line, polyline, polygon, circle, ellipse, rect');

    if (paths.length === 0) return;

    // Configurar strokeDasharray y strokeDashoffset para draw-on effect
    paths.forEach(path => {
      const length = path.getTotalLength ? path.getTotalLength() : 100;
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;

      // Asegurar que el stroke sea visible
      if (!path.getAttribute('stroke') || path.getAttribute('stroke') === 'none') {
        const fill = path.getAttribute('fill');
        if (fill && fill !== 'none') {
          path.setAttribute('stroke', fill);
          path.setAttribute('stroke-width', '1');
        }
      }
    });

    // Timeline principal de animación
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: animationConfig.scroll.start,
        end: animationConfig.scroll.end,
        toggleActions: animationConfig.scroll.toggleActions,
        markers: animationConfig.scroll.markers
      }
    });

    // 1. Fade in del contenedor
    tl.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      delay: delay,
      ease: 'power2.out'
    });

    // 2. Draw-on effect en los paths
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: animationConfig.drawOn.duration,
      stagger: animationConfig.drawOn.stagger,
      ease: animationConfig.drawOn.ease
    }, '-=0.2'); // Overlap con fade in

    // 3. Fade in del fill después del stroke
    tl.to(paths, {
      fillOpacity: 1,
      duration: 0.3,
      stagger: animationConfig.drawOn.stagger,
      ease: 'power1.inOut'
    }, '-=0.6');

    timelineRef.current = tl;

    // Animación de respiración sutil (loop)
    if (enableBreathing) {
      // Esperar a que termine la animación de entrada
      setTimeout(() => {
        gsap.to(svg, {
          scale: animationConfig.breathe.scale.to,
          opacity: animationConfig.breathe.opacity.to,
          duration: animationConfig.breathe.duration,
          ease: animationConfig.breathe.ease,
          repeat: animationConfig.breathe.repeat,
          yoyo: animationConfig.breathe.yoyo,
          transformOrigin: 'center center'
        });

        // Animación sutil de elementos naranjas (acento)
        const orangeElements = svg.querySelectorAll('[fill*="#F18108"], [fill*="#FA8029"], [fill*="#ff5a00"]');
        if (orangeElements.length > 0) {
          gsap.to(orangeElements, {
            opacity: 0.7,
            duration: animationConfig.breathe.duration,
            ease: animationConfig.breathe.ease,
            repeat: animationConfig.breathe.repeat,
            yoyo: animationConfig.breathe.yoyo,
            stagger: 0.1
          });
        }
      }, (delay + animationConfig.drawOn.duration + 0.3) * 1000);
    }

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [delay, enableBreathing]);

  return containerRef;
};
