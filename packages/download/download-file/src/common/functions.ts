import { nodeProcess, nodePath } from "./modules";

export function getProcessCwd() {
  return nodeProcess.cwd();
}

export function pathResolve(...paths: string[]) {
  return nodePath.resolve(...paths);
}

export function toCwdAbsolutePath(...paths: string[]) {
  return pathResolve(getProcessCwd(), ...paths);
}