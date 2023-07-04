# @zzopen/typescript-config

TSConfigs for Personal projects to extend.

## install

```bash
pnpm i -D @zzopen/typescript-config
```

## usage

```json
// your_tsconfig.json
{
  "extends": "@zzopen/typescript-config",
  // custom config...
  "compilerOptions": {
    "outDir": "./lib",
    "rootDir": "./src",
  },
  "exclude": [
    "lib",
    "test",
    "**/*.test.ts"
  ]
}
```
