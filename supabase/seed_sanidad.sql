-- ==========================================================================
-- SEED DATA: Sector Sanidad (Hospitales y Centros Médicos)
-- ==========================================================================

INSERT INTO sectors (slug, title, hero_title, intro, hero_image, capabilities, highlights, published)
VALUES (
  'sanidad',
  'Sector Sanidad',
  'Rotulación para Hospitales y Centros Médicos',
  'Diseñamos y fabricamos sistemas de señalización clínica y rotulación exterior de alta visibilidad para centros de salud, clínicas y complejos hospitalarios. Soluciones higiénicas, claras y accesibles que guían con precisión.',
  '/sectores/sector_sanidad_hero_large.png',
  '[
    {
      "title": "Señalética Direccional y Accesibilidad",
      "description": "Directorios principales, placas de planta y tótems indicativos diseñados bajo criterios de accesibilidad universal para facilitar el flujo ágil de pacientes y personal médico.",
      "icon": "building"
    },
    {
      "title": "Materiales Antibacterianos Certificados",
      "description": "Uso de sustratos fenólicos, acrílicos y lacas especiales de fácil desinfección que resisten los tratamientos químicos de asepsia hospitalaria diaria.",
      "icon": "shield"
    },
    {
      "title": "Rótulos Luminosos de Urgencias 24/7",
      "description": "Rótulos corpóreos exteriores con iluminación LED de alta potencia y visibilidad para accesos prioritarios de ambulancias y áreas de atención inmediata.",
      "icon": "tool"
    }
  ]'::jsonb,
  '{
    "label": "ACCESIBILIDAD Y ORIENTACIÓN",
    "title": "Entornos Médicos Claros y Libres de Estrés",
    "image": "/sectores/sector_sanidad_hero_small.png",
    "description": "El diseño de la información visual y espacial influye directamente en el bienestar emocional de los pacientes. Desarrollamos proyectos integrales de wayfinding que reducen tiempos de búsqueda y mejoran la eficiencia operativa del personal."
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
