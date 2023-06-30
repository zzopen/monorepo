# tc-bin
该工具可以帮助用户下载 [type-challenges](https://github.com/type-challenges/type-challenges) 的题目到本地

# 安装
```shell
pnpm[npm] i -g tc-bin  github-files-fetcher
```

# 使用
```shell
查看帮助

tc-bin --help
```

```shell
tc-bin 题目别名(工具中提前配置好的) 存放路径

其中 以下三种方式等价，针对当前路径做了特殊处理
tc-bin If
tc-bin If .
tc-bin If ./
```

# 注意
**<mark>需要用户自行确认可以正常访问github </mark>**





# type-challenges
练习type-challenges


# 安装依赖
```shell
pnpm i -D husky -w
pnpm install --save-dev @commitlint/{config-conventional,cli} -w
```

添加husky
```shell
pnpm pkg set scripts.prepare="husky install"
pnpm run prepare

npx husky add .husky/pre-commit "npm test" // 提交前勾子脚本
npx husky add .husky/commit-msg "npx --no -- commitlint --edit ${1}" 提交信息勾子脚本
```
