import {
  type DownloadOptins,
  fse,
  nodePath,
  axiosStreamInstance,
  toCwdAbsolutePath,
} from "@/common";

export async function downloadFile(options: DownloadOptins): Promise<void> {
  let { downloadUrl, outputPath } = options;
  return await _download(downloadUrl, outputPath);
}

async function _download(input: string, output: string): Promise<void> {
  output = toCwdAbsolutePath(output);
  await fse.ensureDir(nodePath.dirname(output));
  const writer = fse.createWriteStream(output);
  const response = await axiosStreamInstance.get(input);
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}