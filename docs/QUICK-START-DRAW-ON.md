# Quick Start: Draw-on Effect Real

## 🎯 Resumen de 30 segundos

1. **Archivo listo:** `/tmp/brandguide-test.svg` (293 KB)
2. **URL:** https://lottiefiles.com/svg-to-lottie
3. **Upload** → **Configure** (1.2s, Draw, ease-out) → **Download**
4. **Reemplazar:** `public/lottie/cD9WRxH0eP.json`
5. **Test:** `npm run dev` → scroll a iconos Lottie

---

## 📂 Rutas de Acceso Rápido

### Desde Windows (File Explorer)

```
Archivo de prueba:
\\wsl.localhost\Ubuntu\tmp\brandguide-test.svg

Destino (después de convertir):
\\wsl.localhost\Ubuntu\home\suario\projects\xprinta-pro\public\lottie\cD9WRxH0eP.json
```

### Desde WSL Terminal

```bash
# Ver archivo
ls -lh /tmp/brandguide-test.svg

# Reemplazar después de convertir
cp ~/Downloads/brandguide-lottie.json \
   /home/suario/projects/xprinta-pro/public/lottie/cD9WRxH0eP.json

# Probar
cd /home/suario/projects/xprinta-pro
npm run dev
```

---

## ⚙️ Settings en lottiefiles.com

```
Animation Type:  Draw (o Write)
Duration:        1.2 seconds
Loop:            false
Ease:            ease-out
```

---

## ✅ Checklist

- [ ] Abrir lottiefiles.com/svg-to-lottie
- [ ] Upload `/tmp/brandguide-test.svg`
- [ ] Configurar: 1.2s, Draw, ease-out
- [ ] Preview: ver draw-on effect
- [ ] Download JSON
- [ ] Copiar a `public/lottie/cD9WRxH0eP.json`
- [ ] `npm run dev`
- [ ] Scroll a sección iconos Lottie
- [ ] Ver primer icono con draw-on real

---

## 🎬 Qué Esperar

**ANTES (actual):**
```
[Fade in completo del SVG] → [Breathing loop]
```

**DESPUÉS (con draw-on):**
```
[Lines dibujan progresivamente] → [Formas aparecen] → [Breathing loop]
```

---

## 🚀 Si Funciona → Batch Conversion

```bash
# Preparar los 14 SVGs
cd /home/suario/projects/xprinta-pro
./scripts/prepare-svg-batch.sh

# Ubicación:
\\wsl.localhost\Ubuntu\tmp\xprinta-lottie-batch\

# Subir todos a lottiefiles.com
# Descargar todos los JSONs
# Reemplazar automáticamente:
./scripts/replace-lottie-json.sh ~/Downloads/lottie-converted
```

---

## 📝 Documentación Completa

Ver detalles en: `/docs/DRAW-ON-EFFECT-TEST.md`
