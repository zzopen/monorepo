

// async function f() {
//     const { downloadFile } = await import("@zzopen/git-download-file");
// await downloadFile({
//   downloadUrl:
//     "https://raw.githubusercontent.com/xulei131401/rule-lint/main/packages/eslint-config/src/vue-ts.js",
//   //"https://raw.githubusercontent.com/xulei131401/rule-lint/main/test/.gitkeep",
//   //"https://github.com/Gyumeijie/github-files-fetcher/blob/master/src/index.js",
//   outputPath: "./aaa/bbb.txt",
// });
// }

// f()

const { downloadFile } = require("@zzopen/git-download-file");
// console.log(downloadFile)
// import { downloadFile } from "@zzopen/git-download-file"
downloadFile({
  downloadUrl:
    "https://raw.githubusercontent.com/xulei131401/rule-lint/main/packages/eslint-config/src/vue-ts.js",
  //"https://raw.githubusercontent.com/xulei131401/rule-lint/main/test/.gitkeep",
  //"https://github.com/Gyumeijie/github-files-fetcher/blob/master/src/index.js",
  outputPath: "./aaa/bbb.txt",
});

// const { is_object } = require("@zzopen/utils");
// console.log(is_object({}));

// const axios = require('axios')
// console.log(axios)