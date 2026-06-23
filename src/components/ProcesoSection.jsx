import React from 'react';
import LottieIcon from './LottieIcon';
import { iconosConfig } from '../animations/iconos-config';
import './ProcesoSection.css';

/**
 * Sección del proceso de fabricación con iconos animados
 * Los iconos se cargan y animan conforme se hace scroll
 */
const ProcesoSection = () => {
  return (
    <section className="proceso-section">
      <div className="proceso-section__container">
        {/* Header */}
        <div className="proceso-section__header">
          <h2 className="proceso-section__title">
            Nuestro Proceso
          </h2>
          <p className="proceso-section__subtitle">
            14 pasos para transformar tu identidad de marca en realidad física
          </p>
        </div>

        {/* Grid de iconos */}
        <div className="proceso-section__grid">
          {iconosConfig.map((icono, index) => (
            <LottieIcon
              key={icono.id}
              archivo={icono.archivo}
              nombre={icono.nombre}
              descripcion={icono.descripcion}
              delay={icono.delay * 1000} // Convertir a ms
              className="proceso-section__icon"
            />
          ))}
        </div>

        {/* Footer */}
        <div className="proceso-section__footer">
          <p className="proceso-section__footer-text">
            De la estrategia al resultado final, cada paso está diseñado para
            garantizar la máxima calidad y fidelidad a tu marca.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcesoSection;
