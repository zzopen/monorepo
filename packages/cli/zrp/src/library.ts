import nodePath from 'node:path'
import nodeProcess from 'node:process'
import nodeUrl from 'node:url'

import fse from 'fs-extra'
import jiti from 'jiti'
import chalk from 'chalk'
import prettyBytes from 'pretty-bytes'

import { nodeResolve } from '@rollup/plugin-node-resolve'

import strip from '@rollup/plugin-strip'

import json from '@rollup/plugin-json'

import commonjs from '@rollup/plugin-commonjs'

import typescript from 'rollup-plugin-typescript2'

// import dts from "rollup-plugin-dts";
// export {dts}
// export type { Options as RollupDtsOptions } from "rollup-plugin-dts";

import nodeExternals from 'rollup-plugin-node-externals'

export { nodePath, nodeProcess, nodeUrl }
export { fse, jiti, chalk, prettyBytes }

export { consola } from 'consola'
export { globby } from 'globby'
export { defu } from 'defu'
export type { PackageJson } from 'pkg-types'
export { rollup, defineConfig } from 'rollup'
export type {
  RollupOptions,
  OutputOptions,
  PreRenderedChunk,
  WarningHandlerWithDefault,
  OutputPluginOption,
  Plugin,
  InputOption,
  PluginContext,
  InternalModuleFormat,
} from 'rollup'
export type { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve'
export type { RollupStripOptions } from '@rollup/plugin-strip'
export type { RollupJsonOptions } from '@rollup/plugin-json'
export type { RPT2Options } from 'rollup-plugin-typescript2'
export type { ExternalsOptions } from 'rollup-plugin-node-externals'

export { replaceTscAliasPaths } from 'tsc-alias'

export { nodeResolve, strip, json, commonjs, typescript, nodeExternals }
export { createFilter, FilterPattern } from '@rollup/pluginutils'
export { transform, formatMessages } from 'esbuild'
export type { Loader, TransformResult, CommonOptions, TransformOptions, Format, Message } from 'esbuild'
