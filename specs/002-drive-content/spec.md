# Spec 002: Integración de Contenido Dinámico (Data Layer)

## Meta y Resumen
Establecer un puente o "conexión" para que agentes externos puedan inyectar contenido desde Google Drive al diseño frontend de Xprinta Pro, sin riesgo de alterar el código estructural de la web ni los estilos de la Constitución.

## Historias de Usuario
1. Como Agente Redactor, quiero poder actualizar los textos e imágenes de la web simplemente modificando un archivo JSON estándar.
2. Como Desarrollador/Agente Frontend, quiero que la interfaz gráfica cargue automáticamente la estructura de cuadrícula ("Sectores", "Servicios", etc.) a partir de un archivo JSON que actúe como Data Layer.

## Criterios de Aceptación
- Existe un archivo `src/data/content.json` que contiene el esquema de los datos de la Home (Hero, Sectores, Proyectos, Footer).
- El archivo `src/main.js` importa dinámicamente o lee los datos de este JSON y renderiza el DOM usando literales de plantilla.
- No existe texto duro (hardcoded content) en el renderizado principal de los componentes (Sectores, Hero), todo proviene del Data Layer.
