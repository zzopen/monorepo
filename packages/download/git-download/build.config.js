import { defineBuildConfig } from 'unbuild'
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineBuildConfig({
    entries: [
      {
        input: 'src/index',
        outDir: './dist',
        format:'esm',
        ext: 'mjs'
      },
      {
        input: 'src/index',
        outDir: './dist',
        format:'cjs',
        ext: 'cjs'
      }
    ],
    alias:  {'@': path.resolve(__dirname, 'src/')},
    declaration: true,
    clean: true,
    rollup: {
      emitCJS: true,
      inlineDependencies: true,
      esbuild: {minify: true}
    }
})
