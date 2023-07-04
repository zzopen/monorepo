import type { Plugin } from '../library'
import { replaceTscAliasPaths } from '../library'

export interface TscAliasPluginOptions {
  outDir?: string[]
}

function tscAlias(options: TscAliasPluginOptions = {}): Plugin {
  const { outDir = [] } = options
  return {
    name: 'rollup-plugin-tsc-alias',
    writeBundle: async () => {
      for (const dir of outDir) {
        await replaceTscAliasPaths({
          resolveFullPaths: true,
          outDir: dir,
        })
      }
    },
  }
}

export { tscAlias }
