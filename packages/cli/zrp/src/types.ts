import type {
  PackageJson,
  InputOption,
  RollupNodeResolveOptions,
  RollupJsonOptions,
  RPT2Options,
  ExternalsOptions,
  RollupStripOptions,
  commonjs,
} from './library'
import type { TscAliasPluginOptions } from './plugins/tscAlias'

type RollupCommonJSOptions = Parameters<typeof commonjs>[0] & {}
type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }

/** ************** build.config.ts start *************** */
interface OutputOption {
  format: 'esm' | 'cjs'
  dir: string
  name: string
  ext: 'cjs' | 'mjs' | 'js'
}

type BuildConfig = DeepPartial<BuildOptions>

/** ************** build.config.ts end *************** */
interface BuildOptions {
  output: OutputOption[]
  input: InputOption
  outDir: string
  rootDir: string
  pkgName: string
  clean: boolean
  declaration: boolean
  declarationDir: string
  failOnWarn?: boolean
  plugin: BuildPlugin
}

interface BuildPlugin {
  emitCJS?: boolean
  resolve: RollupNodeResolveOptions | false
  json: RollupJsonOptions | false
  commonjs: RollupCommonJSOptions | false
  externals: ExternalsOptions | false
  trip: RollupStripOptions | false
  typescript: RPT2Options | false
  tscAlias: TscAliasPluginOptions | false
}

interface ContextEntries {
  path: string
  bytes?: number
  exports?: string[]
  chunks?: string[]
  chunk?: boolean
  modules?: { id: string; bytes: number }[]
}

interface BuildContext {
  rootDir: string
  options: BuildOptions
  pkg: PackageJson
  entries: ContextEntries[]
  warnings: Set<string>
}

export type { BuildContext, BuildPlugin, BuildOptions, BuildConfig, ContextEntries, InputOption }
