import nodePath from "node:path";
import nodeProcess from "node:process";
import fse from "fs-extra";
export { fse, nodePath, nodeProcess };
/************************* common ***************************************/
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/************************* path ***************************************/

export function pathResolve(...paths: string[]) {
  return nodePath.resolve(...paths);
}

export function toCwdAbsolutePath(...paths: string[]) {
  return pathResolve(getProcessCwd(), ...paths);
}

/************************* process ***************************************/
export function getProcessCwd() {
  return nodeProcess.cwd();
}

/************************* file ***************************************/
export async function pathExists(file: string): Promise<boolean> {
    fse.createWriteStream
  return await fse.pathExists(file);
}

export async function ensureDir(file: string): Promise<any> {
  return await fse.ensureDir(file, {
    mode: 0o2775,
  });
}

export async function removeDir(file: string) {
  return await fse.remove(file);
}

export function removeDirSync(file: string) {
  fse.removeSync(file);
}

export const isDir = (path: string) => fse.lstatSync(path).isDirectory();
export const isFile = (path: string) => fse.lstatSync(path).isFile();

export function getUrlLast(path: string) {
  const url = new URL(path);
  const pathname = url.pathname;
  const index = pathname.lastIndexOf("/");
  return -1 !== index ? pathname.substring(index + 1) : pathname;
}