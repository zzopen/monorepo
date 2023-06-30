import { defineConfig } from 'rollup'

import nodeResolve from '@rollup/plugin-node-resolve'
import strip from '@rollup/plugin-strip'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import nodeExternals from 'rollup-plugin-node-externals'
import { replaceTscAliasPaths } from 'tsc-alias'

/** 专门用来转换.ts和.d.ts文件中的别名路径为相对路径 */
const tscAlias = () => {
  return {
    name: 'rollup-plugin-tsc-alias',
    writeBundle: async () => {
      const outDirs = ['./dist/esm', './dist/cjs', './dist/types']
      for (const dir of outDirs) {
        await replaceTscAliasPaths({
          resolveFullPaths: true,
          outDir: dir,
        })
      }
    },
  }
}

const config = defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        entryFileNames: '[name].mjs',
      },
      {
        dir: 'dist/cjs',
        format: 'cjs',
        entryFileNames: '[name].cjs',
      },
    ],
    plugins: [
      // strip({
      //   include: ['src/**/*.(ts|js)'],
      //   debugger: true,
      //   functions: ['console.*'],
      //   labels: [],
      //   sourceMap: true,
      // }),
      json(),
      nodeResolve(),
      commonjs(),
      nodeExternals(),
      typescript({
        tsconfig: './tsconfig.json',
        useTsconfigDeclarationDir: true,
        tsconfigDefaults: {
          compilerOptions: {
            declaration: true,
            declarationDir: './dist/types',
          },
        },
      }),
      tscAlias(),
    ],
  },
])

export default config
