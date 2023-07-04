import { rollup, nodeResolve, strip, json, commonjs, typescript, nodeExternals, nodePath, defu } from '../library'
import type { BuildContext } from '../types'
import type { RollupOptions, OutputOptions, PreRenderedChunk, WarningHandlerWithDefault, OutputPluginOption } from '../library'

import { tscAlias } from '../plugins/tscAlias'
import { consoleLog } from '../utils'

const DEFAULT_EXTENSIONS = ['.ts', '.tsx', '.mjs', '.cjs', '.js', '.jsx', '.json']

async function rollupBuild(ctx: BuildContext) {
  const rollupOptions = getRollupOptions(ctx)
  const buildResult = await rollup(rollupOptions)

  const allOutputOptions = rollupOptions.output! as OutputOptions[]
  for (const outputOptions of allOutputOptions) {
    await buildResult.write(outputOptions)
  }
}

function getRollupOptions(ctx: BuildContext): RollupOptions {
  let rollupConfig: RollupOptions = {}

  const getChunkFilename = (chunk: PreRenderedChunk, ext: string) => {
    if (chunk.isDynamicEntry) {
      return `chunks/[name].${ext}`
    }
    // TODO: Find a way to generate human friendly hash for short groups/
    return `shared/${ctx.options.pkgName}.[hash].${ext}`
  }

  /** **************************** input ************************************ */
  const { input } = ctx.options

  /** **************************** output ************************************ */
  const output: OutputOptions[] = []
  const tsAliasOutputDirs: string[] = []
  for (const entry of ctx.options.output) {
    if (!['esm', 'cjs'].includes(entry.format)) {
      continue
    }

    let outputOption: OutputOptions = {
      dir: nodePath.resolve(ctx.options.rootDir, entry.dir),
      entryFileNames: `${entry.name ?? '[name]'}.${entry.ext}`,
      exports: 'auto',
      generatedCode: { constBindings: true },
      externalLiveBindings: false,
      freeze: false,
      sourcemap: true,
    }

    if (entry.format == 'esm') {
      outputOption = defu(outputOption, <OutputOptions>{
        chunkFileNames: (chunk: PreRenderedChunk) => getChunkFilename(chunk, 'mjs'),
        format: 'esm',
      }) as OutputOptions
    }

    if (entry.format == 'cjs') {
      if (!ctx.options.plugin.emitCJS) {
        continue
      }

      outputOption = defu(outputOption, <OutputOptions>{
        chunkFileNames: (chunk: PreRenderedChunk) => getChunkFilename(chunk, 'cjs'),
        format: 'cjs',
        interop: 'compat',
      }) as OutputOptions
    }

    output.push(outputOption)
    tsAliasOutputDirs.push(outputOption.dir!)
  }

  /** **************************** pugins ************************************ */
  const plugins: OutputPluginOption = []
  if (ctx.options.plugin.resolve) {
    plugins.push(
      nodeResolve({
        extensions: DEFAULT_EXTENSIONS,
        ...ctx.options.plugin.resolve,
      })
    )
  }

  if (ctx.options.plugin.json) {
    plugins.push(json(ctx.options.plugin.json))
  }

  if (ctx.options.plugin.commonjs) {
    plugins.push(
      commonjs({
        ...ctx.options.plugin.commonjs,
      })
    )
  }

  if (ctx.options.plugin.typescript) {
    const conf = {
      tsconfig: nodePath.resolve(ctx.rootDir, './tsconfig.json'),
      useTsconfigDeclarationDir: !!ctx.options.declarationDir,
      tsconfigDefaults: {
        compilerOptions: {
          declaration: ctx.options.declaration,
          declarationDir: ctx.options.declarationDir ?? '',
        },
      },
      ...ctx.options.plugin.typescript,
    }

    plugins.push(typescript(conf))
  }

  if (ctx.options.plugin.externals) {
    plugins.push(nodeExternals({ ...ctx.options.plugin.externals }))
  }

  if (ctx.options.plugin.trip) {
    plugins.push(
      strip({
        include: ['src/**/*.(ts|js)'],
        debugger: true,
        functions: ['console.*'],
        labels: [],
        sourceMap: true,
        ...ctx.options.plugin.trip,
      })
    )
  }

  if (ctx.options.declarationDir) {
    tsAliasOutputDirs.push(ctx.options.declarationDir)
  }

  if (true && ctx.options.plugin.tscAlias) {
    plugins.push(
      tscAlias({
        outDir: tsAliasOutputDirs,
        ...ctx.options.plugin.tscAlias,
      })
    )
  }

  /** **************************** onwarn ************************************ */
  const onwarn: WarningHandlerWithDefault = (warning, rollupWarn) => {
    if (!warning.code || !['CIRCULAR_DEPENDENCY'].includes(warning.code)) {
      rollupWarn(warning)
    }
  }

  /** **************************** summary ************************************ */
  rollupConfig = {
    input,
    output,
    plugins,
    onwarn,
  }

  consoleLog('rollup-config:', rollupConfig)

  return rollupConfig
}

export { rollupBuild }
