import { type DownloadConfig, ensureDir } from "@common/index.js";
import { download } from "@module/index.js";
import fs from 'node:fs'
import axios from "axios";
const conf: DownloadConfig = {
  owner: "xulei131401",
  repo: "rule-lint",
  path: "packages/eslint-config/src",
  ouputPath: './example'
};

download(conf);
// await downloadFile()
// async function downloadFile() {
//   const writer = fs.createWriteStream('./aaa/aaa.txt');
//   const response = await axios.create({responseType: 'stream'}).get(
//     "https://raw.githubusercontent.com/xulei131401/rule-lint/main/packages/eslint-config/src/vue-ts.js"
//   );

//   response.data.pipe(writer);

//   return new Promise((resolve, reject) => {
//     writer.on("finish", resolve);
//     writer.on("error", reject);
//   });
// }