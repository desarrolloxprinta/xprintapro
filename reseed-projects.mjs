import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabaseUrl = 'https://bdotuurxrdksolhywapd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkb3R1dXJ4cmRrc29saHl3YXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMTI5NjYsImV4cCI6MjA5Nzc4ODk2Nn0.8rS4fZ5h_jCtFv4bhlCbt3Qz3W0W47BnGaPxrTjMVws'

const supabase = createClient(supabaseUrl, supabaseKey)

// Función de mapeo (igual que en admin.js)
function mapJsonToDbProject(jsonData) {
  const planos = []
  const blueprintsList = jsonData.blueprints || []
  const steps = jsonData.blueprintSteps || []

  for (let i = 0; i < Math.max(blueprintsList.length, steps.length); i++) {
    planos.push({
      title: steps[i]?.title || 'Boceto Técnico',
      description: steps[i]?.description || '',
      url: blueprintsList[i] || ''
    })
  }

  const gallery = (jsonData.gallery || []).map(item => {
    return typeof item === 'string' ? item : (item.image || item.video || '')
  }).filter(Boolean)

  const testi = jsonData.testimonial ? {
    text: jsonData.testimonial.quote || null,
    photo: jsonData.testimonial.photo || null,
    author: jsonData.testimonial.author || null,
    role: jsonData.testimonial.role || null,
    company: jsonData.testimonial.company || null
  } : {}

  return {
    title: jsonData.title || '',
    slug: jsonData.id || '',
    client_name: jsonData.client?.name || '',
    client_info: jsonData.client?.description || null,
    service_type: jsonData.service?.title || 'Rotulación Luminosa',
    address: jsonData.location?.description || null,
    sector: jsonData.sector || '',
    thumbnail: jsonData.thumbnail || (jsonData.hero?.image || null),
    hero_image: jsonData.hero?.image || null,
    hero_video: jsonData.hero?.video || null,
    short_description: jsonData.shortDescription || jsonData.short_description || null,
    challenge_wysiwyg: jsonData.story?.challenge || null,
    solution_wysiwyg: jsonData.story?.solution || null,
    planos_tecnicos: planos,
    model_3d_render: jsonData.render3d?.model || null,
    gallery: gallery,
    testimonial: testi,
    published: true
  }
}

async function reseedProjects() {
  console.log('🌱 Iniciando re-semillado de proyectos...\n')

  // Cargar JSONs
  const redeiaData = JSON.parse(readFileSync('/home/suario/projects/xprinta-pro/src/data/projects/redeia.json', 'utf8'))
  const arvalData = JSON.parse(readFileSync('/home/suario/projects/xprinta-pro/src/data/projects/arval.json', 'utf8'))

  console.log('📦 JSONs cargados:')
  console.log('  - Redeia: blueprints =', redeiaData.blueprints?.length || 0, ', gallery =', redeiaData.gallery?.length || 0)
  console.log('  - Arval: blueprints =', arvalData.blueprints?.length || 0, ', gallery =', arvalData.gallery?.length || 0)
  console.log('')

  // Mapear datos
  const redeiaDb = mapJsonToDbProject(redeiaData)
  const arvalDb = mapJsonToDbProject(arvalData)

  console.log('🔄 Datos mapeados para Supabase:')
  console.log('  - Redeia: planos_tecnicos =', redeiaDb.planos_tecnicos.length, ', gallery =', redeiaDb.gallery.length)
  console.log('  - Arval: planos_tecnicos =', arvalDb.planos_tecnicos.length, ', gallery =', arvalDb.gallery.length)
  console.log('')

  // Eliminar proyectos existentes
  console.log('🗑️  Eliminando proyectos existentes...')
  await supabase.from('projects').delete().eq('slug', 'redeia')
  await supabase.from('projects').delete().eq('slug', 'arval')
  console.log('✅ Proyectos eliminados\n')

  // Insertar nuevos proyectos
  console.log('📝 Insertando proyectos con datos completos...')
  const { data, error } = await supabase.from('projects').insert([redeiaDb, arvalDb]).select()

  if (error) {
    console.error('❌ Error insertando proyectos:', error)
    process.exit(1)
  }

  console.log('✅ Proyectos insertados exitosamente!')
  console.log('\n📊 Verificación:')
  data.forEach(proj => {
    console.log(`\n  ${proj.client_name} (${proj.slug}):`)
    console.log(`    - Planos técnicos: ${proj.planos_tecnicos?.length || 0}`)
    console.log(`    - Galería: ${proj.gallery?.length || 0}`)
    console.log(`    - Testimonio: ${proj.testimonial?.text ? '✅' : '❌'}`)
  })

  console.log('\n🎉 Re-semillado completado!')
}

reseedProjects().catch(console.error)
