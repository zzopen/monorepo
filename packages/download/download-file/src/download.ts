import { type DownloadOptins, fse, nodePath, axiosStreamInstance, toCwdAbsolutePath } from '@/common'

async function download(input: string, output: string): Promise<void> {
  const nOutput = toCwdAbsolutePath(output)
  await fse.ensureDir(nodePath.dirname(nOutput))
  const writer = fse.createWriteStream(nOutput)
  const response = await axiosStreamInstance.get(input)
  response.data.pipe(writer)
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

async function downloadFile(options: DownloadOptins): Promise<void> {
  const { downloadUrl, outputPath } = options
  return download(downloadUrl, outputPath)
}

export { downloadFile }
