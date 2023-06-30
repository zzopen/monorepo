import {
  toCwdAbsolutePath,
  pathExists,
  exec,
  getRepoQuestionsMappingDirectoryName,
  ensureDir,
  removeDirSync,
  listenerInterrupt,
} from "@/common/index.js";

export async function action(
  questionAlias: string,
  dirPath: string
): Promise<any> {
  const fullPath = dirPath == "." || dirPath == "./" ? toCwdAbsolutePath(dirPath, questionAlias) : toCwdAbsolutePath(dirPath)
  try {
    listenerInterrupt(removeDirSync, fullPath);
    const isExists = await pathExists(fullPath);
    if (isExists) {
      throw new Error("创建失败，路径已存在")
    }

    await ensureDir(fullPath);
    await downloadFieFromGitRepo(questionAlias, fullPath);
  } catch (error) {
    removeDirSync(fullPath);
    return Promise.reject(error);
  }
  
  return { res: null };
}

async function downloadFieFromGitRepo(questionAlias: string, dirPath: string):Promise<any> {
  const repoQuestionMappingDirectoryName =
    getRepoQuestionsMappingDirectoryName(questionAlias);

  const repoPrefix = `https://github.com/type-challenges/type-challenges/blob/main/questions/${repoQuestionMappingDirectoryName}`;

  const files = ["template.ts", "test-cases.ts", "README.zh-CN.md"];
  for (const _file of files) {
    await exec(`fetcher --url="${repoPrefix}/${_file}"`, {
      cwd: dirPath,
    });
  }
}
