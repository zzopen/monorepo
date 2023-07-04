export default {
  input: './src/index.ts',
  outDir: './dist2',
  declaration: true,
  // declarationDir: './dist/types1',
  output: [
    {
      // dir: 'dist/esm',
      format: 'esm',
      ext: 'mjs'
    },
    {
      // dir: 'dist/cjs',
      format: 'cjs',
      ext: 'cjs'
    }
  ]
}
