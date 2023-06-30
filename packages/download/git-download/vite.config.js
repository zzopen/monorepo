import {defineConfig} from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve:{
    alias:{
      '@':path.resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'index',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
         if (format == 'cjs') {
           return `index.${format}.cjs`
         }

        return `index.${format}.js`
      }
    },
    rollupOptions: {
      external: ['axios', 'fs-extra'],
       output: {
        globals: {
          axios: 'axios',
          fse: 'fs-extra'
        },
      },
    }
  },
  plugins: [
    // nodePolyfills({
    //   globals: {
    //     process: true,
    //     path: true,
    //     fs: true,
    //   },
    //   protocolImports: true,
    // }),
  ],
})
