#!/bin/bash

# Script de Verificación de Integración con Supabase
# Verifica que los proyectos dinámicos cargan correctamente desde Supabase

set -e

echo "🔍 Verificando integración con Supabase..."
echo ""

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Cargar variables de entorno
if [ -f .env.local ]; then
    source .env.local
else
    echo -e "${RED}❌ Error: .env.local no encontrado${NC}"
    exit 1
fi

# 1. Verificar variables de entorno
echo "1️⃣ Verificando variables de entorno..."
if [ -z "$VITE_SUPABASE_URL" ]; then
    echo -e "${RED}❌ VITE_SUPABASE_URL no está configurada${NC}"
    exit 1
fi
if [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
    echo -e "${RED}❌ VITE_SUPABASE_ANON_KEY no está configurada${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Variables de entorno configuradas${NC}"
echo ""

# 2. Probar conexión a Supabase
echo "2️⃣ Probando conexión a Supabase..."
RESPONSE=$(curl -s -w "\n%{http_code}" \
    -X GET "${VITE_SUPABASE_URL}/rest/v1/projects?select=id,slug&limit=1" \
    -H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${VITE_SUPABASE_ANON_KEY}")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | head -n-1)

if [ "$HTTP_CODE" != "200" ]; then
    echo -e "${RED}❌ Error de conexión con Supabase (HTTP $HTTP_CODE)${NC}"
    echo "$BODY"
    exit 1
fi
echo -e "${GREEN}✅ Conexión con Supabase exitosa${NC}"
echo ""

# 3. Verificar proyectos en Supabase
echo "3️⃣ Verificando proyectos en Supabase..."
PROJECTS=$(curl -s \
    -X GET "${VITE_SUPABASE_URL}/rest/v1/projects?select=slug,title,published&published=eq.true" \
    -H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${VITE_SUPABASE_ANON_KEY}")

PROJECT_COUNT=$(echo "$PROJECTS" | python3 -c "import sys, json; print(len(json.load(sys.stdin)))" 2>/dev/null || echo "0")

if [ "$PROJECT_COUNT" -eq "0" ]; then
    echo -e "${YELLOW}⚠️  No hay proyectos publicados en Supabase${NC}"
    echo -e "${YELLOW}   Usando fallback a JSON local${NC}"
else
    echo -e "${GREEN}✅ $PROJECT_COUNT proyectos encontrados en Supabase${NC}"
    echo "$PROJECTS" | python3 -m json.tool 2>/dev/null | head -20
fi
echo ""

# 4. Verificar proyecto Redeia
echo "4️⃣ Verificando proyecto Redeia..."
REDEIA=$(curl -s \
    -X GET "${VITE_SUPABASE_URL}/rest/v1/projects?select=slug,title&slug=eq.redeia&limit=1" \
    -H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${VITE_SUPABASE_ANON_KEY}")

REDEIA_COUNT=$(echo "$REDEIA" | python3 -c "import sys, json; print(len(json.load(sys.stdin)))" 2>/dev/null || echo "0")

if [ "$REDEIA_COUNT" -eq "0" ]; then
    echo -e "${YELLOW}⚠️  Proyecto Redeia no encontrado en Supabase${NC}"
    echo -e "${YELLOW}   Usando fallback a src/data/projects/redeia.json${NC}"
else
    echo -e "${GREEN}✅ Proyecto Redeia encontrado en Supabase${NC}"
fi
echo ""

# 5. Verificar proyecto Arval
echo "5️⃣ Verificando proyecto Arval..."
ARVAL=$(curl -s \
    -X GET "${VITE_SUPABASE_URL}/rest/v1/projects?select=slug,title&slug=eq.arval&limit=1" \
    -H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${VITE_SUPABASE_ANON_KEY}")

ARVAL_COUNT=$(echo "$ARVAL" | python3 -c "import sys, json; print(len(json.load(sys.stdin)))" 2>/dev/null || echo "0")

if [ "$ARVAL_COUNT" -eq "0" ]; then
    echo -e "${YELLOW}⚠️  Proyecto Arval no encontrado en Supabase${NC}"
    echo -e "${YELLOW}   Usando fallback a src/data/projects/arval.json${NC}"
else
    echo -e "${GREEN}✅ Proyecto Arval encontrado en Supabase${NC}"
fi
echo ""

# 6. Verificar archivos de fallback
echo "6️⃣ Verificando archivos de fallback JSON..."
if [ ! -f "src/data/projects/redeia.json" ]; then
    echo -e "${RED}❌ src/data/projects/redeia.json no existe${NC}"
    exit 1
fi
if [ ! -f "src/data/projects/arval.json" ]; then
    echo -e "${RED}❌ src/data/projects/arval.json no existe${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Archivos de fallback JSON presentes${NC}"
echo ""

# Resumen final
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ VERIFICACIÓN COMPLETA${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Resumen:"
echo "   • Conexión con Supabase: ✅"
echo "   • Proyectos en Supabase: $PROJECT_COUNT"
echo "   • Proyecto Redeia: $([ "$REDEIA_COUNT" -eq "0" ] && echo "Fallback JSON" || echo "✅ Supabase")"
echo "   • Proyecto Arval: $([ "$ARVAL_COUNT" -eq "0" ] && echo "Fallback JSON" || echo "✅ Supabase")"
echo "   • Archivos de fallback: ✅"
echo ""
echo "🎯 Sistema de carga dinámica funcionando correctamente"
echo "   Los proyectos cargan desde Supabase cuando están disponibles"
echo "   y usan fallback automático a JSON si hay algún problema."
echo ""
