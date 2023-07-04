import {nodePath, nodeProcess, nodeUrl, fse, jiti, consola} from './library'
import type {InputOption} from './library'
import type { BuildConfig, BuildContext} from './types'

const PROJECT_PATH = nodeUrl.fileURLToPath(new URL("../", import.meta.url))
const PACKAGE_JSON_PATH = nodePath.resolve(PROJECT_PATH, './package.json')

function getPackageJson() {
  return JSON.parse(fse.readFileSync(PACKAGE_JSON_PATH, "utf-8"));
}

const PACKAGE_JSON_DATA = getPackageJson()
const BIN_NAME = Object.keys(PACKAGE_JSON_DATA['bin'])[0]

function resolveRootDir(rootDir: string = ''){
  return nodePath.resolve(nodeProcess.cwd(), rootDir || "." || "./");
}

function resolveInput(input: InputOption, rootDir:string = ''): InputOption{
  if (!input) {
    throw new Error('input must be exists')
  }

  rootDir = resolveRootDir(rootDir)
  if (typeof input == 'string') {
    return nodePath.resolve(rootDir, input)
  }

  if (Array.isArray(input)) {
      return input.map((item) => {
          return nodePath.resolve(rootDir, item)
      })
  }

  if (typeof input == 'object') {
    const newInput:InputOption = {}
    Object.keys(input).map((k) => {
        newInput[k] = nodePath.resolve(rootDir, input[k])
    })

    return newInput
  }

  throw new Error('not support input type')
}

function tryRequire(id: string, rootDir: string = nodeProcess.cwd()) {
  const jitiFn = jiti(rootDir, { interopDefault: true, esmResolve: true });
  try {
    return jitiFn(id);
  } catch (error: any) {
    if (error.code !== "MODULE_NOT_FOUND") {
      console.error(`Error trying import ${id} from ${rootDir}`, error);
    }
    return {};
  }
}

function tryResolve(id: string, rootDir: string = process.cwd()) {
  const jitiFn = jiti(rootDir, { interopDefault: true, esmResolve: true });
  try {
    return jitiFn.resolve(id);
  } catch (error: any) {
    if (error.code !== "MODULE_NOT_FOUND") {
      console.error(`Error trying import ${id} from ${rootDir}`, error);
    }
    return id;
  }
}

function dumpObject(obj: Record<string, any>) {
  return (
    "{ " +
    Object.keys(obj)
      .map((key) => `${key}: ${JSON.stringify(obj[key])}`)
      .join(", ") +
    " }"
  );
}

function warn(ctx: BuildContext, message: string) {
  if (ctx.warnings.has(message)) {
    return;
  }
  consola.debug(`[${BIN_NAME}] [warn]`, message);
  ctx.warnings.add(message);
}

// function listRecursively(path: string) {
//   const filenames = new Set<string>();
//   const walk = (path: string) => {
//     const files = readdirSync(path);
//     for (const file of files) {
//       const fullPath = resolve(path, file);
//       if (statSync(fullPath).isDirectory()) {
//         filenames.add(fullPath + "/");
//         walk(fullPath);
//       } else {
//         filenames.add(fullPath);
//       }
//     }
//   };
//   walk(path);
//   return [...filenames];
// }


function consoleLog(msg:string, ...msgs: any[]){
  if (nodeProcess.env.DEBUG) {
    console.log(`${msg}:`, ...msgs)
  }
}

function defineBuildConfig(config: BuildConfig): BuildConfig {
  return config;
}

export {
  defineBuildConfig,
  resolveRootDir,
  tryRequire,
  tryResolve,
  dumpObject,
  resolveInput,
  consoleLog,
  PACKAGE_JSON_DATA,
  BIN_NAME
}
