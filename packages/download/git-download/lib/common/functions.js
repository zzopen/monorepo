import nodePath from "node:path";
import nodeProcess from "node:process";
import fse from "fs-extra";
export { fse, nodePath, nodeProcess };
/************************* common ***************************************/
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
/************************* path ***************************************/
export function pathResolve(...paths) {
    return nodePath.resolve(...paths);
}
export function toCwdAbsolutePath(...paths) {
    return pathResolve(getProcessCwd(), ...paths);
}
/************************* process ***************************************/
export function getProcessCwd() {
    return nodeProcess.cwd();
}
/************************* file ***************************************/
export async function pathExists(file) {
    fse.createWriteStream;
    return await fse.pathExists(file);
}
export async function ensureDir(file) {
    return await fse.ensureDir(file, {
        mode: 0o2775,
    });
}
export async function removeDir(file) {
    return await fse.remove(file);
}
export function removeDirSync(file) {
    fse.removeSync(file);
}
//# sourceMappingURL=functions.js.map