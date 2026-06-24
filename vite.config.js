import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        redeia: resolve(__dirname, 'proyecto-redeia.html'),
        diagnostic: resolve(__dirname, 'diagnostic.html'),
      },
    },
  },
})
