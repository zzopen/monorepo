import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import {PACKAGE_JSON_PATH, TEMPLATES_DIR_PATH} from '@/path.js'

import {
  EXT_REGEXP,
  SFC_REGEXP,
  STYLE_REGEXP,
  SCRIPT_REGEXP,
  JSX_REGEXP,
  camelizeRE,
} from "./constants.js";

import type { NodeEnv, ModuleEnv, BuildTarget } from "./types.js";

import ora from "ora";
/************************* common ***************************************/
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/************************* file ***************************************/
export function getPackageJson() {
  return JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf-8"));
}

export const packageJson = getPackageJson();

export function copy(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

export function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = pathResolve(srcDir, file);
    const destFile = pathResolve(destDir, file);
    copy(srcFile, destFile);
  }
}

export const isDir = (dir: string) => fs.lstatSync(dir).isDirectory();
export const isSfc = (path: string) => SFC_REGEXP.test(path);
export const isStyle = (path: string) => STYLE_REGEXP.test(path);
export const isScript = (path: string) => SCRIPT_REGEXP.test(path);
export const isJsx = (path: string) => JSX_REGEXP.test(path);

export function removeExt(path: string) {
  return path.replace(".js", "");
}

export function replaceExt(path: string, ext: string) {
  return path.replace(EXT_REGEXP, ext);
}

export function isExistsPath(path: string) {
    return fs.existsSync(path)
//   const files = fs.readdirSync(path);
//   return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

export function pathResolve(...paths: string[]) {
  return path.resolve(...paths);
}

export function clearDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  
  for (const file of fs.readdirSync(dir)) {
    fs.rmSync(pathResolve(dir, file), { recursive: true, force: true });
  }
}

export function getSpecTplDir(template: string) {
  return pathResolve(TEMPLATES_DIR_PATH, `./${template}`);
}

export function toCwdAbsolutePath(_path: string){
    return pathResolve(getProcessCwd(), _path);
}

/************************* process ***************************************/
export function setCliVersion(value: string) {
  process.env.VCLI_VERSION = value;
}

export function setNodeEnv(value: NodeEnv) {
  process.env.NODE_ENV = value;
}

export function setModuleEnv(value: ModuleEnv) {
  process.env.BABEL_MODULE = value;
}

export function setBuildTarget(value: BuildTarget) {
  process.env.BUILD_TARGET = value;
}

export function isDev() {
  return process.env.NODE_ENV === "development";
}

export function getProcessCwd() {
  return process.cwd();
}

export function exit(msg: string, code: number = -1) {
  console.error("exit:", msg);
  process.exit(code);
}

/************************* draft start ***************************************/
export function hasDefaultExport(code: string) {
  return code.includes("export default") || code.includes("export { default }");
}

export function camelize(str: string): string {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}

export function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, "");
}

/************************* draft end ***************************************/

/************************* beautify ***************************************/

export async function wrapLoading(fn: Function, message: string, ...args: any):Promise<any> {
    const spinner = ora(message);
    spinner.start();
    try {
        const result = await fn(...args);
        spinner.succeed();
        return result;
    } catch (error) {
        spinner.fail("执行失败: "+ error);
    }
}