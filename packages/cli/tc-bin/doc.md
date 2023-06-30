# 项目说明

# 依赖
```shell
pnpm i -D @types/fs-extra
pnpm i -D @types/node
pnpm i -D @types/figlet
pnpm i -D tsc-alias
pnpm i -D concurrently

pnpm i -S fs-extra
pnpm i -S typescript
pnpm i -S commander
pnpm i -S figlet
pnpm i -S ora
pnpm i -S rimraf
pnpm i -S chalk


pnpm i -g github-files-fetcher


// lint 相关
pnpm i -D eslint
pnpm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

pnpm install --save-dev @commitlint/{config-conventional,cli}
```

# tsconfig.json
配置别名，解析目录等

# 本地测试
```shell
pnpm setup
需要把pnpm-global-dir/.bin 添加到PATH

pnpm link -g
```

```shell
pnpm run dev

然后测试
tc-bin
```

# 设计逻辑
- 通过别名映射题目
  
# 业务逻辑
- [x] crtl+c 情况下 删除生成的目录
- [x] child_process 异步执行变同步
- [x] 先创建本地目录，再从git下载
- [x] 增加了logo
- [x] 增加了打印内容颜色提示
- [x] 增加了commander