import { defineBuildConfig } from 'unbuild'
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineBuildConfig({
    entries: [
      {
        input: 'src/index',
        outDir: './dist/esm',
        format:'esm',
        name: 'index',
        ext: 'js',
        declaration: true
      },
      {
        input: 'src/index',
        outDir: './dist/cjs',
        format:'cjs',
        name: 'index',
        ext: 'cjs',
        declaration: true
      }
    ],
    alias:  {'@': path.resolve(__dirname, 'src/')},
    declaration: true,
    clean: true,
    rollup: {
      emitCJS: true,
      inlineDependencies: true,
    },
    externals: ['axios','fs-extra'],

})
