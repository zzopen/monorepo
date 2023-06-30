import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import child_process, { type ExecException } from "node:child_process";

import ora from "ora";
import chalk from "chalk";
import fse from "fs-extra";

import {PACKAGE_JSON_PATH} from '@/path.js'
import {ALL_QUESTIONS} from './questions.js'

/************************* common ***************************************/
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export function consoleDebug(...args: any[]) {
  console.debug(chalk.white(...args));
}

export function consoleSuccess(...args: any[]) {
  console.info(chalk.green(...args));
}

export function consoleError(...args: any[]) {
   console.error(chalk.red(...args));
}
/************************* package.json ***************************************/
export const PACKAGE_JSON_DATA = getPackageJson()
export const BIN_NAME = Object.keys(PACKAGE_JSON_DATA['bin'])[0]

export function getPackageJson() {
  return JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf-8"));
}

/************************* path ***************************************/

export function pathResolve(...paths: string[]) {
  return path.resolve(...paths);
}

export function toCwdAbsolutePath(...paths: string[]) {
  return pathResolve(getProcessCwd(), ...paths);
}

/************************* file ***************************************/
export async function pathExists(file: string): Promise<boolean> {
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
/************************* process ***************************************/
export function getProcessCwd() {
  return process.cwd();
}

export function exit(msg:string, code: number = -1) {
  consoleError(msg);
  process.exit(code);
}

export async function exec(command: string, options: any):Promise<any> {
  return new Promise((resolve, reject) => {
    let result: {
      code: Number;
      signal: NodeJS.Signals | null;
      stdout: string | Buffer | null;
      stderr: string | Buffer | null;
    } = {
      code: 0,
      signal: null,
      stdout: null,
      stderr: null
    };
    const cpe = child_process.exec(
      command,
      options,
      (
        err: ExecException | null,
        stdout: string | Buffer,
        stderr: string | Buffer
      ) => {
        if (err) {
          reject(err);
          return;
        }

        result.stdout = stdout;
        result.stderr = stderr;
        if ("code" in result) {
          resolve(result);
        }
        resolve(true);
      }
    );

    cpe.on("exit", (code: number, signal: NodeJS.Signals) => {
      result.code = code;
      result.signal = signal;
      if ("stdout" in result) {
        resolve(result);
      }
    });
  });
}

export function listenerInterrupt(fn: any, ...args: any[]){
     process.on("SIGINT", async () => {
       await fn(...args);
       process.exit();
     });  
}
/************************* beautify ***************************************/

export async function wrapLoading(params: {
    fn: (...params: any[])=>Promise<any>
    fnParams: any
    successTip: string
    failTip: string
}):Promise<any> {
    const {fn,fnParams,successTip,failTip} = params;
    const spinner = ora("loading ...");
    spinner.start();
    try {
        const res = await fn(...fnParams);
        spinner.succeed("loading success ...");
        if (successTip) consoleSuccess(successTip);
        return res;
    } catch (error) {
        spinner.fail("loading fail ...");
        return Promise.reject(error);
    }
}

/************************* business ***************************************/

/**
 * 获取 type-challenges git repo question目录下对应的文件路径
 * @param name
 * @returns
 */
export function getRepoQuestionsMappingDirectoryName(name:string): string {
  return ALL_QUESTIONS[`${name}`] ?? "";
}