import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '..', 'src', 'data', 'area-tecnica.json');
const txtPath = path.join(__dirname, '..', 'public', 'area tecnica', 'facility management y senaletica.txt');

const rawText = fs.readFileSync(txtPath, 'utf8').split('\n').map(l => l.trim()).filter(l => l.length > 0);

const title = rawText[0];
const slug = 'facility-management-y-senaletica';

// Parse sections
let sections = [];
let currentSection = null;

const headings = [
  "Introducción",
  "Respuesta rápida",
  "Por qué la señalética es importante en facility management",
  "Señalética interior: orientación, seguridad y experiencia de usuario",
  "Orientación y wayfinding",
  "Seguridad, PRL y evacuación",
  "Oficinas híbridas y espacios cambiantes",
  "Señalética exterior y rótulos: visibilidad, accesos e imagen del activo",
  "El problema habitual: señalética sin inventario ni mantenimiento",
  "Qué debe tener en cuenta una empresa antes de actuar",
  "Cómo puede ayudarte Xprinta",
  "Servicio recomendado para solucionar este problema",
  "Conclusión",
  "Espacio para recomendar proyecto",
  "Preguntas SEO/GEO respondidas",
  "Bloque técnico SEO"
];

for (let i = 1; i < rawText.length; i++) {
  const line = rawText[i];
  if (headings.includes(line) || (line.startsWith('¿') && line.endsWith('?'))) {
    if (currentSection) {
      sections.push(currentSection);
    }
    currentSection = {
      id: line.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''),
      title: line,
      content: ''
    };
  } else {
    if (currentSection) {
      if (line.startsWith('- ') || line.match(/^\d+\./)) {
         currentSection.content += `<li>${line.substring(2)}</li>`;
      } else {
         currentSection.content += `<p>${line}</p>`;
      }
    }
  }
}
if (currentSection) {
  sections.push(currentSection);
}

// Clean up lists (wrap contiguous <li> in <ul>)
sections = sections.map(sec => {
  let content = sec.content;
  content = content.replace(/(<li>.*?<\/li>)+/g, match => `<ul>${match}</ul>`);
  return { ...sec, content };
});


const newPost = {
  slug: slug,
  title: title,
  category: "Facility Management",
  date: "2024-03-20",
  author: "Equipo Xprinta",
  heroVideo: "",
  audioUrl: "/area tecnica/Señalética_estratégica_para_edificios_seguros_y_rentables.m4a",
  pdfUrl: "/area tecnica/facility management y senaletica.pdf",
  sections: sections
};

const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Only add if not exists
const existingIndex = jsonData.findIndex(p => p.slug === slug);
if (existingIndex > -1) {
  jsonData[existingIndex] = newPost;
} else {
  jsonData.push(newPost);
}

fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));
console.log('Successfully updated area-tecnica.json');
