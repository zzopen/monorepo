# @zzopen/tsconfig

TSConfigs for Personal projects to extend.

## install

```bash
pnpm i -D @zzopen/tsconfig
```

## usage

```json
// your_tsconfig.json
{
  "extends": "@zzopen/tsconfig",
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
