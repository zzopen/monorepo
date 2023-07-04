# @zzopen/eslint-config
Eslint Config With Prettier Support

# 使用
```shell
安装

pnpm i -D @zzopen/eslint-config eslint
```

.eslintre.js
```js
module.exports = {
  extends: ["@zzopen/eslint-config"],
};
```

.prettierrc.js(可选，如不使用prettier可以不执行该步骤)
```js
module.exports = {
  ...require('@zzopen/eslint-config/prettier')
};
```

# eslint-config-prettier和eslint-plugin-prettier
```text
eslint-config-prettier：关闭eslint中与prettier相互冲突的规则。
eslint-plugin-prettier：赋予eslint用prettier格式化代码的能力
```

# 注意
- vscode修改.prettierrc.js文件配置后记得重新启动EslintServer
