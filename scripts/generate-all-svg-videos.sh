#!/bin/bash

###############################################################################
# Genera HTMLs animados para todos los 14 iconos SVG
# Uso: ./generate-all-svg-videos.sh
###############################################################################

echo "🎬 Generando HTMLs animados para todos los iconos..."
echo ""

PROJECT_DIR="$(dirname "$0")/.."
ICONOS_DIR="$PROJECT_DIR/public/iconos"
OUTPUT_DIR="$PROJECT_DIR/public/videos"

# Crear directorio de salida
mkdir -p "$OUTPUT_DIR"

# Lista de los 14 iconos
declare -a iconos=(
  "cD9WRxH0eP.svg:01-brandguide"
  "IaW8dActvE.svg:02-brandcenter"
  "43x4NXx9Aa.svg:03-auditoria-tecnica"
  "EqeE4pmuuO.svg:04-optimizacion-costes"
  "e82esLDdqL.svg:05-estudio-normativo"
  "poZpUwKehw.svg:06-toma-datos"
  "IaWI2ILtvE.svg:07-pic-presupuesto"
  "rlarmNbxtc.svg:08-aceptacion-cliente"
  "NZLNl276D9.svg:09-fabricacion"
  "8vY8DmgIrU.svg:10-instalacion"
  "tfctd0SmZJ.svg:11-trabajo-terminado"
  "EqeEaaAuuO.svg:12-comunicacion-digital"
  "jSCjxqsLD0.svg:13-reportaje-audiovisual"
  "Pix99VX42C.svg:14-contenidos-rrss"
)

# Generar HTML para cada icono
count=0
for icono_entry in "${iconos[@]}"; do
  IFS=':' read -r svg_file nombre_descriptivo <<< "$icono_entry"
  svg_path="$ICONOS_DIR/$svg_file"

  if [ ! -f "$svg_path" ]; then
    echo "❌ No encontrado: $svg_file"
    continue
  fi

  # Leer contenido SVG
  svg_content=$(cat "$svg_path")

  # Nombre de salida (sin extensión)
  output_base="${svg_file%.svg}"
  output_html="$OUTPUT_DIR/$output_base.html"

  # Generar HTML con animación
  cat > "$output_html" << 'HTMLEOF'
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
      width: 400px;
      height: 400px;
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
      animation: draw-on 1200ms ease-out forwards;
      fill: transparent !important;
      animation-fill-mode: forwards;
    }

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
      animation: draw-on 1200ms ease-out forwards,
                 fill-in 240ms ease-in forwards 960ms;
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
HTMLEOF

  # Insertar SVG
  echo "$svg_content" >> "$output_html"

  # Cerrar HTML
  cat >> "$output_html" << 'HTMLEOF'
  </div>

  <script>
    setTimeout(() => {
      document.body.classList.add('animation-complete');
    }, 1300);
  </script>
</body>
</html>
HTMLEOF

  size=$(du -h "$output_html" | cut -f1)
  echo "✅ $nombre_descriptivo.html ($size)"
  ((count++))
done

echo ""
echo "📊 Total: $count archivos HTML generados"
echo ""
echo "📁 Ubicación: $OUTPUT_DIR"
echo ""
echo "🖥️  Acceso desde Windows:"
echo "   \\\\wsl.localhost\\Ubuntu\\home\\suario\\projects\\xprinta-pro\\public\\videos\\"
echo ""
echo "🎥 Siguiente paso:"
echo "   1. Abre cada HTML en tu navegador"
echo "   2. Graba 1.5 segundos con ShareX/OBS/ScreenToGif"
echo "   3. Guarda cada video con el mismo nombre (cambiar .html → .mp4)"
echo ""
echo "💡 Tips:"
echo "   - Usa ShareX para grabación rápida (Win + PrtScr)"
echo "   - Configura 60 FPS y alta calidad"
echo "   - Resolución: 400x400 o 800x800"
echo ""
echo "📝 Ver guía completa:"
echo "   cat docs/VIDEO-ANIMATION-GUIDE.md"
