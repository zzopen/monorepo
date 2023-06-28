# @zzopen/prettier-config-base

> My personal [Prettier](https://prettier.io) config.

## Usage

**Install**:

```bash
$ pnpm add -D @zzopen/prettier-config-base
```

**Edit `package.json`**:

```json
{
  // ...
  "prettier": "@zzopen/prettier-config"
}
```
```js
module.exports = {
  ...require("@zzopen/prettier-config"),
  semi: false,
};
```
