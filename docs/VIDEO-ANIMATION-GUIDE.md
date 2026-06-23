# Guía: Generación de Videos Animados desde SVG

## 🎯 Objetivo
Crear videos cortos (1.2s) con efecto draw-on desde los 14 iconos SVG, para usar en lugar de Lottie.

---

## ✅ Estado Actual

**HTML Animado Generado:**
```
/home/suario/projects/xprinta-pro/public/videos/cD9WRxH0eP.html
```

**Acceso desde Windows:**
```
\\wsl.localhost\Ubuntu\home\suario\projects\xprinta-pro\public\videos\cD9WRxH0eP.html
```

---

## 🎬 Paso 1: Ver la Animación

### Opción A: Abrir desde Windows
1. Abre File Explorer
2. Navega a: `\\wsl.localhost\Ubuntu\home\suario\projects\xprinta-pro\public\videos\`
3. Haz doble clic en `cD9WRxH0eP.html`
4. Se abrirá en tu navegador predeterminado

### Opción B: Abrir desde WSL
```bash
# Convertir path de WSL a Windows
wslpath -w /home/suario/projects/xprinta-pro/public/videos/cD9WRxH0eP.html

# O directamente:
explorer.exe /home/suario/projects/xprinta-pro/public/videos/cD9WRxH0eP.html
```

### Qué Esperar:
- **Duración:** 1.2 segundos
- **Efecto:** Los paths se "dibujan" progresivamente (stroke-dashoffset)
- **Fill:** Aparece al final (fade-in)
- **Loop:** La animación se repite automáticamente

---

## 🎥 Paso 2: Grabar como Video

### Método 1: ShareX (Recomendado para Windows)

**Instalación:**
```
winget install ShareX.ShareX
```

**Uso:**
1. Abre ShareX
2. Capture → Screen recording (video)
3. Selecciona el área del navegador con el SVG (400x400px)
4. Graba durante 1.5 segundos
5. Detén la grabación
6. ShareX te dará el archivo MP4

**Configuración óptima:**
- FPS: 60
- Quality: High
- Format: MP4 (H.264)
- Resolution: 400x400 o 800x800 (para mayor calidad)

### Método 2: OBS Studio

**Instalación:**
```
winget install OBSProject.OBSStudio
```

**Uso:**
1. Abre OBS
2. Sources → Add → Window Capture (navegador)
3. Settings → Output:
   - Format: MP4
   - Encoder: x264
   - Rate Control: CRF
   - CRF: 18 (alta calidad)
4. Graba 1.5 segundos
5. Stop recording
6. Video guardado en `Videos` folder

### Método 3: ScreenToGif

**Instalación:**
```
winget install NickeManarin.ScreenToGif
```

**Uso:**
1. Abre ScreenToGif
2. Recorder → Screen
3. Selecciona área 400x400px
4. Record (1.5 segundos)
5. Stop
6. File → Save as → MP4

---

## 📁 Paso 3: Guardar el Video

**Ubicación destino:**
```
/home/suario/projects/xprinta-pro/public/videos/cD9WRxH0eP.mp4
```

**Desde Windows:**
```
\\wsl.localhost\Ubuntu\home\suario\projects\xprinta-pro\public\videos\cD9WRxH0eP.mp4
```

**Renombrar y mover:**
1. Graba el video con tu herramienta favorita
2. Renómbralo a: `cD9WRxH0eP.mp4`
3. Muévelo a la carpeta `videos` (arrastra y suelta desde File Explorer)

---

## 🔄 Paso 4: Generar los 14 Videos

Una vez que hayas probado con Brandguide y te guste el resultado:

```bash
cd /home/suario/projects/xprinta-pro
./scripts/generate-all-svg-videos.sh
```

Esto generará 14 archivos HTML en `public/videos/`:
- `01-brandguide.html`
- `02-brandcenter.html`
- ... (14 total)

Luego graba cada uno y guarda como MP4 con el mismo nombre.

---

## 🎨 Personalización de la Animación

Si quieres ajustar la animación, edita `/home/suario/projects/xprinta-pro/scripts/generate-svg-video.js`:

### Duración
```javascript
const CONFIG = {
  duration: 1200, // Cambiar a 1500 para 1.5s, etc.
  ...
};
```

### Tamaño del Canvas
```javascript
const CONFIG = {
  width: 400,  // Cambiar a 800 para mayor resolución
  height: 400,
  ...
};
```

### Velocidad de la Animación
```css
/* En generateAnimatedHTML(), línea ~45 */
animation: draw-on 1200ms ease-out forwards;
/*                  ↑
                    Cambiar duración aquí también
*/
```

### Tipo de Easing
```css
/* ease-out (actual) - Empieza rápido, termina suave
   ease-in - Empieza suave, termina rápido
   ease-in-out - Suave al inicio y final
   linear - Velocidad constante */

animation: draw-on 1200ms linear forwards;
```

---

## 🚀 Integración en el Proyecto

Una vez tengas los 14 videos MP4:

### Actualizar `/src/proceso-lottie.js`

Cambiar de Lottie a video:

```javascript
// ANTES (Lottie)
<div class="lottie-icon-animation"></div>

// DESPUÉS (Video)
<video
  class="icon-video"
  src="/videos/${icono.archivo.replace('.svg', '.mp4')}"
  muted
  playsinline
  data-icono-id="${icono.id}"
></video>
```

### Control con IntersectionObserver

```javascript
const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    const video = entry.target.querySelector('video');

    if (entry.isIntersecting) {
      setTimeout(() => {
        video.currentTime = 0; // Reset
        video.play();
      }, parseInt(entry.target.dataset.delay || '0'));
    } else {
      video.pause();
    }
  });
};
```

---

## 📊 Comparación: Video vs Lottie

| Aspecto | Video MP4 | Lottie JSON |
|---------|-----------|-------------|
| **Tamaño** | ~50-200 KB/icono | ~100-400 KB/icono |
| **Calidad** | Alta (depende de bitrate) | Vector (escalable) |
| **Compatibilidad** | 100% navegadores | ~95% (necesita lottie-web) |
| **Performance** | Nativa (GPU acelerada) | JavaScript (CPU) |
| **Edición** | Difícil (re-generar) | Fácil (editar JSON) |
| **Control** | Play/Pause/CurrentTime | Play/Pause/GoToFrame |

**Recomendación:** Video es mejor para tu caso porque:
- ✅ Animación única de entrada (no necesitas editar)
- ✅ Mejor compatibilidad
- ✅ Mejor performance (GPU accelerated)
- ✅ Más simple de integrar

---

## 🐛 Troubleshooting

### El HTML no muestra nada
- Abre DevTools (F12)
- Console: busca errores
- Verifica que el SVG tenga contenido (no está vacío)

### La animación es muy rápida/lenta
- Ajusta `CONFIG.duration` en `generate-svg-video.js`
- Regenera el HTML: `node scripts/generate-svg-video.js`

### El video pesa mucho
- Reduce el bitrate en OBS/ShareX
- Usa formato WebM en lugar de MP4 (más eficiente)
- Reduce la resolución (400x400 es suficiente)

### Los colores no se ven bien
- El SVG puede tener gradientes complejos
- Verifica que tu herramienta de grabación use alta calidad
- Prueba grabar con OBS en CRF 18 o menor

---

## 📝 Checklist

- [ ] Abrir `cD9WRxH0eP.html` en navegador
- [ ] Verificar que la animación se vea bien
- [ ] Instalar herramienta de grabación (ShareX/OBS/ScreenToGif)
- [ ] Grabar video de 1.5 segundos
- [ ] Guardar como `cD9WRxH0eP.mp4`
- [ ] Mover a `/public/videos/`
- [ ] Si te gusta, generar los 14 videos
- [ ] Actualizar `proceso-lottie.js` para usar `<video>` en lugar de Lottie
- [ ] Probar en `npm run dev`

---

## 🎯 Siguiente Paso

**AHORA:**
1. Abre el HTML en tu navegador
2. Verifica que la animación te guste
3. Graba el video con ShareX/OBS
4. Avísame cuando esté listo para integrar

**Si te gusta el resultado, haré:**
- Script para generar todos los 14 HTMLs
- Actualización de `proceso-lottie.js` para usar videos
- Integración completa con scroll triggers
