#!/bin/bash

# Script de Verificación de Integración con Supabase
echo "🔍 Verificando integración con Supabase..."
echo ""

# Leer variables de entorno
SUPABASE_URL=$(grep VITE_SUPABASE_URL .env.local | cut -d '=' -f2)
SUPABASE_KEY=$(grep VITE_SUPABASE_ANON_KEY .env.local | cut -d '=' -f2)

echo "1️⃣ Verificando configuración..."
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_KEY" ]; then
    echo "❌ Error: Variables de entorno no configuradas"
    exit 1
fi
echo "✅ Variables configuradas"
echo ""

echo "2️⃣ Probando conexión a Supabase..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
    -X GET "${SUPABASE_URL}/rest/v1/projects?select=id&limit=1" \
    -H "apikey: ${SUPABASE_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_KEY}")

if [ "$HTTP_CODE" != "200" ]; then
    echo "❌ Error de conexión (HTTP $HTTP_CODE)"
    exit 1
fi
echo "✅ Conexión exitosa"
echo ""

echo "3️⃣ Verificando proyectos..."
PROJECTS=$(curl -s \
    -X GET "${SUPABASE_URL}/rest/v1/projects?select=slug,title&published=eq.true" \
    -H "apikey: ${SUPABASE_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_KEY}")

echo "$PROJECTS"
echo ""

echo "4️⃣ Verificando proyecto Redeia..."
REDEIA=$(curl -s \
    -X GET "${SUPABASE_URL}/rest/v1/projects?select=slug&slug=eq.redeia" \
    -H "apikey: ${SUPABASE_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_KEY}")

if echo "$REDEIA" | grep -q "redeia"; then
    echo "✅ Redeia encontrado en Supabase"
else
    echo "⚠️  Redeia no encontrado, usará fallback JSON"
fi
echo ""

echo "5️⃣ Verificando proyecto Arval..."
ARVAL=$(curl -s \
    -X GET "${SUPABASE_URL}/rest/v1/projects?select=slug&slug=eq.arval" \
    -H "apikey: ${SUPABASE_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_KEY}")

if echo "$ARVAL" | grep -q "arval"; then
    echo "✅ Arval encontrado en Supabase"
else
    echo "⚠️  Arval no encontrado, usará fallback JSON"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ VERIFICACIÓN COMPLETA"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎯 Sistema de carga dinámica funcionando correctamente"
echo ""
