#!/bin/bash

###############################################################################
# Reemplaza los JSONs Lottie con las versiones convertidas desde lottiefiles.com
# Uso: ./replace-lottie-json.sh [carpeta-con-jsons-descargados]
###############################################################################

DOWNLOADS_DIR="$1"

if [ -z "$DOWNLOADS_DIR" ]; then
  echo "❌ Error: Debes especificar la carpeta con los JSONs descargados"
  echo ""
  echo "Uso:"
  echo "  ./replace-lottie-json.sh ~/Downloads/lottie-converted"
  echo ""
  echo "O arrastra los archivos a la carpeta:"
  echo "  /tmp/xprinta-lottie-converted"
  echo ""
  echo "Y luego ejecuta:"
  echo "  ./replace-lottie-json.sh /tmp/xprinta-lottie-converted"
  exit 1
fi

if [ ! -d "$DOWNLOADS_DIR" ]; then
  echo "❌ Error: La carpeta no existe: $DOWNLOADS_DIR"
  exit 1
fi

echo "🔄 Reemplazando JSONs Lottie..."
echo ""

PROJECT_DIR="$(dirname "$0")/.."
LOTTIE_DIR="$PROJECT_DIR/public/lottie"

# Mapeo de nombres descriptivos a nombres originales
declare -A json_map=(
  ["01-brandguide.json"]="cD9WRxH0eP.json"
  ["02-brandcenter.json"]="IaW8dActvE.json"
  ["03-auditoria-tecnica.json"]="43x4NXx9Aa.json"
  ["04-optimizacion-costes.json"]="EqeE4pmuuO.json"
  ["05-estudio-normativo.json"]="e82esLDdqL.json"
  ["06-toma-datos.json"]="poZpUwKehw.json"
  ["07-pic-presupuesto.json"]="IaWI2ILtvE.json"
  ["08-aceptacion-cliente.json"]="rlarmNbxtc.json"
  ["09-fabricacion.json"]="NZLNl276D9.json"
  ["10-instalacion.json"]="8vY8DmgIrU.json"
  ["11-trabajo-terminado.json"]="tfctd0SmZJ.json"
  ["12-comunicacion-digital.json"]="EqeEaaAuuO.json"
  ["13-reportaje-audiovisual.json"]="jSCjxqsLD0.json"
  ["14-contenidos-rrss.json"]="Pix99VX42C.json"
)

# Backup de los JSONs actuales
BACKUP_DIR="$PROJECT_DIR/public/lottie-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r "$LOTTIE_DIR"/*.json "$BACKUP_DIR"/ 2>/dev/null
echo "📦 Backup creado en: $BACKUP_DIR"
echo ""

# Reemplazar cada archivo
count=0
for descriptivo in "${!json_map[@]}"; do
  original="${json_map[$descriptivo]}"
  source_file="$DOWNLOADS_DIR/$descriptivo"
  target_file="$LOTTIE_DIR/$original"

  if [ -f "$source_file" ]; then
    # Obtener tamaños
    old_size=$(du -h "$target_file" 2>/dev/null | cut -f1)
    new_size=$(du -h "$source_file" | cut -f1)

    # Copiar
    cp "$source_file" "$target_file"
    echo "✅ $original"
    echo "   Antes: $old_size → Después: $new_size"
    ((count++))
  else
    echo "⚠️  No encontrado: $descriptivo"
  fi
done

echo ""
echo "📊 Total: $count archivos reemplazados"
echo ""
echo "🧪 Siguiente paso:"
echo "   cd /home/suario/projects/xprinta-pro"
echo "   npm run dev"
echo ""
echo "💡 Tip: Si algo sale mal, restaura desde:"
echo "   $BACKUP_DIR"
