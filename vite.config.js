import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        redeia: resolve(__dirname, 'proyecto-redeia.html'),
        ahorroCostes: resolve(__dirname, 'ahorro-costes.html'),
        ecosign: resolve(__dirname, 'ecosign.html'),
        financiacion: resolve(__dirname, 'financiacion.html'),
        garantia: resolve(__dirname, 'garantia.html'),
        gestionProyectos: resolve(__dirname, 'gestion-proyectos.html'),
        legalizacion: resolve(__dirname, 'legalizacion.html'),
        proveedorUnificado: resolve(__dirname, 'proveedor-unificado.html'),
        proyectoPic: resolve(__dirname, 'proyecto-pic.html'),
        redProfesional: resolve(__dirname, 'red-profesional.html'),
        trazabilidadProducto: resolve(__dirname, 'trazabilidad-producto.html'),
      },
    },
  },
})
