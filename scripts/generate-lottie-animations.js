/**
 * Script para generar animaciones Lottie desde SVGs
 * Crea animaciones con draw-on effect y breathing loop
 *
 * Uso: node scripts/generate-lottie-animations.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONOS_DIR = path.join(__dirname, '../public/iconos');
const OUTPUT_DIR = path.join(__dirname, '../public/lottie');

// Configuración de animación
const ANIMATION_CONFIG = {
  fps: 60,
  width: 512,
  height: 512,
  drawDuration: 72, // 1.2s a 60fps
  breatheDuration: 180, // 3s a 60fps
  totalFrames: 252 // draw (72) + breathe loop (180)
};

/**
 * Crea una animación Lottie básica desde un SVG
 */
function createLottieAnimation(svgPath, iconName) {
  const svgContent = fs.readFileSync(svgPath, 'utf-8');

  // Template base de animación Lottie
  const lottieAnimation = {
    v: '5.9.0', // Versión de Lottie
    fr: ANIMATION_CONFIG.fps,
    ip: 0,
    op: ANIMATION_CONFIG.totalFrames,
    w: ANIMATION_CONFIG.width,
    h: ANIMATION_CONFIG.height,
    nm: iconName,
    ddd: 0,
    assets: [],
    layers: []
  };

  // Capa principal con el SVG
  const mainLayer = {
    ddd: 0,
    ind: 1,
    ty: 4, // Shape layer
    nm: `${iconName} - Main`,
    sr: 1,
    ks: {
      o: {
        a: 1, // Animated
        k: [
          {
            i: { x: [0.667], y: [1] },
            o: { x: [0.333], y: [0] },
            t: 0,
            s: [0]
          },
          {
            t: 24, // Fade in
            s: [100]
          }
        ]
      },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [256, 256, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: {
        a: 1, // Breathing animation
        k: [
          {
            i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
            o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
            t: ANIMATION_CONFIG.drawDuration,
            s: [100, 100, 100]
          },
          {
            i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
            o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
            t: ANIMATION_CONFIG.drawDuration + ANIMATION_CONFIG.breatheDuration / 2,
            s: [102, 102, 100]
          },
          {
            t: ANIMATION_CONFIG.totalFrames,
            s: [100, 100, 100]
          }
        ]
      }
    },
    ao: 0,
    shapes: [
      {
        ty: 'gr',
        it: [
          {
            ind: 0,
            ty: 'sh',
            nm: 'SVG Path',
            ks: {
              a: 0,
              k: {
                i: [],
                o: [],
                v: [],
                c: true
              }
            }
          },
          {
            ty: 'st', // Stroke para draw-on effect
            c: { a: 0, k: [0.04, 0.04, 0.04, 1] }, // #0A0A0A
            o: { a: 0, k: 100 },
            w: { a: 0, k: 2 },
            lc: 2,
            lj: 2,
            bm: 0,
            nm: 'Stroke'
          },
          {
            ty: 'fl', // Fill
            c: { a: 0, k: [0.04, 0.04, 0.04, 1] },
            o: {
              a: 1,
              k: [
                {
                  i: { x: [0.667], y: [1] },
                  o: { x: [0.333], y: [0] },
                  t: ANIMATION_CONFIG.drawDuration - 24,
                  s: [0]
                },
                {
                  t: ANIMATION_CONFIG.drawDuration,
                  s: [100]
                }
              ]
            },
            r: 1,
            bm: 0,
            nm: 'Fill'
          },
          {
            ty: 'tr',
            p: { a: 0, k: [0, 0] },
            a: { a: 0, k: [0, 0] },
            s: { a: 0, k: [100, 100] },
            r: { a: 0, k: 0 },
            o: { a: 0, k: 100 },
            sk: { a: 0, k: 0 },
            sa: { a: 0, k: 0 },
            nm: 'Transform'
          }
        ],
        nm: `${iconName} Group`,
        bm: 0
      },
      {
        ty: 'tm', // Trim paths para draw-on effect
        s: {
          a: 1,
          k: [
            {
              i: { x: [0.667], y: [1] },
              o: { x: [0.333], y: [0] },
              t: 0,
              s: [0]
            },
            {
              t: ANIMATION_CONFIG.drawDuration,
              s: [100]
            }
          ]
        },
        e: { a: 0, k: 100 },
        o: { a: 0, k: 0 },
        m: 1,
        nm: 'Trim Paths'
      }
    ],
    ip: 0,
    op: ANIMATION_CONFIG.totalFrames,
    st: 0,
    bm: 0
  };

  lottieAnimation.layers.push(mainLayer);

  return lottieAnimation;
}

/**
 * Genera todas las animaciones Lottie
 */
function generateAllAnimations() {
  console.log('🎬 Generando animaciones Lottie...\n');

  // Crear directorio de salida si no existe
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Leer todos los SVGs
  const svgFiles = fs.readdirSync(ICONOS_DIR).filter(file => file.endsWith('.svg'));

  console.log(`📁 Encontrados ${svgFiles.length} archivos SVG\n`);

  svgFiles.forEach((file, index) => {
    const svgPath = path.join(ICONOS_DIR, file);
    const iconName = path.basename(file, '.svg');
    const outputPath = path.join(OUTPUT_DIR, `${iconName}.json`);

    console.log(`⚙️  [${index + 1}/${svgFiles.length}] Procesando: ${iconName}`);

    try {
      const animation = createLottieAnimation(svgPath, iconName);
      fs.writeFileSync(outputPath, JSON.stringify(animation, null, 2));
      console.log(`   ✅ Generado: ${outputPath}\n`);
    } catch (error) {
      console.error(`   ❌ Error procesando ${iconName}:`, error.message, '\n');
    }
  });

  console.log('✨ ¡Animaciones Lottie generadas con éxito!');
  console.log(`📦 Archivos guardados en: ${OUTPUT_DIR}`);
}

// Ejecutar
generateAllAnimations();
