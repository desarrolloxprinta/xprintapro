import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bdotuurxrdksolhywapd.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkb3R1dXJ4cmRrc29saHl3YXBkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjIxMjk2NiwiZXhwIjoyMDk3Nzg4OTY2fQ.6USIGAyqzqeOKVdD2msRAfN3xeXJp6oFfiaGZYYFb1M'

const supabase = createClient(supabaseUrl, serviceRoleKey)

const redeiaUpdate = {
  planos_tecnicos: [
    {
      title: 'Cotas Generales',
      description: 'Medidas maestras y desarrollo estructural principal. Especificamos las dimensiones generales para la correcta integración arquitectónica del rótulo en fachada.',
      url: '/proyectos/redeia/planos-tecnicos-2.png'
    },
    {
      title: 'Despiece de Materiales',
      description: 'Identificación de componentes metálicos, perfilería interior y cerramientos frontales. Se asegura que la dilatación de materiales en exteriores quede compensada.',
      url: '/proyectos/redeia/planos-tecnicos-3.png'
    },
    {
      title: 'Electrificación',
      description: 'Disposición de los módulos LED, recorridos de cableado y fuentes de alimentación. Optimización para garantizar una luminosidad homogénea sin sombras proyectadas.',
      url: '/proyectos/redeia/planos-tecnicos-4.png'
    },
    {
      title: 'Anclajes y Fijación',
      description: 'Planos de anclaje estructural. Sistema de sujeción calculado para soportar cargas de viento y peso, garantizando la seguridad absoluta de la instalación.',
      url: '/proyectos/redeia/planos-tecnicos-5.png'
    }
  ],
  gallery: [
    '/proyectos/redeia/REDEIA_GAITANES_CORONACION_06.jpeg',
    '/proyectos/redeia/20221026_135051-scaled-1.jpg',
    '/proyectos/redeia/20221026_135051-scaled-2.jpg',
    '/proyectos/redeia/20221026_135051-scaled-3.jpg',
    '/proyectos/redeia/20221026_135051-scaled-4.jpg'
  ],
  testimonial: {
    text: 'Con este proyecto dejamos claro que proyectos exigentes en cuanto a factores tales como tiempo o compromisos de confidencialidad son posibles gracias a una excelente coordinación.',
    photo: null,
    author: 'Garantía Xprinta',
    role: 'Equipo Nacional',
    company: null
  }
}

const arvalUpdate = {
  planos_tecnicos: [
    {
      title: 'Alzado Principal',
      description: 'Vista frontal completa del rótulo con dimensiones generales y ubicación de elementos luminosos.',
      url: '/proyectos/arval/plano-alzado.jpg'
    },
    {
      title: 'Sección Constructiva',
      description: 'Detalle de la estructura interna, sistema de fijación y componentes eléctricos.',
      url: '/proyectos/arval/plano-seccion.jpg'
    }
  ],
  gallery: [
    '/proyectos/arval/arval-coronacion-01.jpg',
    '/proyectos/arval/arval-coronacion-02.jpg',
    '/proyectos/arval/arval-detalle-01.jpg'
  ],
  testimonial: {
    text: 'La instalación del rótulo de Arval fue ejecutada con precisión y profesionalismo, cumpliendo con todos los estándares de calidad exigidos.',
    photo: null,
    author: 'Director de Imagen Corporativa',
    role: 'Director',
    company: 'Arval España'
  }
}

async function updateProjects() {
  console.log('🔄 Actualizando proyectos con service_role key...\n')

  console.log('📝 Actualizando Redeia...')
  const { data: redeia, error: redeiaError } = await supabase
    .from('projects')
    .update(redeiaUpdate)
    .eq('slug', 'redeia')
    .select()

  if (redeiaError) {
    console.error('❌ Error actualizando Redeia:', redeiaError)
  } else if (!redeia || redeia.length === 0) {
    console.error('⚠️  No se actualizó Redeia (registro no encontrado)')
  } else {
    console.log('✅ Redeia actualizado:')
    console.log('   - Planos técnicos:', redeia[0].planos_tecnicos.length)
    console.log('   - Galería:', redeia[0].gallery.length)
    console.log('   - Testimonio:', redeia[0].testimonial.text ? '✅' : '❌')
  }

  console.log('\n📝 Actualizando Arval...')
  const { data: arval, error: arvalError } = await supabase
    .from('projects')
    .update(arvalUpdate)
    .eq('slug', 'arval')
    .select()

  if (arvalError) {
    console.error('❌ Error actualizando Arval:', arvalError)
  } else if (!arval || arval.length === 0) {
    console.error('⚠️  No se actualizó Arval (registro no encontrado)')
  } else {
    console.log('✅ Arval actualizado:')
    console.log('   - Planos técnicos:', arval[0].planos_tecnicos.length)
    console.log('   - Galería:', arval[0].gallery.length)
    console.log('   - Testimonio:', arval[0].testimonial.text ? '✅' : '❌')
  }

  console.log('\n🎉 Actualización completada!')
  console.log('\n📋 Siguiente paso:')
  console.log('   Ve a http://localhost:5174/admin y edita los proyectos para verificar que todos los campos se cargan correctamente.')
}

updateProjects().catch(err => {
  console.error('💥 Error:', err)
  process.exit(1)
})
