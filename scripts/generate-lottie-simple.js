/**
 * Generador simplificado de animaciones Lottie
 * Usa los SVGs originales con animaciones Lottie aplicadas al contenedor
 *
 * Para draw-on effects en paths SVG individuales, se requiere:
 * - Adobe After Effects + Bodymovin plugin, O
 * - Herramienta online como lottiefiles.com/svg-to-lottie
 *
 * Este script crea animaciones de entrada y breathing en el contenedor SVG completo
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONOS_DIR = path.join(__dirname, '../public/iconos');
const OUTPUT_DIR = path.join(__dirname, '../public/lottie');

const ANIMATION_CONFIG = {
  fps: 60,
  width: 512,
  height: 512,
  fadeInFrames: 24,           // 0.4s fade in
  drawDuration: 72,            // 1.2s para entrada completa
  breatheDuration: 180,        // 3s loop de breathing
  totalFrames: 252             // Total de frames
};

/**
 * Convierte SVG a data URL para embedear en Lottie
 */
function svgToDataUrl(svgContent) {
  const base64 = Buffer.from(svgContent).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Crea animación Lottie que usa el SVG como imagen
 */
function createLottieWithSvgAsset(svgPath, iconName) {
  const svgContent = fs.readFileSync(svgPath, 'utf-8');
  const dataUrl = svgToDataUrl(svgContent);

  return {
    v: '5.9.0',
    fr: ANIMATION_CONFIG.fps,
    ip: 0,
    op: ANIMATION_CONFIG.totalFrames,
    w: ANIMATION_CONFIG.width,
    h: ANIMATION_CONFIG.height,
    nm: iconName,
    ddd: 0,
    assets: [
      {
        id: 'svg_asset',
        w: ANIMATION_CONFIG.width,
        h: ANIMATION_CONFIG.height,
        u: '',
        p: dataUrl,
        e: 0
      }
    ],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 2, // Image layer
        nm: `${iconName} - SVG`,
        refId: 'svg_asset',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [0]
              },
              {
                t: ANIMATION_CONFIG.fadeInFrames,
                s: [100]
              }
            ]
          },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [256, 256, 0] },
          a: { a: 0, k: [256, 256, 0] },
          s: {
            a: 1,
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
        ip: 0,
        op: ANIMATION_CONFIG.totalFrames,
        st: 0,
        bm: 0
      }
    ]
  };
}

/**
 * Genera todas las animaciones
 */
function generateAllAnimations() {
  console.log('🎬 Generando animaciones Lottie con SVGs embebidos...\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const svgFiles = fs.readdirSync(ICONOS_DIR).filter(file => file.endsWith('.svg'));
  console.log(`📁 Encontrados ${svgFiles.length} archivos SVG\n`);

  svgFiles.forEach((file, index) => {
    const svgPath = path.join(ICONOS_DIR, file);
    const iconName = path.basename(file, '.svg');
    const outputPath = path.join(OUTPUT_DIR, `${iconName}.json`);

    console.log(`⚙️  [${index + 1}/${svgFiles.length}] Procesando: ${iconName}`);

    try {
      const animation = createLottieWithSvgAsset(svgPath, iconName);
      fs.writeFileSync(outputPath, JSON.stringify(animation, null, 2));

      const stats = fs.statSync(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`   ✅ Generado: ${sizeKB} KB\n`);
    } catch (error) {
      console.error(`   ❌ Error procesando ${iconName}:`, error.message, '\n');
    }
  });

  console.log('✨ ¡Animaciones Lottie generadas con éxito!');
  console.log(`📦 Archivos guardados en: ${OUTPUT_DIR}`);
  console.log('\n📝 NOTA: Para draw-on effects en paths SVG individuales,');
  console.log('   usar Adobe After Effects + Bodymovin o lottiefiles.com/svg-to-lottie');
}

generateAllAnimations();
