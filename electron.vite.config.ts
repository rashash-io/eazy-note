import react from '@vitejs/plugin-react'

import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

//import tailwindcss from './node_modules/@tailwindcss/vite/dist/index.mjs'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@/lib': resolve('src/main/lib'),
        '@shared': resolve('src/shared')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    assetsInclude: 'src/renderer/assets/**',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('src/shared'),
        '@hooks': resolve('src/renderer/src/hooks'),
        '@assets': resolve('src/renderer/src/assets'),
        '@store': resolve('src/renderer/src/store'),
        '@components': resolve('src/renderer/src/components/index.ts'),
        '@mocks': resolve('src/renderer/src/mocks')
      }
    },
    plugins: [react()] //tailwindcss()]
  }
})
