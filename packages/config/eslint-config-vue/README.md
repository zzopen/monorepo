# @zzopen/eslint-config-vue
Eslint Config With Typescript And Vue And Prettier Support

# 使用
```shell
安装

pnpm i -D @zzopen/eslint-config-vue eslint
```

.eslintre.js
```js
module.exports = {
  extends: ["@zzopen/eslint-config-vue"],
};
```

.prettierrc.js(可选，如不使用prettier可以不执行该步骤)
```js
module.exports = {
  ...require('@zzopen/eslint-config-vue/prettier')
};
```

# 注意
- vscode修改.prettierrc.js文件配置后记得重新启动EsServer
