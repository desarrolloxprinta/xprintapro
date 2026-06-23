#!/bin/bash

###############################################################################
# Prepara todos los SVGs para conversión batch a Lottie
# Crea una carpeta temporal con nombres descriptivos
###############################################################################

echo "📦 Preparando SVGs para conversión a Lottie..."
echo ""

# Crear carpeta temporal
BATCH_DIR="/tmp/xprinta-lottie-batch"
rm -rf "$BATCH_DIR"
mkdir -p "$BATCH_DIR"

# Mapeo de archivos a nombres descriptivos
declare -A iconos_map=(
  ["cD9WRxH0eP.svg"]="01-brandguide.svg"
  ["IaW8dActvE.svg"]="02-brandcenter.svg"
  ["43x4NXx9Aa.svg"]="03-auditoria-tecnica.svg"
  ["EqeE4pmuuO.svg"]="04-optimizacion-costes.svg"
  ["e82esLDdqL.svg"]="05-estudio-normativo.svg"
  ["poZpUwKehw.svg"]="06-toma-datos.svg"
  ["IaWI2ILtvE.svg"]="07-pic-presupuesto.svg"
  ["rlarmNbxtc.svg"]="08-aceptacion-cliente.svg"
  ["NZLNl276D9.svg"]="09-fabricacion.svg"
  ["8vY8DmgIrU.svg"]="10-instalacion.svg"
  ["tfctd0SmZJ.svg"]="11-trabajo-terminado.svg"
  ["EqeEaaAuuO.svg"]="12-comunicacion-digital.svg"
  ["jSCjxqsLD0.svg"]="13-reportaje-audiovisual.svg"
  ["Pix99VX42C.svg"]="14-contenidos-rrss.svg"
)

# Copiar con nombres descriptivos
cd "$(dirname "$0")/../public/iconos"

count=0
for original in "${!iconos_map[@]}"; do
  descriptivo="${iconos_map[$original]}"
  if [ -f "$original" ]; then
    cp "$original" "$BATCH_DIR/$descriptivo"
    size=$(du -h "$original" | cut -f1)
    echo "✅ $descriptivo ($size)"
    ((count++))
  else
    echo "❌ No encontrado: $original"
  fi
done

echo ""
echo "📊 Total: $count archivos preparados"
echo ""
echo "📂 Ubicación: $BATCH_DIR"
echo ""
echo "🖥️  Acceso desde Windows:"
echo "   \\\\wsl.localhost\\Ubuntu\\tmp\\xprinta-lottie-batch\\"
echo ""
echo "🌐 Siguiente paso:"
echo "   1. Abre: https://lottiefiles.com/svg-to-lottie"
echo "   2. Sube todos los SVGs (drag & drop)"
echo "   3. Configura: Duration 1.2s, Type: Draw, Ease: ease-out"
echo "   4. Descarga todos los JSONs"
echo ""
echo "💡 Tip: Puedes subir múltiples archivos a la vez"
