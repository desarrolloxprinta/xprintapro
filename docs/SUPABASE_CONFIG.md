# Configuración de Supabase - Xprinta Pro

## Credenciales del Proyecto

**Proyecto:** xprintapro
**Password:** Go4WUBn9liPHcqau

## Configuración Necesaria

Para completar la configuración, necesitas:

1. **URL del Proyecto**
   - Ubicación: Dashboard de Supabase > Settings > API
   - Formato: `https://[project-ref].supabase.co`

2. **Anon/Public Key**
   - Ubicación: Dashboard de Supabase > Settings > API > Project API keys
   - Sección: "anon public"

## Pasos de Configuración

### 1. Crear el archivo .env.local

```bash
# En la raíz del proyecto
cp .env.example .env.local
```

### 2. Agregar las credenciales

Editar `.env.local` con:

```env
VITE_SUPABASE_URL=https://[tu-project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=[tu-anon-key]
```

### 3. Aplicar el esquema de la base de datos

```bash
# Opción 1: Desde Supabase Dashboard
# - Ve a SQL Editor
# - Copia el contenido de supabase/schema.sql
# - Ejecuta el query

# Opción 2: Usando Supabase CLI (si está instalado)
supabase db push
```

### 4. Migrar datos existentes

Una vez configurado el esquema:

```bash
node scripts/migrate-to-supabase.js
```

## Estructura de la Base de Datos

### Tablas Principales

1. **projects** - Proyectos principales
2. **project_blueprints** - Planos técnicos de cada proyecto
3. **project_gallery** - Galería de fotos
4. **blog_posts** - Entradas del blog
5. **media** - Gestión de archivos multimedia

### Políticas de Seguridad (RLS)

- ✅ Lectura pública habilitada para contenido publicado
- ❌ Escritura restringida solo para administradores

## Links Útiles

- Dashboard: https://app.supabase.com/project/xprintapro
- Documentation: https://supabase.com/docs
- SQL Editor: https://app.supabase.com/project/xprintapro/editor

## Notas de Desarrollo

- El sistema funciona con **fallback a JSON** si Supabase no está configurado
- Las credenciales **nunca** se suben a Git (`.env.local` está en `.gitignore`)
- Para producción, usa variables de entorno del hosting
