# Estrategia Git - Xprinta Pro

**Fecha de Implementación:** 2026-06-23
**Estado:** ✅ Activo

---

## 🎯 Objetivo

Proteger el código estable del home y proyectos mediante control de versiones, evitando emergencias futuras y permitiendo rollback seguro.

---

## 📋 Estructura de Ramas

```
main (PROTEGIDA)
  ├─ Código 100% funcional y testeado
  ├─ Solo commits vía Pull Request (o merge directo con confirmación)
  └─ Representa la versión en producción
  
dev (DESARROLLO)
  ├─ Rama de desarrollo activo
  ├─ Commits directos permitidos
  └─ Testing antes de merge a main
  
feature/* (FEATURES)
  ├─ feature/nuevo-proyecto-template
  ├─ feature/blindaje-home
  └─ Se mergean a dev cuando están completas
```

---

## 🔒 Reglas de Protección

### Rama `main` (PROTEGIDA)

**NUNCA:**
- ❌ Hacer commits directos sin verificar
- ❌ Hacer push de código no testeado
- ❌ Modificar sin backup previo

**SIEMPRE:**
- ✅ Hacer commit solo después de testing completo
- ✅ Usar mensajes descriptivos
- ✅ Crear tag de versión en releases importantes
- ✅ Documentar cambios en docs/

### Rama `dev` (DESARROLLO)

- ✅ Desarrollo diario
- ✅ Testing antes de merge a main
- ✅ Commits frecuentes

---

## 📝 Workflow Recomendado

### 1. Iniciar Nueva Feature

```bash
# Asegurarte de estar en dev actualizado
git checkout dev
git pull origin dev

# Crear rama de feature
git checkout -b feature/nombre-descriptivo
```

### 2. Desarrollo y Commits

```bash
# Añadir cambios
git add .

# Commit descriptivo
git commit -m "feat: descripción clara del cambio

- Detalle 1
- Detalle 2
- Fixes: #issue-number (si aplica)

🤖 Generated with Claude Code"
```

### 3. Mergear a Dev

```bash
# Regresar a dev
git checkout dev

# Mergear feature
git merge feature/nombre-descriptivo

# Eliminar rama feature (opcional)
git branch -d feature/nombre-descriptivo
```

### 4. Promover a Main (Solo cuando esté 100% probado)

```bash
# Testing completo en dev
npm run build
# Probar en navegador

# Mergear a main
git checkout main
git merge dev

# Crear tag de versión
git tag -a v1.0.0 -m "Release: Home estable + Proyecto Redeia corregido"
```

---

## 🚨 Rollback de Emergencia

### Si algo se rompe en `main`:

```bash
# Ver historial
git log --oneline

# Volver a un commit específico (preservando cambios)
git reset --soft HEAD~1

# O volver completamente (CUIDADO - borra cambios)
git reset --hard <commit-hash>
```

### Si `main` está roto pero `dev` funciona:

```bash
# Forzar main a coincidir con dev
git checkout main
git reset --hard dev
```

---

## 📌 Convenciones de Mensajes de Commit

Usar prefijos semánticos:

- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `refactor:` - Refactorización sin cambio de funcionalidad
- `style:` - Cambios de CSS/estilos
- `docs:` - Documentación
- `chore:` - Mantenimiento (deps, configs)
- `perf:` - Mejoras de performance

**Ejemplo:**
```
feat: agregar animación de galería en proyectos

- Implementado gsap.fromTo con stagger
- Removida clase conflictiva .gsap-reveal
- Galería ahora visible con 5 imágenes

Fixes: #4 (galería no funciona)

🤖 Generated with Claude Code
```

---

## 🏷️ Tags y Versiones

### Convención de Versionado (Semantic Versioning)

`v[MAJOR].[MINOR].[PATCH]`

**Ejemplo:**
- `v1.0.0` - Release inicial estable
- `v1.1.0` - Nueva feature (proyecto template mejorado)
- `v1.1.1` - Bugfix (cursor en proyectos)
- `v2.0.0` - Breaking change (nueva arquitectura)

### Crear Tag

```bash
# Tag anotado (recomendado)
git tag -a v1.0.0 -m "Release: Estado estable post-correcciones

- Home funcionando 100%
- Proyecto Redeia corregido (cursor, textos, 3D, galería)
- Clases utility CSS agregadas
- Documentación completa"

# Push tag a remoto (si usas GitHub/GitLab)
git push origin v1.0.0
```

---

## 🔍 Estados del Proyecto

### Commits Clave

1. **Estado Inicial (v0.1.0)** - `[PRÓXIMO COMMIT]`
   - Home funcional
   - Proyecto Redeia corregido
   - Sistema git inicializado

2. **Estado Blindado (v1.0.0)** - `[DESPUÉS DE SEPARAR HOME/PROYECTOS]`
   - Arquitectura modular
   - Home protegido
   - Template de proyectos independiente

---

## 🛡️ Blindaje Adicional

### 1. Pre-commit Hook (Opcional)

Crear `.git/hooks/pre-commit` que verifique:
- ✅ No commits directos a main sin confirmación
- ✅ Tests pasan (si hay suite de tests)
- ✅ Build no falla

### 2. Branch Protection (GitHub/GitLab)

Si usas repositorio remoto:
- Requerir PR para merge a main
- Requerir 1 aprobación
- Requerir que build pase

### 3. Backup Manual

Antes de cambios mayores:
```bash
# Crear backup tag
git tag -a backup-$(date +%Y%m%d-%H%M%S) -m "Backup pre-refactor"
```

---

## 📊 Estado Actual

**Última actualización:** 2026-06-23

| Rama | Estado | Descripción |
|------|--------|-------------|
| `main` | ✅ ESTABLE | Home + Redeia funcionando |
| `dev` | 🚧 En desarrollo | Próximas features |

**Próximos Pasos:**
1. ⏳ Commit inicial en main
2. ⏳ Crear rama dev
3. ⏳ Implementar blindaje home/proyectos
4. ⏳ Crear tag v1.0.0

---

## 🔗 Integración con Speckt

**Sistema Speckt:** Sistema de gestión de proyectos/tareas (asumo)

### Integración Recomendada:

1. **Vincular commits con tareas:**
   ```bash
   git commit -m "feat: nueva sección hero
   
   Speckt-Task: #SP-123
   🤖 Generated with Claude Code"
   ```

2. **Automatización (si Speckt tiene webhooks):**
   - Commit → Actualiza estado de tarea en Speckt
   - Tag → Notifica release en Speckt
   - PR merged → Cierra tarea automáticamente

3. **Workflow Speckt + Git:**
   ```
   Tarea creada en Speckt (SP-123)
     ↓
   Feature branch (feature/SP-123-descripcion)
     ↓
   Commits con referencia (Speckt-Task: #SP-123)
     ↓
   Merge a dev
     ↓
   Testing
     ↓
   Merge a main + tag
     ↓
   Tarea marcada completa en Speckt
   ```

---

**Mantenido por:** Xprinta Pro Team  
**Última revisión:** 2026-06-23
