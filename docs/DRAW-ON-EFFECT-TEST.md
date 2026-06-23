# Test de Draw-on Effect Real - Paso a Paso

## 🎯 Objetivo
Probar el draw-on effect real en paths individuales usando lottiefiles.com con el icono **Brandguide** (paso 1).

---

## 📁 Archivo de Prueba Preparado

He copiado el SVG a una ubicación fácil de acceder:

```bash
/tmp/brandguide-test.svg
```

**También disponible en:**
```bash
/home/suario/projects/xprinta-pro/public/iconos/cD9WRxH0eP.svg
```

**Tamaño:** 293 KB
**Tipo:** SVG con gradientes lineales complejos (perfecto para la prueba)

---

## 🚀 Paso a Paso

### 1. Abrir lottiefiles.com/svg-to-lottie

Ve a: **https://lottiefiles.com/svg-to-lottie**

### 2. Subir el SVG

**Opción A - Desde WSL (recomendado):**
```bash
# El archivo está en /tmp/brandguide-test.svg
# Puedes accederlo desde Windows en:
\\wsl.localhost\Ubuntu\tmp\brandguide-test.svg
```

**Opción B - Desde el proyecto:**
```bash
\\wsl.localhost\Ubuntu\home\suario\projects\xprinta-pro\public\iconos\cD9WRxH0eP.svg
```

**Pasos:**
1. Click en "Upload SVG" o arrastra el archivo
2. Espera a que procese (puede tardar 10-30 segundos)

### 3. Configurar Animación

En la interfaz de lottiefiles.com:

**Settings recomendados:**
- **Animation Type:** `Draw` o `Write` (para draw-on effect)
- **Duration:** `1.2 seconds` (72 frames @ 60fps)
- **Loop:** `false` (solo entrada, luego lo configuramos para loop)
- **Ease:** `ease-out` o `ease-in-out`

**Preview:**
- Deberías ver el icono dibujándose progresivamente
- Los paths aparecen secuencialmente siguiendo los strokes

### 4. Descargar JSON

1. Click en **"Download"** o **"Export"**
2. Guarda como: `brandguide-lottie-real.json`

### 5. Reemplazar en el Proyecto

Una vez descargado, reemplaza el JSON actual:

**Opción A - Manual (drag & drop):**
```bash
# Copiar desde tu carpeta de Descargas a:
\\wsl.localhost\Ubuntu\home\suario\projects\xprinta-pro\public\lottie\cD9WRxH0eP.json
```

**Opción B - Terminal:**
```bash
cd /home/suario/projects/xprinta-pro
cp ~/Downloads/brandguide-lottie-real.json public/lottie/cD9WRxH0eP.json
```

### 6. Probar en el Navegador

```bash
cd /home/suario/projects/xprinta-pro
npm run dev
```

Luego:
1. Abre `http://localhost:5173`
2. Scroll down hasta la sección de iconos Lottie
3. **El primer icono (Brandguide)** debería tener el draw-on effect real

---

## ✅ Qué Esperar

### Antes (JSON actual)
- Fade-in del SVG completo
- No hay draw-on en paths individuales
- Solo breathing loop

### Después (JSON de lottiefiles.com)
- **Draw-on real:** Los paths se dibujan progresivamente
- Cada línea/forma aparece siguiendo su stroke
- Efecto de "escritura" o "dibujo a mano"
- Mucho más dinámico y profesional

---

## 🔍 Verificación

### Comparar Tamaños
```bash
# JSON actual (SVG embebido)
ls -lh public/lottie/cD9WRxH0eP.json
# ~390 KB (con SVG como base64)

# JSON nuevo (draw-on con shapes)
# Debería ser ~100-150 KB (más eficiente)
```

### Ver en DevTools
1. Abre DevTools → Network
2. Busca `cD9WRxH0eP.json`
3. Preview tab: verás estructura Lottie con `shapes` y `tm` (trim paths)

### Animación Frame por Frame
En el navegador:
1. Abre DevTools → Performance
2. Record mientras scrolleas a la sección
3. Deberías ver frames progresivos dibujando los paths

---

## 🎨 Ejemplo de Estructura Lottie con Draw-on

El JSON convertido debería tener algo como esto:

```json
{
  "layers": [
    {
      "ty": 4,  // Shape layer
      "shapes": [
        {
          "ty": "gr",  // Group
          "it": [
            {
              "ty": "sh",  // Shape path
              "ks": { "a": 0, "k": { ... } }
            },
            {
              "ty": "tm",  // TRIM PATHS (draw-on effect)
              "s": {
                "a": 1,
                "k": [
                  { "t": 0, "s": [0] },     // Start: 0% drawn
                  { "t": 72, "s": [100] }   // End: 100% drawn
                ]
              }
            }
          ]
        }
      ]
    }
  ]
}
```

**La clave es `"ty": "tm"` (Trim Paths)** → esto hace el draw-on real.

---

## ⚠️ Posibles Problemas

### Problema 1: "SVG too complex"
**Solución:** El SVG es grande (293KB) con muchos gradientes. Si falla:
1. Simplificar el SVG primero (reducir paths)
2. O probar con otro icono más simple

### Problema 2: "Animation doesn't look good"
**Ajustes:**
- Cambiar duración (más lento = más dramático)
- Cambiar ease (linear, ease-in-out, etc.)
- Cambiar orden de draw (si lottiefiles permite)

### Problema 3: "File size too large"
**Solución:**
- Optimizar JSON con lottiefiles.com optimizer
- O usar Adobe After Effects para más control

---

## 📊 Decisión Final

Después de probar:

### ✅ Si te gusta el resultado
→ Convertir los 14 iconos restantes con lottiefiles.com

### ❌ Si no te convence
→ Volver a la Opción B (CSS directo con stroke-dasharray)

---

## 🚀 Siguiente Paso (si funciona)

Script para batch conversion de los 14 iconos:

```bash
# Crear carpeta temporal con todos los SVGs
mkdir /tmp/xprinta-svg-batch
cp public/iconos/*.svg /tmp/xprinta-svg-batch/

# Accesible desde Windows:
# \\wsl.localhost\Ubuntu\tmp\xprinta-svg-batch\
```

Luego subirlos todos a lottiefiles.com en batch.

---

**Estado:** Esperando que pruebes con Brandguide (primer icono)
**Tiempo estimado:** 5-10 minutos
**Fecha:** 2026-06-22
