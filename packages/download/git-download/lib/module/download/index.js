import { fse, nodePath, toCwdAbsolutePath, ensureDir } from "../../common/index.js";
import { getRepoContents, streamHttp } from "../../http/index.js";
export async function download(conf) {
    const { repo, owner, path, ouputPath = "." } = conf;
    const files = await getAllFilePath({ repo, owner, path });
    console.log("files:", files);
    await downloadFiles(files, ouputPath);
}
async function getAllFilePath(conf) {
    const { repo, owner, path } = conf;
    const files = [];
    // 递归处理路径，聚合所有的文件路径
    const recursion = async (dirs) => {
        for (const dir of dirs) {
            const { data } = await getRepoContents({ repo, owner, path: dir });
            if (Array.isArray(data)) {
                const dirPaths = [];
                for (const item of data) {
                    if (item.type == "dir") {
                        dirPaths.push(item.path);
                    }
                    else if (item.type == "file") {
                        files.push({
                            path: item.path,
                            download_url: item.download_url,
                        });
                    }
                }
                await recursion(dirPaths);
            }
            else if (data.type) {
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
async function downloadFiles(paths, outputPath) {
    console.log("outputPath:", outputPath);
    outputPath = toCwdAbsolutePath(outputPath);
    console.log("outputPath:", outputPath);
    for (const item of paths) {
        await downloadFile(item.download_url, `${outputPath}/${item.path}`);
    }
}
async function downloadFile(inputPath, outputPath) {
    console.log("inputPath:", inputPath, ";outputPath:", outputPath);
    const dirPath = nodePath.dirname(outputPath);
    await ensureDir(dirPath);
    const writer = fse.createWriteStream(outputPath);
    const response = await streamHttp.get(inputPath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", (error) => {
            console.log("error:", error);
        });
    });
}
//# sourceMappingURL=index.js.map