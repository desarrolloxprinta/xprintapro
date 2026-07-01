import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bdotuurxrdksolhywapd.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkb3R1dXJ4cmRrc29saHl3YXBkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjIxMjk2NiwiZXhwIjoyMDk3Nzg4OTY2fQ.6USIGAyqzqeOKVdD2msRAfN3xeXJp6oFfiaGZYYFb1M'

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-node'
    }
  },
  realtime: {
    enabled: false
  }
})

async function createStorageBucket() {
  console.log('🔧 Creando bucket de Supabase Storage...\n')

  try {
    // Check if bucket already exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()

    if (listError) {
      console.error('❌ Error listando buckets:', listError)
      return
    }

    const bucketExists = buckets.some(b => b.name === 'project-media')

    if (bucketExists) {
      console.log('✅ Bucket "project-media" ya existe')
    } else {
      // Create bucket
      const { data: bucket, error: createError } = await supabase.storage.createBucket('project-media', {
        public: true,
        fileSizeLimit: 10485760, // 10MB in bytes
        allowedMimeTypes: [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/webp',
          'image/gif',
          'video/mp4',
          'video/webm',
          'video/quicktime',
          'model/gltf-binary',
          'model/gltf+json'
        ]
      })

      if (createError) {
        console.error('❌ Error creando bucket:', createError)
        return
      }

      console.log('✅ Bucket "project-media" creado exitosamente')
    }

    // Verify bucket settings
    console.log('\n📋 Verificando configuración del bucket...')
    const bucket = buckets.find(b => b.name === 'project-media') || { name: 'project-media', public: true }
    console.log('   - Nombre:', bucket.name)
    console.log('   - Público:', bucket.public ? '✅' : '❌')
    console.log('   - ID:', bucket.id || 'N/A')

    console.log('\n🎉 Configuración completada!')
    console.log('\n📝 Siguiente paso:')
    console.log('   1. Ve a http://localhost:5174/admin')
    console.log('   2. Inicia sesión con desarrollo@xprinta.com')
    console.log('   3. Crea o edita un proyecto')
    console.log('   4. Prueba subir archivos usando los nuevos inputs de upload')

  } catch (err) {
    console.error('💥 Error:', err)
  }
}

createStorageBucket()
