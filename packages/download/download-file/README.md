# download-file
下载远程文件到本地，适用于node环境

# 使用

ECMScripts
```js
import {downloadFile} from '@zzopen/download-remote-file';

downloadFile({
  downloadUrl: "https://raw.githubusercontent.com/zzopen/download/package.json",
  outputPath: "./package.json"
});
```

CommonJs
```js
const {downloadFile} = require('@zzopen/download-remote-file');

downloadFile({
  downloadUrl: "https://raw.githubusercontent.com/zzopen/download/package.json",
  outputPath: "./package.json"
});
```
