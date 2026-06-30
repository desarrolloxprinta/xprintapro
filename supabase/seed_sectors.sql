-- ==========================================================================
-- SEED DATA: Sectors y Vinculación de Proyectos (Industria)
-- ==========================================================================

-- 1. Insertar Sector Industria
INSERT INTO sectors (slug, title, hero_title, intro, hero_image, capabilities, highlights, published)
VALUES (
  'industria',
  'Sector Industrial',
  'Rotulación para Naves Industriales y Fábricas',
  'Diseñamos, fabricamos e instalamos soluciones de señalización de gran formato y rotulación de coronación adaptadas a los entornos más exigentes. Desde la resistencia estructural hasta la optimización de visibilidad en autopistas.',
  '/proyectos/arval/20230304-ARVAL-ROTULO-CORONACION (36).jpeg',
  '[
    {
      "title": "Rotulación de Fachadas y Coronación",
      "description": "Rótulos gigantes corpóreos retroiluminados y letras monumentales diseñadas para ser legibles a kilómetros de distancia desde autovías y accesos principales.",
      "icon": "building"
    },
    {
      "title": "Señalética de Seguridad e Industrial",
      "description": "Marcación vial interna, señalización de riesgos, zonas de carga y señalética de plantas solares y naves de producción cumpliendo estrictamente con la normativa vigente.",
      "icon": "shield"
    },
    {
      "title": "Estructuras Homologadas e Ingeniería",
      "description": "Diseño y cálculo de fatiga al viento para monopostes y rótulos gigantes, visados por ingenieros colegiados garantizando máxima seguridad estructural.",
      "icon": "tool"
    }
  ]'::jsonb,
  '{
    "label": "COBERTURA NACIONAL",
    "title": "Un Solo Proveedor para Todas tus Plantas",
    "image": "/proyectos/redeia/logo-redeia.webp",
    "description": "Con nuestra red de fábricas y talleres cubrimos cualquier polígono industrial de España. Sincronizamos la implantación de marca en múltiples ubicaciones con un único interlocutor y la misma garantía Regius."
  }'::jsonb,
  true
)
ON CONFLICT (slug) DO UPDATE
SET 
  title = EXCLUDED.title,
  hero_title = EXCLUDED.hero_title,
  intro = EXCLUDED.intro,
  hero_image = EXCLUDED.hero_image,
  capabilities = EXCLUDED.capabilities,
  highlights = EXCLUDED.highlights,
  published = EXCLUDED.published;

-- 2. Vincular Proyectos Existentes al Sector Industria
-- (Para base de datos relacional/Supabase)
UPDATE projects 
SET sectors = ARRAY['industria'] 
WHERE slug IN ('redeia', 'arval');
