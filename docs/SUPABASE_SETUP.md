# Configuración Completa de Supabase

✅ **Estado:** Configurado y funcionando

## 📊 Resumen de la Configuración

### Base de Datos
- **Proyecto:** xprintapro
- **URL:** https://bdotuurxrdksolhywapd.supabase.co
- **Estado:** ✅ Esquema aplicado y datos migrados

### Datos Migrados
- ✅ **2 proyectos:** Arval y Redeia
- ✅ **16 planos técnicos:** 12 de Arval + 4 de Redeia
- ✅ **14 imágenes de galería:** 9 de Arval + 5 de Redeia

## 🔧 Configuración del CLI

### 1. Autenticación
```bash
# Ya configurado con access token
supabase login --token <YOUR_SUPABASE_ACCESS_TOKEN>
```

### 2. Proyecto Vinculado
```bash
# Proyecto vinculado localmente
supabase link --project-ref bdotuurxrdksolhywapd --password Go4WUBn9liPHcqau
```

### 3. Archivos de Configuración
- `.env.local` - Credenciales del frontend (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- `supabase/config.toml` - Configuración del CLI local
- `supabase/schema.sql` - Esquema SQL completo
- `supabase/migrations/20240623000000_initial_schema.sql` - Migración aplicada

## 📋 Esquema de Base de Datos

### Tablas Creadas

1. **projects**
   - Datos principales de los proyectos
   - Hero, cliente, servicio, ubicación, historia, render 3D, testimonial

2. **project_blueprints**
   - Planos técnicos vinculados a proyectos
   - Incluye título, descripción y orden

3. **project_gallery**
   - Galería de imágenes de proyectos
   - Grid configurable (cols, height)

4. **blog_posts**
   - Posts del blog (preparado para futuro)

5. **media**
   - Gestión de archivos multimedia (preparado para futuro)

### Políticas RLS (Row Level Security)
- ✅ Lectura pública habilitada para proyectos publicados
- ✅ Escritura restringida solo para administradores
- ✅ Políticas aplicadas a todas las tablas

## 🔄 Comandos Útiles

### Consultar datos
```bash
# Listar proyectos
supabase db query --linked "SELECT slug, title FROM projects;"

# Ver estadísticas
supabase db query --linked "
  SELECT
    (SELECT COUNT(*) FROM projects) as proyectos,
    (SELECT COUNT(*) FROM project_blueprints) as planos,
    (SELECT COUNT(*) FROM project_gallery) as fotos;
"
```

### Aplicar cambios al esquema
```bash
# Crear nueva migración
supabase migration new nombre_de_la_migracion

# Aplicar migraciones pendientes
supabase db push --yes
```

### Migrar más datos
```bash
# Ejecutar script de migración
node scripts/migrate-to-supabase.js
```

## 🚀 Uso en la Aplicación

### Cliente Supabase (src/lib/supabase.js)
```javascript
import { supabase, isSupabaseConfigured } from './lib/supabase';

// Verificar configuración
if (isSupabaseConfigured()) {
  // Supabase está activo
} else {
  // Usar datos de fallback (JSON)
}

// Obtener proyectos
const projects = await getProjects();

// Obtener proyecto por slug
const project = await getProjectBySlug('arval');
```

### Sistema de Fallback
- Si Supabase no está configurado, automáticamente usa archivos JSON locales
- Garantiza que la aplicación funcione en todos los entornos

## 📚 Enlaces Útiles

- **Dashboard:** https://app.supabase.com/project/bdotuurxrdksolhywapd
- **SQL Editor:** https://app.supabase.com/project/bdotuurxrdksolhywapd/sql/new
- **Table Editor:** https://app.supabase.com/project/bdotuurxrdksolhywapd/editor
- **Documentation:** https://supabase.com/docs

## 🔐 Seguridad

### Credenciales
- ✅ `.env.local` en `.gitignore` (nunca se sube a Git)
- ✅ `service_role` key comentada (solo para backend)
- ✅ `anon` key pública (safe para frontend)
- ✅ Access token guardado en CLI (~/.supabase/)

### Para Producción
```bash
# En Vercel/Netlify/etc., configurar variables de entorno:
VITE_SUPABASE_URL=https://bdotuurxrdksolhywapd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## ✅ Checklist de Verificación

- [x] Supabase CLI instalado y autenticado
- [x] Proyecto vinculado localmente
- [x] Esquema SQL aplicado
- [x] Datos de Arval migrados
- [x] Datos de Redeia migrados
- [x] Políticas RLS funcionando
- [x] Cliente JavaScript configurado
- [x] Sistema de fallback implementado

---

**Última actualización:** 2026-06-23
**Estado:** ✅ Completamente funcional
