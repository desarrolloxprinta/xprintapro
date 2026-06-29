import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ahorroCostes: resolve(__dirname, 'ahorro-costes.html'),
        brandcare: resolve(__dirname, 'brandcare.html'),
        brandcenter: resolve(__dirname, 'brandcenter.html'),
        brandcheck: resolve(__dirname, 'brandcheck.html'),
        brandcommerce: resolve(__dirname, 'brandcommerce.html'),
        brandguide: resolve(__dirname, 'brandguide.html'),
        brandlegal: resolve(__dirname, 'brandlegal.html'),
        brandsignal: resolve(__dirname, 'brandsignal.html'),
        brandsurveys: resolve(__dirname, 'brandsurveys.html'),
        brandtools: resolve(__dirname, 'brandtools.html'),
        brandvision: resolve(__dirname, 'brandvision.html'),
        ecosign: resolve(__dirname, 'ecosign.html'),
        equipo: resolve(__dirname, 'equipo.html'),
        faq: resolve(__dirname, 'faq.html'),
        financiacion: resolve(__dirname, 'financiacion.html'),
        garantia: resolve(__dirname, 'garantia.html'),
        gestionProyectos: resolve(__dirname, 'gestion-proyectos.html'),
        legalizacion: resolve(__dirname, 'legalizacion.html'),
        nosotros: resolve(__dirname, 'nosotros.html'),
        proveedorUnificado: resolve(__dirname, 'proveedor-unificado.html'),
        proyectoArval: resolve(__dirname, 'proyecto-arval.html'),
        proyectoPic: resolve(__dirname, 'proyecto-pic.html'),
        proyectoRedeia: resolve(__dirname, 'proyecto-redeia.html'),
        proyectos: resolve(__dirname, 'proyectos.html'),
        redProfesional: resolve(__dirname, 'red-profesional.html'),
        redXprinta: resolve(__dirname, 'red-xprinta.html'),
        servicios: resolve(__dirname, 'servicios.html'),
        sistemaXprinta: resolve(__dirname, 'sistema-xprinta.html'),
        trazabilidadProducto: resolve(__dirname, 'trazabilidad-producto.html'),
        areaTecnicaPost: resolve(__dirname, 'area-tecnica-post.html'),
        areaTecnica: resolve(__dirname, 'area-tecnica.html'),
      },
    },
  },
})
