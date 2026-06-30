-- ==========================================================================
-- SEED DATA: Sector Retail (Comercios y Tiendas)
-- ==========================================================================

INSERT INTO sectors (slug, title, hero_title, intro, hero_image, capabilities, highlights, published)
VALUES (
  'retail',
  'Sector Retail',
  'Rótulos para Comercios y Tiendas',
  'Diseñamos y fabricamos soluciones integrales de rotulación exterior e interior para comercios. Sistemas de señalización que atraen clientes, refuerzan tu marca y diferencian tu negocio de la competencia con materiales duraderos y diseño profesional.',
  '/sectores/retail.jpg',
  '[
    {
      "title": "Rótulos Luminosos y Letras Corpóreas",
      "description": "Rótulos exteriores iluminados con tecnología LED de alta eficiencia y letras corpóreas tridimensionales que maximizan la visibilidad de tu comercio tanto de día como de noche.",
      "icon": "building"
    },
    {
      "title": "Vinilos y Señalización de Escaparates",
      "description": "Sistemas de vinilado de fachadas, escaparates promocionales y señalética interior que comunican ofertas, refuerzan la imagen corporativa y guían al cliente dentro del establecimiento.",
      "icon": "shield"
    },
    {
      "title": "Toldos y Elementos de Protección Solar",
      "description": "Instalación de toldos corporativos, lonas publicitarias y elementos de fachada que protegen del sol mientras comunican tu marca con diseño integrado y materiales resistentes.",
      "icon": "tool"
    }
  ]'::jsonb,
  '{
    "label": "IMAGEN PROFESIONAL INTEGRAL",
    "title": "Tu Fachada es tu Primera Venta",
    "image": "/sectores/retail.jpg",
    "description": "El pequeño comercio tiene en la fachada de su local la principal herramienta para atraer clientes potenciales. Desarrollamos proyectos de señalización comercial que unifican tu identidad de marca, cumplen normativas municipales y resisten el paso del tiempo con garantía de 2 años."
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
