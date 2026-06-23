import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import './LottieIcon.css';

/**
 * Componente de icono Lottie con lazy loading inteligente
 * Solo carga y reproduce la animación cuando está visible en viewport
 *
 * @param {Object} props
 * @param {string} props.archivo - Nombre del archivo SVG original
 * @param {string} props.nombre - Nombre del paso
 * @param {string} props.descripcion - Descripción del paso
 * @param {number} props.delay - Delay para entrada secuencial (ms)
 * @param {string} props.className - Clase CSS adicional
 */
const LottieIcon = ({
  archivo,
  nombre,
  descripcion,
  delay = 0,
  className = ''
}) => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }

          // Pausar animación cuando sale del viewport
          if (!entry.isIntersecting && animationRef.current) {
            animationRef.current.pause();
          } else if (entry.isIntersecting && animationRef.current && isLoaded) {
            animationRef.current.play();
          }
        });
      },
      {
        root: null,
        rootMargin: '100px', // Precargar 100px antes de entrar
        threshold: 0.1
      }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isVisible, isLoaded]);

  // Cargar animación JSON cuando sea visible
  useEffect(() => {
    if (!isVisible || isLoaded) return;

    const lottieFileName = archivo.replace('.svg', '.json');

    fetch(`/lottie/${lottieFileName}`)
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
        setIsLoaded(true);
      })
      .catch(error => {
        console.error(`Error cargando animación ${lottieFileName}:`, error);
      });
  }, [isVisible, archivo, isLoaded]);

  // Inicializar animación Lottie
  useEffect(() => {
    if (!animationData || !containerRef.current) return;

    const animContainer = containerRef.current.querySelector('.lottie-icon__animation');
    if (!animContainer) return;

    // Aplicar delay
    const timer = setTimeout(() => {
      animationRef.current = lottie.loadAnimation({
        container: animContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          progressiveLoad: true, // Carga progresiva
          hideOnTransparent: true,
          preserveAspectRatio: 'xMidYMid meet'
        }
      });

      // Event listeners
      animationRef.current.addEventListener('DOMLoaded', () => {
        console.log(`✨ Animación ${nombre} cargada`);
      });

      animationRef.current.addEventListener('complete', () => {
        // Reiniciar después del draw-on, mantener loop de breathing
        animationRef.current.goToAndPlay(72, true); // Frame donde empieza breathing loop
      });
    }, delay);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, [animationData, delay, nombre]);

  return (
    <div
      ref={containerRef}
      className={`lottie-icon ${className}`}
      data-nombre={nombre}
    >
      <div className="lottie-icon__animation" />

      {!isLoaded && (
        <div className="lottie-icon__placeholder">
          <div className="lottie-icon__spinner" />
        </div>
      )}

      <div className="lottie-icon__text">
        <h3 className="lottie-icon__nombre">{nombre}</h3>
        <p className="lottie-icon__descripcion">{descripcion}</p>
      </div>
    </div>
  );
};

export default LottieIcon;
