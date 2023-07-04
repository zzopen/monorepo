import type {BuildOptions, BuildConfig, BuildContext, ContextEntries} from './types'
import { dumpObject, resolveRootDir, tryRequire, consoleLog, resolveInput,BIN_NAME } from "./utils";
import { defu, prettyBytes,globby, fse, nodePath, chalk,consola, nodeProcess } from './library'
import type {PackageJson} from './library'
import {rollupBuild} from './builder/rollup'

async function build(rootDir: string = '') {
  const ctx = await getCtx(rootDir)
  await rollupBuild(ctx);
  await calulateEntryBytes(ctx)

  consola.log("");
  if (ctx.warnings.size > 0) {
    consola.warn(
      "Build is done with some warnings:\n\n" +
        [...ctx.warnings].map((msg) => "- " + msg).join("\n")
    );
    if (ctx.options.failOnWarn) {
      consola.error(
        "Exiting with code (1). You can change this behavior by setting `failOnWarn: false` ."
      );

      // eslint-disable-next-line unicorn/no-process-exit
      nodeProcess.exit(1);
    }
  }

  // Done info
  consola.success(chalk.green("Build succeeded for " + ctx.options.pkgName));
}

/**
 * 构建Context
 * @param rootDir
 * @returns
 */
async function getCtx(rootDir: string): Promise<BuildContext>{
  // Read Package.json
  const pkg: PackageJson = tryRequire("./package.json", rootDir);
  // Start info
  consola.info(
    chalk.cyan(`Building ${pkg.name} ...`)
  );

  const options = await getContextOptions(rootDir, pkg?.name || '')
  const entries = await getContextEntries(options.outDir)
  const ctx: BuildContext = {
    rootDir,
    pkg,
    options,
    entries,
    warnings: new Set(),
  }

  return ctx
}

/**
 * 构建Context-options
 * @param rootDir
 * @param pkgName
 * @returns
 */
async function getContextOptions(rootDir: string, pkgName: string = '') :Promise<BuildOptions>{
  rootDir = resolveRootDir(rootDir)
  // Read zrp.config.ts or zrp.config.js
  let buildConfig: BuildConfig = tryRequire("./zrp.config", rootDir)

  // console.log(buildConfig)
  consoleLog('build-config:', buildConfig)
  const options = defu(buildConfig, <BuildOptions>{
    input: './src/index.ts',
    outDir: './dist',
    pkgName: (pkgName || "").split("/").pop() || "default", // @xxx/xx, 取后边的名字
    rootDir,
    output: [{format:'esm'}],
    clean: true,
    declaration: false,
    declarationDir: '',
    failOnWarn: true,
    plugin: {
        emitCJS: true,
        trip: {},
        resolve: {
          preferBuiltins: true,
        },
        json: {
          preferConst: true,
        },
        commonjs: {
          ignoreTryCatch: true,
        },
        externals: {},
        typescript: {},
        tscAlias: {}
      }
  }) as BuildOptions

  // handle outputs
  for (const entry of options.output) {
    entry.dir = entry.dir || options.outDir

    if (!['esm', 'cjs'].includes(entry.format)) {
      throw new Error("output item format only support [esm, cjs]: " + dumpObject(entry));
    }

    if (entry.format == 'esm') {
      entry.ext = entry.ext || 'mjs'
    }

    if (entry.format == 'cjs') {
      entry.ext = entry.ext || 'cjs'
    }

    if (!entry.name || typeof entry.name !== "string") {
      entry.name = 'index';
    }

    if (!entry.name) {
      throw new Error("Missing output item name: " + dumpObject(entry));
    }

    if (!entry.format) {
      throw new Error("Missing output item format: " + dumpObject(entry));
    }

    entry.dir = entry.dir || options.outDir
    entry.dir = nodePath.resolve(rootDir, entry.dir)
  }

  options.input = resolveInput(options.input, rootDir)
  options.outDir = nodePath.resolve(rootDir, options.outDir)

  consoleLog('build-options:', options)

  // console log entries
  if (nodeProcess.env.DEBUG) {
    consola.info(`${chalk.bold("Root dir:")} ${options.rootDir}
      ${chalk.bold("Entries:")}
      ${options.output.map((entry) => "  " + dumpObject(entry)).join("\n  ")}
    `);
  }

  // Clean dist dirs
  if (options.clean) {
    for (const dir of new Set(options.output.map((e) => e.dir).sort())) {
      await fse.remove(dir!);
      await fse.ensureDir(dir!);
    }
  }

  return options
}

/**
 * 输出bytes信息
 * @param rootDir
 * @param pkgName
 * @returns
 */
async function getContextEntries(outDir: string): Promise<ContextEntries[]>{
  const entries: ContextEntries[] = []

  const outFiles = await globby("**", { cwd: outDir });
  for (const file of outFiles) {
    let entry = entries.find((e) => e.path === file);
    if (!entry) {
      entry = {
        path: file,
        chunk: true,
      };
      entries.push(entry);
    }
    if (!entry.bytes) {
      const stat = await fse.stat(nodePath.resolve(outDir, file));
      entry.bytes = stat.size;
    }
  }

  return entries
}

async function calulateEntryBytes(ctx: BuildContext) {
  const rPath = (p: string) => {
    return nodePath.relative(nodeProcess.cwd(), nodePath.resolve(ctx.options.outDir, p));
  }

  for (const entry of ctx.entries.filter((e) => !e.chunk)) {
    let totalBytes = entry.bytes || 0;
    for (const chunk of entry.chunks || []) {
      totalBytes += ctx.entries.find((e) => e.path === chunk)?.bytes || 0;
    }
    let line =
      `  ${chalk.bold(rPath(entry.path))} (` +
      [
        totalBytes && `total size: ${chalk.cyan(prettyBytes(totalBytes))}`,
        entry.bytes && `chunk size: ${chalk.cyan(prettyBytes(entry.bytes))}`,
        entry.exports?.length &&
          `exports: ${chalk.gray(entry.exports.join(", "))}`,
      ]
        .filter(Boolean)
        .join(", ") +
      ")";
    if (entry.chunks?.length) {
      line +=
        "\n" +
        entry.chunks
          .map((p) => {
            const chunk =
              ctx.entries.find((e) => e.path === p) || ({} as any);
            return chalk.gray(
              "  └─ " +
                rPath(p) +
                chalk.bold(chunk.bytes ? ` (${prettyBytes(chunk?.bytes)})` : "")
            );
          })
          .join("\n");
    }
    if (entry.modules?.length) {
      line +=
        "\n" +
        entry.modules
          .filter((m) => m.id.includes("node_modules"))
          .sort((a, b) => (b.bytes || 0) - (a.bytes || 0))
          .map((m) => {
            return chalk.gray(
              "  📦 " +
                rPath(m.id) +
                chalk.bold(m.bytes ? ` (${prettyBytes(m.bytes)})` : "")
            );
          })
          .join("\n");
    }
    consola.log(entry.chunk ? chalk.gray(line) : line);
  }
  console.log(
    "Σ Total dist size (byte size):",
    chalk.cyan(
      prettyBytes(ctx.entries.reduce((a, e) => a + (e.bytes || 0), 0))
    )
  );
}

export {build}
