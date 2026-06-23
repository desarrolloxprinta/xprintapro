const https = require('https');
const url = 'https://xprintapro.com/proyectos/rotulacion-para-rebranding-redeia-red-electrica/';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // Regex simple to extract all headers and paragraphs
    const hRegex = /<h[23][^>]*>(.*?)<\/h[23]>/g;
    const pRegex = /<p[^>]*>(.*?)<\/p>/g;
    
    let match;
    console.log('--- HEADINGS ---');
    while ((match = hRegex.exec(data)) !== null) {
      console.log(match[1].replace(/<[^>]*>?/gm, '').trim());
    }
    
    console.log('--- PARAGRAPHS ---');
    while ((match = pRegex.exec(data)) !== null) {
      const text = match[1].replace(/<[^>]*>?/gm, '').trim();
      if(text.length > 20) console.log(text);
    }
  });
}).on('error', (e) => {
  console.error(e);
});
