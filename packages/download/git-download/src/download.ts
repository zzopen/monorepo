import { fse, nodePath, toCwdAbsolutePath, ensureDir } from "@/common";
import type { DownloadConfig, GitRepoConfig, GitFile } from "@/common";
import { getRepoContents } from "@/http";
import { downloadFile } from '@zzopen/download-file';

async function download(conf: DownloadConfig): Promise<void> {
  const { repo, owner, path, ouputPath = "." } = conf;
  const files = await getAllFilePath({ repo, owner, path });
  await downloadFiles(files, ouputPath);
}

async function getAllFilePath(conf: GitRepoConfig): Promise<GitFile[]> {
  const { repo, owner, path } = conf;
  const files: GitFile[] = [];

  // 递归处理路径，聚合所有的文件路径
  const recursion = async (dirs: string[]) => {
    for (const dir of dirs) {
      const { data } = await getRepoContents({ repo, owner, path: dir });
      if (Array.isArray(data)) {
        const dirPaths: string[] = [];
        for (const item of data) {
          if (item.type == "dir") {
            dirPaths.push(item.path);
          } else if (item.type == "file") {
            files.push({
              path: item.path,
              download_url: item.download_url,
            });
          }
        }

        await recursion(dirPaths);
      } else if (data.type) {
        if (data.type == "file") {
          files.push({
            path: data.path,
            download_url: data.download_url,
          });
        }
      }
    }
  };

  await recursion([path]);
  return files;
}

async function downloadFiles(paths: GitFile[], outputPath: string) {
  console.log("outputPath:", outputPath);
  outputPath = toCwdAbsolutePath(outputPath);
  for (const item of paths) {
    const conf = {downloadUrl: item.download_url, outputPath:`${outputPath}/${item.path}`}
    await downloadFile(conf);
  }
}

export {download}
