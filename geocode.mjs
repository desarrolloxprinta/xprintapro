import fs from 'fs'

const rawCsv = fs.readFileSync('src/data/raw_puntos.csv', 'utf8')
const lines = rawCsv.split('\n')
const API_KEY = "AIzaSyAI2t5YjVo0PA48446eeMzLwUgRrrSz9sw"

const puntos = []

// Simple CSV parser that handles quotes
function parseCSVLine(text) {
  const re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\s\S][^'\\]*)*)'|"([^"\\]*(?:\\[\s\S][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
  const a = [];
  text.replace(re_value, function(m0, m1, m2, m3) {
      if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
      else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
      else if (m3 !== undefined) a.push(m3);
      return '';
  });
  if (/,\s*$/.test(text)) a.push('');
  return a;
}

async function geocode() {
  console.log("Iniciando geocodificación...")
  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) continue
    
    const cols = parseCSVLine(line)
    
    const title = cols[1] || cols[0] // Nombre Xprinta
    const address = cols[3] // Dirección
    
    if (address && address.length > 5 && title) {
      try {
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`)
        const data = await res.json()
        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry.location
          puntos.push({ title, lat: location.lat, lng: location.lng })
          console.log(`✅ [${i}/${lines.length}] Geocoded: ${title}`)
        } else {
          console.log(`❌ [${i}/${lines.length}] No results for: ${title} - ${address}`)
        }
      } catch (e) {
        console.error(`⚠️ Error geocoding ${title}`, e)
      }
      
      // Delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 100))
    }
  }
  
  fs.writeFileSync('src/data/puntos.json', JSON.stringify(puntos, null, 2))
  console.log(`Finished writing ${puntos.length} puntos.`)
}

geocode()
