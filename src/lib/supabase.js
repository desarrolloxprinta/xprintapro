/**
 * Cliente de Supabase
 * Configuración centralizada para acceso a la base de datos
 */

import { createClient } from '@supabase/supabase-js';

// Obtener credenciales desde variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// DEBUG temporal
console.log('🔍 Supabase config check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  url: supabaseUrl,
  keyLength: supabaseAnonKey?.length
});

// Validar que existan las credenciales
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Credenciales de Supabase no configuradas. Usando datos de fallback (JSON).');
}

// Crear cliente de Supabase
let supabase = null;
try {
  if (supabaseUrl && supabaseAnonKey) {
    // Limpiar valores (eliminar espacios/saltos de línea)
    const cleanUrl = supabaseUrl.trim();
    const cleanKey = supabaseAnonKey.trim();

    console.log('🔧 Creating Supabase client with:', {
      urlLength: cleanUrl.length,
      keyLength: cleanKey.length,
      urlValid: cleanUrl.startsWith('https://'),
      keyValid: cleanKey.startsWith('eyJ')
    });

    // Crear cliente con opciones explícitas
    const options = {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      },
      global: {
        headers: {}
      }
    };

    supabase = createClient(cleanUrl, cleanKey, options);
    console.log('✅ Supabase client created successfully with options:', options);
  }
} catch (error) {
  console.error('❌ Error creating Supabase client:', error);
  supabase = null;
}

export { supabase };

/**
 * Verifica si Supabase está configurado
 * @returns {boolean}
 */
export function isSupabaseConfigured() {
  return supabase !== null;
}

/**
 * Obtiene todos los proyectos publicados, ordenados por fecha
 * @param {number} limit - Número máximo de proyectos a obtener
 * @returns {Promise<Array>}
 */
export async function getProjects(limit = null) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase no configurado. Retornando datos de fallback.');
    return getFallbackProjects();
  }

  try {
    console.log('🔍 Using direct fetch to Supabase REST API...');

    // Limpiar y validar credenciales
    const cleanUrl = supabaseUrl.trim().replace(/\s+/g, '');
    const cleanKey = supabaseAnonKey.trim().replace(/\s+/g, '').replace(/[\r\n]/g, '');

    console.log('🔍 Credentials check:', {
      urlLength: cleanUrl.length,
      keyLength: cleanKey.length,
      urlValid: cleanUrl.startsWith('https://'),
      keyValid: cleanKey.startsWith('eyJ'),
      keyHasSpaces: cleanKey !== cleanKey.trim(),
      keyHasNewlines: /[\r\n]/.test(supabaseAnonKey)
    });

    // Construir URL con query params
    let url = `${cleanUrl}/rest/v1/projects?select=*&published=eq.true&order=created_date.desc`;
    if (limit) {
      url += `&limit=${limit}`;
    }

    console.log('📡 Fetching from:', url.substring(0, 80) + '...');

    // Crear headers object con validación
    const headers = new Headers();
    headers.append('apikey', cleanKey);
    headers.append('Authorization', `Bearer ${cleanKey}`);
    headers.append('Content-Type', 'application/json');

    console.log('📋 Headers prepared:', {
      hasApikey: headers.has('apikey'),
      hasAuth: headers.has('Authorization'),
      hasContentType: headers.has('Content-Type')
    });

    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    console.log('📦 Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ HTTP error:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Query successful, returning', data?.length, 'projects');
    return data || [];
  } catch (error) {
    console.error('Error obteniendo proyectos:', error);
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      stack: error?.stack?.substring(0, 200),
      name: error?.name
    });
    console.warn('⚠️ Falling back to local JSON data');
    return getFallbackProjects();
  }
}

/**
 * Obtiene los N proyectos más recientes
 * @param {number} count - Número de proyectos (default: 3)
 * @returns {Promise<Array>}
 */
export async function getRecentProjects(count = 3) {
  return getProjects(count);
}

/**
 * Obtiene un proyecto por su slug
 * @param {string} slug - Slug del proyecto (ej: "redeia", "arval")
 * @returns {Promise<Object|null>}
 */
export async function getProjectBySlug(slug) {
  if (!supabase) {
    console.warn('Supabase no configurado. Retornando datos de fallback.');
    return getFallbackProjectBySlug(slug);
  }

  try {
    // Obtener proyecto principal
    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;
    if (!project) return null;

    // Obtener blueprints del proyecto
    const { data: blueprints } = await supabase
      .from('project_blueprints')
      .select('*')
      .eq('project_id', project.id)
      .order('sort_order', { ascending: true });

    // Obtener galería del proyecto
    const { data: gallery } = await supabase
      .from('project_gallery')
      .select('*')
      .eq('project_id', project.id)
      .order('sort_order', { ascending: true });

    // Combinar datos
    return {
      ...project,
      blueprints: blueprints || [],
      gallery: gallery || []
    };
  } catch (error) {
    console.error('Error obteniendo proyecto:', error);
    return getFallbackProjectBySlug(slug);
  }
}

/**
 * Obtiene posts del blog, ordenados por fecha
 * @param {number} limit - Número máximo de posts
 * @returns {Promise<Array>}
 */
export async function getBlogPosts(limit = null) {
  if (!supabase) {
    console.warn('Supabase no configurado. Retornando array vacío.');
    return [];
  }

  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_date', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error obteniendo blog posts:', error);
    return [];
  }
}

/**
 * Obtiene un post del blog por su slug
 * @param {string} slug - Slug del post
 * @returns {Promise<Object|null>}
 */
export async function getBlogPostBySlug(slug) {
  if (!supabase) {
    console.warn('Supabase no configurado.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error obteniendo blog post:', error);
    return null;
  }
}

/**
 * Obtiene la información de un sector por su slug
 * @param {string} slug - Slug del sector
 * @returns {Promise<Object|null>}
 */
export async function getSectorBySlug(slug) {
  if (!supabase) {
    console.warn('Supabase no configurado. Retornando datos de fallback para sector.');
    return getFallbackSectorBySlug(slug);
  }

  try {
    const { data, error } = await supabase
      .from('sectors')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error obteniendo sector:', error);
    return getFallbackSectorBySlug(slug);
  }
}

/**
 * Obtiene todos los proyectos vinculados a un sector
 * @param {string} sectorSlug - Slug del sector
 * @returns {Promise<Array>}
 */
export async function getProjectsBySector(sectorSlug) {
  if (!supabase) {
    console.warn('Supabase no configurado. Retornando proyectos de fallback por sector.');
    return getFallbackProjectsBySector(sectorSlug);
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .contains('sectors', [sectorSlug])
      .eq('published', true);

    if (error) throw error;
    
    return data.map(d => ({
      ...d,
      heroImage: d.hero_image,
      heroVideo: d.hero_video,
      clientName: d.client_name,
      shortDescription: d.short_description
    }));
  } catch (error) {
    console.error('Error obteniendo proyectos del sector:', error);
    return getFallbackProjectsBySector(sectorSlug);
  }
}

/**
 * Obtiene todos los posts del área técnica
 * @returns {Promise<Array>}
 */
export async function getAreaTecnicaPosts() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase no configurado. Retornando datos de fallback para área técnica.');
    return getFallbackAreaTecnicaPosts();
  }

  try {
    console.log('🔍 Fetching area_tecnica_posts...');

    // Limpiar credenciales
    const cleanUrl = supabaseUrl.trim().replace(/\s+/g, '');
    const cleanKey = supabaseAnonKey.trim().replace(/\s+/g, '').replace(/[\r\n]/g, '');

    // Construir URL con query params
    const url = `${cleanUrl}/rest/v1/area_tecnica_posts?select=*&published=eq.true&order=published_date.desc`;

    console.log('📡 Fetching from:', url.substring(0, 80) + '...');

    // Crear headers
    const headers = new Headers();
    headers.append('apikey', cleanKey);
    headers.append('Authorization', `Bearer ${cleanKey}`);
    headers.append('Content-Type', 'application/json');

    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    console.log('📦 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ HTTP error:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Query successful, returning', data?.length, 'posts');

    if (!data || data.length === 0) {
      console.warn('⚠️ No posts from Supabase, using fallback');
      return getFallbackAreaTecnicaPosts();
    }

    return data.map(d => ({
      ...d,
      thumbnail: d.thumbnail,
      heroVideo: d.hero_video,
      audioUrl: d.audio_url,
      pdfUrl: d.pdf_url
    }));
  } catch (error) {
    console.error('Error obteniendo posts de área técnica:', error);
    return getFallbackAreaTecnicaPosts();
  }
}

/**
 * Obtiene un post del área técnica por su slug
 * @param {string} slug - Slug del post
 * @returns {Promise<Object|null>}
 */
export async function getAreaTecnicaPostBySlug(slug) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase no configurado. Retornando datos de fallback para área técnica.');
    return getFallbackAreaTecnicaPostBySlug(slug);
  }

  try {
    console.log('🔍 Fetching area_tecnica_post by slug:', slug);

    // Limpiar credenciales
    const cleanUrl = supabaseUrl.trim().replace(/\s+/g, '');
    const cleanKey = supabaseAnonKey.trim().replace(/\s+/g, '').replace(/[\r\n]/g, '');

    // Construir URL con query params
    const url = `${cleanUrl}/rest/v1/area_tecnica_posts?select=*&slug=eq.${slug}&published=eq.true&limit=1`;

    console.log('📡 Fetching from:', url.substring(0, 80) + '...');

    // Crear headers
    const headers = new Headers();
    headers.append('apikey', cleanKey);
    headers.append('Authorization', `Bearer ${cleanKey}`);
    headers.append('Content-Type', 'application/json');

    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    console.log('📦 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ HTTP error:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Query successful, data:', data);

    if (!data || data.length === 0) {
      console.warn('⚠️ No data from Supabase, using fallback');
      return getFallbackAreaTecnicaPostBySlug(slug);
    }

    const rawPost = data[0];

    // Convert database snake_case to the camelCase expected by the template
    const post = {
      ...rawPost,
      thumbnail: rawPost.thumbnail,
      heroVideo: rawPost.hero_video,
      audioUrl: rawPost.audio_url,
      pdfUrl: rawPost.pdf_url,
      paperformEmbedCode: rawPost.paperform_embed_code // NUEVO: soporte para embeds de Paperform
    };

    // Si sections está vacío o es null, hacer fallback al JSON para obtener el contenido
    if (!post.sections || (Array.isArray(post.sections) && post.sections.length === 0)) {
      console.warn(`⚠️ Post "${slug}" en Supabase no tiene sections. Haciendo fallback al JSON para contenido.`);
      const fallbackPost = await getFallbackAreaTecnicaPostBySlug(slug);
      if (fallbackPost && fallbackPost.sections) {
        return {
          ...post, // Mantener metadata de Supabase (thumbnail, dates, etc.)
          sections: fallbackPost.sections, // Usar sections del JSON
          intro: fallbackPost.intro, // Usar intro del JSON también
          paperformEmbedCode: fallbackPost.paperformEmbedCode || post.paperformEmbedCode // Priorizar fallback para Paperform
        };
      }
    }

    // IMPORTANTE: Si no hay paperformEmbedCode en Supabase, intentar obtenerlo del fallback
    if (!post.paperformEmbedCode) {
      const fallbackPost = await getFallbackAreaTecnicaPostBySlug(slug);
      if (fallbackPost && fallbackPost.paperformEmbedCode) {
        console.log(`✅ Usando paperformEmbedCode del fallback para post "${slug}"`);
        post.paperformEmbedCode = fallbackPost.paperformEmbedCode;
      }
    }

    return post;
  } catch (error) {
    console.error('Error obteniendo post de área técnica:', error);
    return getFallbackAreaTecnicaPostBySlug(slug);
  }
}

// ============================================
// FUNCIONES DE FALLBACK (cuando Supabase no está configurado)
// ============================================

/**
 * Datos de fallback para proyectos (JSON local)
 */
async function getFallbackProjects() {
  try {
    const arval = await import('../data/projects/arval.json');
    const redeia = await import('../data/projects/redeia.json');

    const projects = [arval.default, redeia.default]
      .map(p => ({
        ...p,
        slug: p.id,
        published: true,
        created_date: p.createdDate
      }))
      .sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

    return projects;
  } catch (error) {
    console.error('Error cargando proyectos de fallback:', error);
    return [];
  }
}

/**
 * Obtiene un proyecto de fallback por slug
 */
async function getFallbackProjectBySlug(slug) {
  try {
    const projectData = await import(`../data/projects/${slug}.json`);
    return {
      ...projectData.default,
      slug: projectData.default.id,
      blueprints: projectData.default.blueprints || [],
      gallery: projectData.default.gallery || []
    };
  } catch (error) {
    console.error(`Error cargando proyecto ${slug}:`, error);
    return null;
  }
}

/**
 * Obtiene un post de área técnica de fallback por slug
 */
async function getFallbackAreaTecnicaPostBySlug(slug) {
  try {
    const { default: areaTecnicaData } = await import('../data/area-tecnica.json');
    const post = areaTecnicaData.find(p => p.slug === slug);
    return post || null;
  } catch (error) {
    console.error(`Error cargando área técnica fallback ${slug}:`, error);
    return null;
  }
}

/**
 * Obtiene todos los posts de área técnica de fallback
 */
async function getFallbackAreaTecnicaPosts() {
  try {
    const { default: areaTecnicaData } = await import('../data/area-tecnica.json');
    return areaTecnicaData;
  } catch (error) {
    console.error('Error cargando área técnica posts fallback:', error);
    return [];
  }
}


/**
 * Obtiene los datos locales de un sector por slug (fallback)
 */
async function getFallbackSectorBySlug(slug) {
  if (slug === 'industria') {
    return {
      slug: 'industria',
      title: 'Sector Industrial',
      hero_title: 'Rotulación para Naves Industriales y Fábricas',
      intro: 'Diseñamos, fabricamos e instalamos soluciones de señalización de gran formato y rotulación de coronación adaptadas a los entornos más exigentes. Desde la resistencia estructural hasta la optimización de visibilidad en autopistas.',
      hero_image: '/sectores/sector_industria_hero_large.png',
      capabilities: [
        {
          title: "Rotulación de Fachadas y Coronación",
          description: "Rótulos gigantes corpóreos retroiluminados y letras monumentales diseñadas para ser legibles a kilómetros de distancia desde autovías y accesos principales.",
          icon: "building"
        },
        {
          title: "Señalética de Seguridad e Industrial",
          description: "Marcación vial interna, señalización de riesgos, zonas de carga y señalética de plantas solares y naves de producción cumpliendo estrictamente con la normativa vigente.",
          icon: "shield"
        },
        {
          title: "Estructuras Homologadas e Ingeniería",
          description: "Diseño y cálculo de fatiga al viento para monopostes y rótulos gigantes, visados por ingenieros colegiados garantizando máxima seguridad estructural.",
          icon: "tool"
        }
      ],
      highlights: {
        label: "COBERTURA NACIONAL",
        title: "Un Solo Proveedor para Todas tus Plantas",
        image: "/proyectos/redeia/logo-redeia.webp",
        description: "Con nuestra red de fábricas y talleres cubrimos cualquier polígono industrial de España. Sincronizamos la implantación de marca en múltiples ubicaciones con un único interlocutor y la misma garantía Regius."
      }
    };
  }

  if (slug === 'sanidad') {
    return {
      slug: 'sanidad',
      title: 'Sector Sanidad',
      hero_title: 'Rotulación para Hospitales y Centros Médicos',
      intro: 'Diseñamos y fabricamos sistemas de señalización clínica y rotulación exterior de alta visibilidad para centros de salud, clínicas y complejos hospitalarios. Soluciones higiénicas, claras y accesibles que guían con precisión.',
      hero_image: '/sectores/sector_sanidad_hero_large.png',
      capabilities: [
        {
          title: "Señalética Direccional y Accesibilidad",
          description: "Directorios principales, placas de planta y tótems indicativos diseñados bajo criterios de accesibilidad universal para facilitar el flujo ágil de pacientes y personal médico.",
          icon: "building"
        },
        {
          title: "Materiales Antibacterianos Certificados",
          description: "Uso de sustratos fenólicos, acrílicos y lacas especiales de fácil desinfección que resisten los tratamientos químicos de asepsia hospitalaria diaria.",
          icon: "shield"
        },
        {
          title: "Rótulos Luminosos de Urgencias 24/7",
          description: "Rótulos corpóreos exteriores con iluminación LED de alta potencia y visibilidad para accesos prioritarios de ambulancias y áreas de atención inmediata.",
          icon: "tool"
        }
      ],
      highlights: {
        label: "ACCESIBILIDAD Y ORIENTACIÓN",
        title: "Entornos Médicos Claros y Libres de Estrés",
        image: "/sectores/sector_sanidad_hero_small.png",
        description: "El diseño de la información visual y espacial influye directamente en el bienestar emocional de los pacientes. Desarrollamos proyectos integrales de wayfinding que reducen tiempos de búsqueda y mejoran la eficiencia operativa del personal."
      }
    };
  }

  if (slug === 'retail') {
    return {
      slug: 'retail',
      title: 'Sector Retail',
      hero_title: 'Rotulación Corporativa para Tiendas y Comercios',
      intro: 'Incluso el comercio mejor situado necesita de una fachada visible y atractiva para captar tráfico de clientes. Diseñamos e implantamos rótulos corpóreos con relieve, cajas de luz, banderines y vinilos de corte a medida.',
      hero_image: 'https://www.xprinta.com/wp-content/uploads/2015/02/XPRINTA_SECTORES_RETAIL.jpg',
      capabilities: [
        {
          title: "Rótulos Corpóreos con Relieve",
          description: "Fabricación de letras y logotipos en relieve de metal, metacrilato o PVC mediante corte CNC y retroiluminación LED para lograr máxima elegancia y legibilidad.",
          icon: "building"
        },
        {
          title: "Toldos y Elementos de Fachada",
          description: "Integración de toldos corporativos y marquesinas, transformando los sistemas de sombreado en canales publicitarios dinámicos y funcionales.",
          icon: "shield"
        },
        {
          title: "Rotulación de Cristales y Escaparates",
          description: "Decoración de escaparates y lunas comerciales usando vinilo de corte y de impresión digital de gran formato para campañas estacionales o branding definitivo.",
          icon: "tool"
        }
      ],
      highlights: {
        label: "PRODUCCIÓN A MEDIDA",
        title: "Potencia el Atractivo Visual de tu Fachada",
        image: 'https://www.xprinta.com/wp-content/uploads/2015/02/fondo-comercio.jpg',
        description: "El comercio a pie de calle tiene en la fachada del local su principal herramienta de ventas. En Xprinta asesoramos sobre la normativa urbana local y gestionamos licencias para que tu implantación comercial sea 100% legal y exitosa."
      }
    };
  }

  if (slug === 'restauracion') {
    return {
      slug: 'restauracion',
      title: 'Sector Restauración',
      hero_title: 'Rótulos y Señalética para Restaurantes, Cafeterías y Bares',
      intro: 'El atractivo exterior de un restaurante o cafetería es decisivo para atraer comensales. Diseñamos, fabricamos e implantamos rótulos luminosos LED, banderines corpóreos, vinilos efecto ácido y menuboards a medida.',
      hero_image: 'https://www.xprinta.com/wp-content/uploads/2021/09/Rotulacion-de-fachada-para-restaurantes.jpg',
      capabilities: [
        {
          title: "Rótulos Luminosos y Letreros LED",
          description: "Rótulos corpóreos y cajas de luz de bajo consumo e iluminación uniforme para dar máxima visibilidad diurna y nocturna a tu local.",
          icon: "building"
        },
        {
          title: "Banderines de Doble Cara",
          description: "Sistemas de rotulación perpendiculares a fachada, perfectos para captar la atención del flujo peatonal en ambos sentidos de la calle.",
          icon: "shield"
        },
        {
          title: "Menuboards y Señalización Interior",
          description: "Cartas de menús, cartelería corporativa y rotulación interior en vinilo y fotomurales que unifican el ambiente y la estética del restaurante.",
          icon: "tool"
        }
      ],
      highlights: {
        label: "IMPLANTACIÓN MULTIPUNTO",
        title: "Soluciones de Imagen para Cadenas y Franquicias",
        image: 'https://www.xprinta.com/wp-content/uploads/2015/02/banderines-restaurant.jpg',
        description: "Con nuestras 14 fábricas distribuidas a nivel nacional, damos servicio coordinado en todo el país. Garantizamos el mismo estándar de calidad, precio y plazos de entrega en todos tus locales comerciales."
      }
    };
  }

  if (slug === 'sector-publico') {
    return {
      slug: 'sector-publico',
      title: 'Sector Público',
      hero_title: 'Señalización y Rótulos para Organismos Públicos e Instituciones',
      intro: 'Los edificios de la administración pública y de representación ciudadana requieren una señalética exterior clara y accesible. Diseñamos e instalamos directorios, placas institucionales y rótulos oficiales a nivel nacional.',
      hero_image: 'https://www.xprinta.com/wp-content/uploads/2021/06/rotulo-exterior-colegio.jpg',
      capabilities: [
        {
          title: "Rótulos y Letras Corpóreas Oficiales",
          description: "Rótulos de fachada y letras monumentales para ministerios, ayuntamientos y juzgados que identifican la sede y transmiten prestigio institucional.",
          icon: "building"
        },
        {
          title: "Señalética de Orientación y Wayfinding",
          description: "Directorios curvos y planos para guiar de manera ágil a los ciudadanos en hospitales, colegios públicos y centros administrativos.",
          icon: "shield"
        },
        {
          title: "Placas Corporativas e Institucionales",
          description: "Placas grabadas con láser, metacrilatos y directorios de planta normalizados con la imagen corporativa oficial del organismo público.",
          icon: "tool"
        }
      ],
      highlights: {
        label: "DISEÑO NORMALIZADO",
        title: "Señalética Accesible para Edificios Públicos",
        image: 'https://www.xprinta.com/wp-content/uploads/2015/02/senalizacion2.jpg',
        description: "La señalización en el sector público debe ser universal y legible. En Xprinta desarrollamos proyectos llave en mano respetando manuales de identidad institucional y adaptándonos a los procesos de licitación pública y contratación del Estado."
      }
    };
  }

  if (slug === 'corporativo') {
    return {
      slug: 'corporativo',
      title: 'Sector Corporativo',
      hero_title: 'Trade Marketing y Rotulación Corporativa para Grandes Marcas',
      intro: 'Impulsamos la presencia de marca y ventas en el punto de venta y canales de distribución. Especialistas en proyectos integrales de trade marketing, stands, rotulación de flotas de vehículos y señalización corporativa.',
      hero_image: 'https://www.xprinta.com/wp-content/uploads/2016/09/rotulos-exterior.jpg',
      capabilities: [
        {
          title: "Rotulación de Vehículos y Flotas",
          description: "Rotulación integral y parcial de flotas de vehículos comerciales e industriales con vinilo de alta durabilidad. Publicidad móvil y de gran visibilidad.",
          icon: "building"
        },
        {
          title: "Stands Feriales y Displays Corporativos",
          description: "Diseño, fabricación y revestimiento gráfico de stands, tótems y expositores portátiles para ferias, museos y eventos corporativos.",
          icon: "shield"
        },
        {
          title: "Digital Signage y Menuboards",
          description: "Sistemas de cartelería digital integrados (en colaboración con partners tecnológicos como Samsung y Chamex) para la actualización en tiempo real de ofertas.",
          icon: "tool"
        }
      ],
      highlights: {
        label: "EFICACIA COMERCIAL",
        title: "Herramientas Visuales para el Canal de Ventas",
        image: 'https://www.xprinta.com/wp-content/uploads/2016/09/displays.jpg',
        description: "El trade marketing une los esfuerzos de ventas y marketing. En Xprinta proveemos a las principales marcas nacionales e internacionales de las mejores herramientas de visibilidad en el punto de venta, garantizando una ejecución impecable y uniforme."
      }
    };
  }

  if (slug === 'distribucion') {
    return {
      slug: 'distribucion',
      title: 'Sector Distribución',
      hero_title: 'Señalética y Rotulación para Centros de Distribución y Logística',
      intro: 'Optimizamos el flujo y la seguridad en centros logísticos, almacenes y plataformas de distribución. Diseñamos e instalamos señalización vial interior/exterior, directorios de muelles y rotulación de grandes flotas.',
      hero_image: '/sectores/sector_industria_hero_large.png',
      capabilities: [
        {
          title: "Señalización Vial y Muelles",
          description: "Marcación de pavimentos, numeración gigante de muelles y señales reflectantes homologadas para guiar el tráfico de camiones de forma segura.",
          icon: "building"
        },
        {
          title: "Seguridad e Higiene Industrial",
          description: "Señalética obligatoria de prevención de riesgos laborales (PRL), rutas de evacuación y delimitación de áreas peatonales dentro de naves.",
          icon: "shield"
        },
        {
          title: "Flotas de Transporte y Logística",
          description: "Rotulación de camiones, furgonetas y remolques con vinilos reflectantes homologados de máxima durabilidad y resistencia al desgaste.",
          icon: "tool"
        }
      ],
      highlights: {
        label: "EFICIENCIA Y SEGURIDAD",
        title: "Señalización Inteligente para Logística 4.0",
        image: '/sectores/sector_industria_hero_small.png',
        description: "Un centro de distribución con señalética deficiente reduce la productividad y aumenta los riesgos de accidentes. En Xprinta desarrollamos planes integrales de wayfinding logístico para que la operativa diaria de carga y descarga sea impecable."
      }
    };
  }

  if (slug === 'servicios') {
    return {
      slug: 'servicios',
      title: 'Sector Servicios',
      hero_title: 'Rotulación y Señalética para Oficinas y Sedes de Servicios',
      intro: 'Diseñamos entornos de trabajo inspiradores y funcionales. Desde mamparas de cristal decorativas y logotipos corpóreos para recepción hasta directorios generales para complejos empresariales.',
      hero_image: '/sectores/sector_sanidad_hero_large.png',
      capabilities: [
        {
          title: "Identificación y Recepción",
          description: "Logotipos en relieve retroiluminados, letras corpóreas de metal pulido o metacrilato para vestíbulos y áreas de bienvenida.",
          icon: "building"
        },
        {
          title: "Privacidad y Vinilos en Oficinas",
          description: "Láminas decorativas simulación ácido y vinilos corporativos personalizados para mamparas de vidrio en salas de reuniones.",
          icon: "shield"
        },
        {
          title: "Directorios y Orientación",
          description: "Monolitos exteriores, tótems direccionales y placas indicativas para facilitar el guiado de visitas en complejos empresariales.",
          icon: "tool"
        }
      ],
      highlights: {
        label: "DISEÑO CORPORATIVO",
        title: "Un Espacio de Trabajo que Comunica tu Identidad",
        image: '/sectores/sector_sanidad_hero_small.png',
        description: "Las oficinas corporativas son la carta de presentación física de una marca ante sus clientes y talento. En Xprinta integramos soluciones arquitectónicas que combinan funcionalidad, elegancia y estricto respeto a la identidad de marca."
      }
    };
  }

  if (slug === 'educacion') {
    return {
      slug: 'educacion',
      title: 'Sector Educación',
      hero_title: 'Señalización y Rotulación para Colegios, Institutos y Universidades',
      intro: 'Creamos entornos educativos seguros, claros y motivadores. Señalética de accesibilidad, directorios de aulas, vinilos didácticos y rotulación exterior de gran formato para centros de enseñanza.',
      hero_image: '/sectores/sector_sanidad_hero_large.png',
      capabilities: [
        {
          title: "Señalética Escolar y Aulas",
          description: "Placas indicativas de aulas, directorios de planta y sistemas de guiado accesibles y de esquinas redondeadas para máxima seguridad infantil.",
          icon: "building"
        },
        {
          title: "Vinilos Didácticos y Decoración",
          description: "Fotomurales de gran formato y vinilos decorativos de paredes con motivos educativos, fomentando la creatividad en pasillos y zonas comunes.",
          icon: "shield"
        },
        {
          title: "Rótulos Exteriores de Fachada",
          description: "Letras gigantes corpóreas o rótulos sin luz de gran durabilidad para identificar de forma profesional el nombre del centro en fachada.",
          icon: "tool"
        }
      ],
      highlights: {
        label: "ENTORNOS SEGUROS",
        title: "Orientación y Accesibilidad en Centros Educativos",
        image: '/sectores/sector_sanidad_hero_small.png',
        description: "Un centro educativo bien señalizado facilita el flujo diario y mejora la percepción de orden y seguridad. En Xprinta implementamos sistemas de wayfinding homologados llave en mano adaptados a las normativas de seguridad escolar vigentes."
      }
    };
  }

  if (slug === 'logistica') {
    return {
      slug: 'logistica',
      title: 'Sector Logística',
      hero_title: 'Rotulación y Señalización Integral para Operadores Logísticos',
      intro: 'Soluciones de alto rendimiento para la optimización y seguridad en hubs logísticos. Identificación de almacenes, señalización vial de seguridad y rotulación reflectante de flotas de transporte.',
      hero_image: '/sectores/sector_industria_hero_large.png',
      capabilities: [
        {
          title: "Señalética de Muelles e Identificación",
          description: "Números monumentales de muelles, carteles aéreos de pasillos de almacenaje y tótems indicativos de alta durabilidad.",
          icon: "building"
        },
        {
          title: "Señalización Horizontal y Vialidad",
          description: "Pintura vial reflectante para delimitación de carriles de carretillas, pasos de peatones y marcas de seguridad en suelo logístico.",
          icon: "shield"
        },
        {
          title: "Rotulación de Remolques y Flotas",
          description: "Rotulación corporativa y balizamiento reflectante homologado (ECE 104) de remolques y cabezas tractoras a nivel nacional.",
          icon: "tool"
        }
      ],
      highlights: {
        label: "LOGÍSTICA COORDINADA",
        title: "Señalización de Alto Rendimiento para Hubs",
        image: '/sectores/sector_industria_hero_small.png',
        description: "Los operadores logísticos exigen rapidez y uniformidad. En Xprinta nos encargamos de rotular y señalizar toda tu infraestructura a nivel nacional, con las mismas tarifas y la tranquilidad de un único interlocutor."
      }
    };
  }

  return null;
}

/**
 * Obtiene proyectos locales de fallback asociados a un sector
 */
async function getFallbackProjectsBySector(sectorSlug) {
  try {
    const redeia = await import('../data/projects/redeia.json');
    const arval = await import('../data/projects/arval.json');
    const allProjects = [redeia.default, arval.default];

    return allProjects
      .filter(p => {
        if (p.sectors && Array.isArray(p.sectors)) {
          return p.sectors.includes(sectorSlug);
        }
        if (sectorSlug === 'industria') {
          return p.id === 'redeia' || p.id === 'arval';
        }
        return false;
      })
      .map(p => ({
        ...p,
        slug: p.id,
        heroImage: p.hero?.image,
        heroVideo: p.hero?.video,
        clientName: p.client?.name,
        shortDescription: p.shortDescription
      }));
  } catch (error) {
    console.error('Error obteniendo proyectos de fallback por sector:', error);
    return [];
  }
}
