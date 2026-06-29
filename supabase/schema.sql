-- ============================================
-- XPRINTA PRO - SUPABASE SCHEMA
-- ============================================
-- Base de datos para gestión de proyectos y blog
-- Diseñado para escalabilidad y fácil administración

-- ============================================
-- 1. TABLA: projects
-- ============================================
-- Almacena información principal de cada proyecto
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL, -- URL-friendly ID (ej: "redeia", "arval")
  title TEXT NOT NULL,
  short_description TEXT,
  category TEXT, -- "Energía / Corporativo", "Movilidad / Corporativo"
  sector TEXT, -- Sector principal
  created_date DATE NOT NULL DEFAULT CURRENT_DATE,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false, -- Para destacar en home

  -- Hero section
  hero_video TEXT, -- URL del video hero
  hero_image TEXT, -- URL de la imagen hero fallback

  -- Client info
  client_name TEXT,
  client_description TEXT,

  -- Service info
  service_title TEXT,
  service_logo TEXT,

  -- Location
  location_title TEXT,
  location_description TEXT,
  location_type TEXT DEFAULT 'single', -- 'single' o 'multiple'
  location_markers JSONB, -- Array de {lat, lng}

  -- Story (Challenge & Solution)
  challenge_title TEXT,
  challenge_description TEXT,
  challenge_image TEXT,
  solution_title TEXT,
  solution_description TEXT,
  solution_image TEXT,

  -- 3D Model
  render3d_title TEXT,
  render3d_description TEXT,
  render3d_model_url TEXT,

  -- Testimonial
  testimonial_quote TEXT,
  testimonial_author TEXT,
  testimonial_role TEXT,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsqueda rápida
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_created_date ON projects(created_date DESC);
CREATE INDEX idx_projects_published ON projects(published);
CREATE INDEX idx_projects_featured ON projects(featured);

-- ============================================
-- 2. TABLA: project_blueprints
-- ============================================
-- Planos técnicos de cada proyecto
CREATE TABLE IF NOT EXISTS project_blueprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0, -- Para ordenar los planos
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blueprints_project ON project_blueprints(project_id);
CREATE INDEX idx_blueprints_sort ON project_blueprints(project_id, sort_order);

-- ============================================
-- 3. TABLA: project_gallery
-- ============================================
-- Galería de fotos finales de cada proyecto
CREATE TABLE IF NOT EXISTS project_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  grid_cols INTEGER DEFAULT 4, -- Ancho en grid (4, 8, 12)
  height TEXT DEFAULT '60vh', -- Altura CSS
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_gallery_project ON project_gallery(project_id);
CREATE INDEX idx_gallery_sort ON project_gallery(project_id, sort_order);

-- ============================================
-- 4. TABLA: blog_posts
-- ============================================
-- Sistema de blog completo
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT, -- Resumen corto
  content TEXT, -- Contenido completo (Markdown o HTML)
  featured_image TEXT,
  author_name TEXT,
  author_role TEXT,
  category TEXT,
  tags TEXT[], -- Array de tags
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  published_date DATE,

  -- SEO
  meta_title TEXT,
  meta_description TEXT,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_published ON blog_posts(published);
CREATE INDEX idx_blog_published_date ON blog_posts(published_date DESC);
CREATE INDEX idx_blog_category ON blog_posts(category);
CREATE INDEX idx_blog_tags ON blog_posts USING GIN(tags);

-- ============================================
-- 5. TABLA: media (opcional para Storage)
-- ============================================
-- Registro de archivos multimedia
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL, -- Ruta en Supabase Storage
  file_type TEXT, -- image/jpeg, video/mp4, etc.
  file_size INTEGER, -- Bytes
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_media_type ON media(file_type);

-- ============================================
-- 6. VISTAS ÚTILES
-- ============================================

-- Vista de proyectos recientes (3 más recientes)
CREATE OR REPLACE VIEW recent_projects AS
SELECT
  id,
  slug,
  title,
  short_description,
  category,
  created_date,
  hero_video,
  hero_image
FROM projects
WHERE published = true
ORDER BY created_date DESC
LIMIT 3;

-- Vista de blog posts recientes
CREATE OR REPLACE VIEW recent_blog_posts AS
SELECT
  id,
  slug,
  title,
  excerpt,
  featured_image,
  author_name,
  category,
  published_date
FROM blog_posts
WHERE published = true
ORDER BY published_date DESC
LIMIT 6;

-- ============================================
-- 7. FUNCIONES ÚTILES
-- ============================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 8. POLÍTICAS RLS (Row Level Security)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_blueprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Políticas públicas para lectura (todos pueden leer contenido publicado)
CREATE POLICY "Public read published projects" ON projects
  FOR SELECT USING (published = true);

CREATE POLICY "Public read project blueprints" ON project_blueprints
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE id = project_blueprints.project_id
      AND published = true
    )
  );

CREATE POLICY "Public read project gallery" ON project_gallery
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE id = project_gallery.project_id
      AND published = true
    )
  );

CREATE POLICY "Public read published blog" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Public read media" ON media
  FOR SELECT TO PUBLIC USING (true);

-- Nota: Las políticas de escritura (INSERT/UPDATE/DELETE) se configuran
-- según los roles de administrador en Supabase Dashboard

-- ============================================
-- 9. TABLA: area_tecnica_posts
-- ============================================
-- Artículos y contenido profundo para el Área Técnica
CREATE TABLE IF NOT EXISTS area_tecnica_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT,
  author TEXT,
  thumbnail TEXT, -- Imagen thumbnail para cards y mega menu
  published_date DATE,
  hero_video TEXT,
  audio_url TEXT,
  pdf_url TEXT,
  sections JSONB, -- Array de objetos {id, title, content}
  published BOOLEAN DEFAULT false,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_area_tecnica_slug ON area_tecnica_posts(slug);
CREATE INDEX idx_area_tecnica_published ON area_tecnica_posts(published);
CREATE INDEX idx_area_tecnica_published_date ON area_tecnica_posts(published_date DESC);

-- Trigger para updated_at
CREATE TRIGGER update_area_tecnica_posts_updated_at BEFORE UPDATE ON area_tecnica_posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS para area_tecnica_posts
ALTER TABLE area_tecnica_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published area_tecnica" ON area_tecnica_posts
  FOR SELECT USING (published = true);
