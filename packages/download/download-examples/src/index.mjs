import { downloadFile } from "@zzopen/git-download-file";

async function f(){
await downloadFile({
  downloadUrl:
    "https://raw.githubusercontent.com/xulei131401/rule-lint/main/packages/eslint-config/src/vue-ts.js",
  //"https://raw.githubusercontent.com/xulei131401/rule-lint/main/test/.gitkeep",
  //"https://github.com/Gyumeijie/github-files-fetcher/blob/master/src/index.js",
  outputPath: "./aaa/bbb.txt",
});
}

f()