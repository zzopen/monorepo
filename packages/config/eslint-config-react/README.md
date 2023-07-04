# @zzopen/eslint-config-react
Eslint Config With Typescript And React And Prettier Support
(支持JSX，TSX)
# 使用
```shell
安装

pnpm i -D @zzopen/eslint-config-react eslint
```

.eslintre.js
```js
module.exports = {
  extends: ["@zzopen/eslint-config-react"],
};
```

.prettierrc.js(可选，如不使用prettier可以不执行该步骤)
```js
module.exports = {
  ...require('@zzopen/eslint-config-react/prettier')
};
```

# 注意
- vscode修改.prettierrc.js文件配置后记得重新启动EsServer
