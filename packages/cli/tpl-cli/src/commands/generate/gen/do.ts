import {
  getSpecTplDir,
  isExistsPath,
  pathResolve,
  copy,
  toCwdAbsolutePath,
  delay
} from "@/common/index.js";

export async function gen(projectName: string, projectPath: string, tplName: string): Promise<any> {
  const _projectPath = pathResolve(toCwdAbsolutePath(projectPath), projectName);
  const _tplPath = getSpecTplDir(tplName)
  if (isExistsPath(_projectPath)) {
    return Promise.reject('路径已存在')
  }

  copy(_tplPath, _projectPath);
  await delay(500)
  return true
}