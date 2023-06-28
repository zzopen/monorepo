import nodePath from "node:path";
import nodeProcess from "node:process";
import fse from "fs-extra";
export { fse, nodePath, nodeProcess };
/************************* common ***************************************/
export declare const delay: (ms: number) => Promise<unknown>;
/************************* path ***************************************/
export declare function pathResolve(...paths: string[]): string;
export declare function toCwdAbsolutePath(...paths: string[]): string;
/************************* process ***************************************/
export declare function getProcessCwd(): string;
/************************* file ***************************************/
export declare function pathExists(file: string): Promise<boolean>;
export declare function ensureDir(file: string): Promise<any>;
export declare function removeDir(file: string): Promise<void>;
export declare function removeDirSync(file: string): void;
