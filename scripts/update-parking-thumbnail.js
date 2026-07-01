import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');

const urlMatch = envContent.match(/VITE_SUPABASE_URL=(.*)/);
const serviceRoleMatch = envContent.match(/# VITE_SUPABASE_SERVICE_ROLE_KEY=(.*)/);

const supabaseUrl = urlMatch ? urlMatch[1].trim() : null;
const supabaseKey = serviceRoleMatch ? serviceRoleMatch[1].trim() : null;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Credentials not found in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  realtime: {
    transport: ws
  }
});

async function run() {
  console.log('📡 Updating database record in Supabase...');
  
  const { data, error } = await supabase
    .from('area_tecnica_posts')
    .update({ thumbnail: '/area tecnica/parking/ELEMENTOS GRAFICOS/SALIDA PARKING.jpeg' })
    .eq('slug', 'senalizacion-de-parkings')
    .select();

  if (error) {
    console.error('❌ Error updating database:', error);
  } else {
    console.log('✅ Successfully updated thumbnail in Supabase:', data);
  }
}

run().catch(console.error);
