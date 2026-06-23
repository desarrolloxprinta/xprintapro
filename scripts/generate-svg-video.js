#!/usr/bin/env node

/**
 * Genera videos cortos con efecto draw-on desde SVGs
 * Usa Puppeteer para renderizar animación CSS y ffmpeg para capturar
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');

// Configuración
const CONFIG = {
  duration: 1200, // 1.2 segundos
  fps: 60,
  width: 400,
  height: 400,
  outputDir: join(PROJECT_ROOT, 'public/videos')
};

/**
 * Genera HTML con SVG animado
 */
function generateAnimatedHTML(svgContent, duration) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      width: ${CONFIG.width}px;
      height: ${CONFIG.height}px;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    #svg-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    svg {
      width: 80%;
      height: 80%;
    }

    /* Draw-on effect para todos los paths */
    svg path,
    svg line,
    svg polyline,
    svg polygon,
    svg circle,
    svg ellipse,
    svg rect {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: draw-on ${duration}ms ease-out forwards;
      fill: transparent !important; /* Primero solo stroke */
      animation-fill-mode: forwards;
    }

    /* Animación de dibujo */
    @keyframes draw-on {
      0% {
        stroke-dashoffset: 1000;
        opacity: 0;
      }
      5% {
        opacity: 1;
      }
      100% {
        stroke-dashoffset: 0;
        opacity: 1;
      }
    }

    /* Fill aparece al final */
    svg path {
      animation: draw-on ${duration}ms ease-out forwards,
                 fill-in ${duration * 0.2}ms ease-in forwards ${duration * 0.8}ms;
    }

    @keyframes fill-in {
      from {
        fill-opacity: 0;
      }
      to {
        fill-opacity: 1;
      }
    }
  </style>
</head>
<body>
  <div id="svg-container">
    ${svgContent}
  </div>

  <script>
    // Marcar cuando la animación está completa
    setTimeout(() => {
      document.body.classList.add('animation-complete');
    }, ${duration + 100});
  </script>
</body>
</html>
  `.trim();
}

/**
 * Genera video usando Puppeteer (si está disponible)
 */
async function generateVideoWithPuppeteer(htmlPath, outputPath) {
  try {
    // Intentar importar puppeteer
    const puppeteer = await import('puppeteer').catch(() => null);

    if (!puppeteer) {
      console.log('⚠️  Puppeteer no está instalado.');
      console.log('📝 Instalación:');
      console.log('   npm install puppeteer');
      console.log('');
      console.log('💡 Mientras tanto, puedes:');
      console.log(`   1. Abrir: file://${htmlPath}`);
      console.log('   2. Grabar con OBS/ShareX/ScreenToGif');
      console.log('   3. Guardar como: ' + outputPath);
      return false;
    }

    // TODO: Implementar captura con Puppeteer
    console.log('🎬 Generación automática de video disponible (próximamente)');
    return false;

  } catch (error) {
    console.error('Error:', error.message);
    return false;
  }
}

/**
 * Procesa un SVG y genera video
 */
async function processSVG(svgPath, outputName) {
  console.log(`\n🎨 Procesando: ${svgPath}`);

  // Leer SVG
  const svgContent = readFileSync(svgPath, 'utf-8');

  // Generar HTML animado
  const html = generateAnimatedHTML(svgContent, CONFIG.duration);

  // Crear directorio de salida
  if (!existsSync(CONFIG.outputDir)) {
    mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  // Guardar HTML temporal para preview
  const htmlPath = join(CONFIG.outputDir, `${outputName}.html`);
  writeFileSync(htmlPath, html);
  console.log(`✅ HTML generado: ${htmlPath}`);

  // Intentar generar video automáticamente
  const videoPath = join(CONFIG.outputDir, `${outputName}.mp4`);
  const generated = await generateVideoWithPuppeteer(htmlPath, videoPath);

  if (!generated) {
    console.log('');
    console.log('📋 Método manual:');
    console.log(`   1. Abre: file://${htmlPath}`);
    console.log('   2. Graba 1.5 segundos con tu herramienta favorita');
    console.log(`   3. Guarda como: ${videoPath}`);
    console.log('');
    console.log('🎥 Herramientas recomendadas:');
    console.log('   - Windows: ShareX, OBS Studio, ScreenToGif');
    console.log('   - macOS: QuickTime, ScreenFlow');
    console.log('   - Linux: SimpleScreenRecorder, Peek');
  }

  return htmlPath;
}

// Script principal
async function main() {
  console.log('🎬 Generador de Videos SVG Animados');
  console.log('='.repeat(50));

  // Procesar Brandguide (primer icono de prueba)
  const svgPath = '/tmp/brandguide-test.svg';
  const outputName = 'cD9WRxH0eP'; // Nombre original del archivo

  await processSVG(svgPath, outputName);

  console.log('');
  console.log('✨ Proceso completado');
  console.log('');
  console.log('📁 Ubicación de archivos:');
  console.log(`   ${CONFIG.outputDir}`);
  console.log('');
  console.log('🔄 Para generar todos los 14 videos:');
  console.log('   ./scripts/generate-all-svg-videos.sh');
}

main().catch(console.error);
