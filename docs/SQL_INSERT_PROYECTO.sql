-- ============================================================================
-- SCRIPT SQL PARA INSERTAR NUEVO PROYECTO EN SUPABASE
-- ============================================================================
--
-- INSTRUCCIONES:
-- 1. Copiar este script
-- 2. Reemplazar todos los valores entre [CORCHETES]
-- 3. Ejecutar en Supabase SQL Editor o vía CLI
--
-- COMANDO CLI:
-- supabase db query --linked "$(cat este-archivo.sql)"
--
-- ============================================================================

INSERT INTO projects (
  -- CAMPOS OBLIGATORIOS
  slug,                     -- Único, lowercase, sin espacios
  title,                    -- Título completo
  category,                 -- Categoría para filtros
  sector,                   -- Sector industrial
  short_description,        -- Descripción breve (meta description)
  client_name,              -- Nombre del cliente
  client_description,       -- Descripción del cliente
  service_title,            -- Servicio prestado

  -- CAMPOS OPCIONALES
  service_logo,             -- Ruta al logo del servicio
  hero_video,               -- Ruta al video del hero (NULL si solo imagen)
  hero_image,               -- Ruta a la imagen del hero (NULL si solo video)

  -- METADATA
  created_at                -- Fecha de creación (timestamp)
) VALUES (
  -- CAMPOS OBLIGATORIOS
  '[slug-del-proyecto]',                                                     -- slug
  '[Título Completo del Proyecto - Descripción Breve]',                     -- title
  '[Sector / Tipo]',                                                         -- category
  '[Sector Industrial]',                                                     -- sector
  '[Descripción breve de 1-2 líneas que aparecerá en las cards del home]',  -- short_description
  '[Nombre del Cliente]',                                                    -- client_name
  '[Descripción del cliente: historia, sector, tamaño, etc.]',               -- client_description
  '[Nombre del Servicio Prestado]',                                         -- service_title

  -- CAMPOS OPCIONALES (usar NULL si no aplica)
  '/proyectos/[slug-del-proyecto]/logo-cliente.webp',                       -- service_logo
  NULL,                                                                       -- hero_video (o ruta si hay video)
  '/proyectos/[slug-del-proyecto]/hero-image.jpg',                          -- hero_image (o NULL si solo video)

  -- METADATA
  '2024-06-23'                                                               -- created_at (formato: YYYY-MM-DD)
);

-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================
-- Ejecutar después de insertar para verificar:
SELECT * FROM projects WHERE slug = '[slug-del-proyecto]';

-- ============================================================================
-- EJEMPLO REAL (Proyecto Arval)
-- ============================================================================
/*
INSERT INTO projects (
  slug,
  title,
  category,
  sector,
  short_description,
  client_name,
  client_description,
  service_title,
  service_logo,
  hero_video,
  hero_image,
  created_at
) VALUES (
  'arval',
  'Proyecto de instalación del rótulo de coronación para Arval',
  'Movilidad / Corporativo',
  'Movilidad / Corporativo',
  'Instalación de rótulo corpóreo iluminado de gran formato en fachada principal.',
  'Arval',
  'Líder europeo en renting y gestión de flotas con más de 30 años de experiencia.',
  'Señalética Corporativa Premium',
  '/proyectos/arval/logo-arval.jpg',
  '/proyectos/arval/arval-rotulo-animado.mp4',
  '/proyectos/arval/20230304-ARVAL-ROTULO-CORONACION (36).jpeg',
  '2024-06-20'
);
*/

-- ============================================================================
-- NOTAS IMPORTANTES
-- ============================================================================
-- 1. El campo 'slug' debe coincidir EXACTAMENTE con:
--    - El nombre del archivo JSON: src/data/projects/[slug].json
--    - El nombre del archivo JS: src/pages/proyectos/[slug].js
--    - La ruta en main.js: pageType === 'proyecto-[slug]'
--
-- 2. Solo incluir hero_video O hero_image (o ambos si es necesario)
--    Pero al menos UNO debe estar presente (no NULL ambos)
--
-- 3. Las rutas de imágenes deben apuntar a archivos existentes en:
--    /home/suario/projects/xprinta-pro/public/proyectos/[slug]/
--
-- 4. La fecha created_at determina el orden en la sección de proyectos
--    (más recientes primero)
--
-- 5. Los campos category y sector pueden ser iguales o diferentes según
--    la necesidad de filtrado
--
-- ============================================================================
