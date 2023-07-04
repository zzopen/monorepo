import {nodePath, createFilter, FilterPattern, transform, Format} from '../../packages/cli/zrp/src/library'
import type { Plugin, PluginContext, InternalModuleFormat,Loader,TransformResult,TransformOptions } from '../../packages/cli/zrp/src/library'
import { minify, getRenderChunk } from './minify'

const defaultLoaders: { [ext: string]: Loader } = {
  ".ts": "ts",
  ".js": "js",
  ".tsx": "tsx",
  ".jsx": "jsx",
};

export interface EsbuildTransformOptions {
  /** alias to `sourcemap` */
  sourceMap?: boolean;
  include?: FilterPattern;
  exclude?: FilterPattern;
   /**
   * Use this tsconfig file instead
   * Disable it by setting to `false`
   */
  tsconfig?: string | false;

  /**
   * Map extension to esbuild loader
   * Note that each entry (the extension) needs to start with a dot
   */
  loaders?: {
    [ext: string]: Loader | false;
  };

  minify?: boolean
  target?: string
}

function getLoaders(optionLoaders: {[ext: string]: Loader | false} | undefined){
  const loaders = {
    ...defaultLoaders,
  };

  if (optionLoaders) {
    for (const key of Object.keys(optionLoaders)) {
      const value = optionLoaders[key];
      if (typeof value === "string") {
        loaders[key] = value;
      } else if (value === false) {
        delete loaders[key];
      }
    }
  }

  return loaders
}

function printWarnings(
  id: string,
  result: TransformResult,
  plugin: PluginContext
) {
  if (result.warnings) {
    for (const warning of result.warnings) {
      let message = "[esbuild]";
      if (warning.location) {
        message += ` (${nodePath.relative(process.cwd(), id)}:${warning.location.line}:${
          warning.location.column
        })`;
      }
      message += ` ${warning.text}`;
      plugin.warn(message);
    }
  }
}

const getEsbuildFormat = (
  rollupFormat: InternalModuleFormat
): Format | undefined => {
  if (rollupFormat === 'es') {
    return 'esm'
  }
  if (rollupFormat === 'cjs') {
    return rollupFormat
  }
}

export function esbuild(options: EsbuildTransformOptions = {}): Plugin {
  const loaders = getLoaders(options.loaders)
  const extensions: string[] = Object.keys(loaders)
  const INCLUDE_REGEXP = new RegExp(
    `\\.(${extensions.map((ext) => ext.slice(1)).join('|')})$`
  )
  const EXCLUDE_REGEXP = /node_modules/
  const filter = createFilter(
      options.include || INCLUDE_REGEXP,
      options.exclude || EXCLUDE_REGEXP
    )

  return {
    name: "esbuild",
    async transform(code, id) {
      if (!filter(id)) {
        return null;
      }

      const ext = nodePath.extname(id)
      const loader = loaders[ext]

      if (!loader) {
        return null
      }

      const result = await transform(code, {
        loader,
        sourcefile: id,
        sourcemap: !!options.sourceMap
      });

      // if (id == '/Users/xulei/jungle/githubproject/my/monorepo/packages/cli/zrp/src/build.ts') {
      //   console.log(loader)
      //   console.log('result:', result)
      // }


      printWarnings(id, result, this);

      return (
        result.code && {
          code: result.code,
          map: result.map || null,
        }
      )
    },
    async renderChunk(code, { fileName }) {
      console.log(fileName)
      if (options.minify && !fileName.endsWith(".d.ts")) {
        const result = await transform(code, {
          loader: "js",
          minify: true,
          target: options.target,
        });
        if (result.code) {
          return {
            code: result.code,
            map: result.map || null,
          };
        }
      }
      return null;
    },
  }
}
