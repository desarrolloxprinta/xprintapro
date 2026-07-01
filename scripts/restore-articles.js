import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SUPABASE_URL = 'https://bdotuurxrdksolhywapd.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkb3R1dXJ4cmRrc29saHl3YXBkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjIxMjk2NiwiZXhwIjoyMDk3Nzg4OTY2fQ.6USIGAyqzqeOKVdD2msRAfN3xeXJp6oFfiaGZYYFb1M'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

console.log('🚀 Restaurando contenido de artículos desde seed_area_tecnica.sql...\n')

// Leer el archivo SQL
const sqlPath = path.join(__dirname, '../supabase/seed_area_tecnica.sql')
const sqlContent = fs.readFileSync(sqlPath, 'utf-8')

// Extraer los artículos con REGEX
// Buscar entre ( y ), capturando el contenido de cada INSERT
const insertPattern = /\(\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'(\[[\s\S]*?\])'::jsonb,\s*(true|false)\s*\)/g

let match
let count = 0

while ((match = insertPattern.exec(sqlContent)) !== null) {
  const [_, slug, title, category, author, thumbnail, published_date, hero_video, audio_url, pdf_url, sectionsJson, published] = match

  try {
    const sections = JSON.parse(sectionsJson)

    console.log(`📝 Restaurando: ${slug}`)
    console.log(`   Secciones: ${sections.length}`)

    const { data, error } = await supabase
      .from('area_tecnica_posts')
      .update({ sections })
      .eq('slug', slug)
      .select()

    if (error) {
      console.error(`❌ Error en ${slug}:`, error.message)
    } else if (data && data.length > 0) {
      console.log(`✅ ${slug} actualizado\n`)
      count++
    } else {
      console.log(`⚠️  ${slug} no encontrado en BD\n`)
    }
  } catch (err) {
    console.error(`❌ Error parseando JSON de ${slug}:`, err.message)
  }
}

console.log(`\n✅ Restauración completada: ${count} artículos actualizados`)
