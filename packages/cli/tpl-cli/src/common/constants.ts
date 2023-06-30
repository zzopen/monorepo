import path from "node:path"

export const EXT_REGEXP = /\.\w+$/;
export const SFC_REGEXP = /\.(vue)$/;
export const DEMO_REGEXP = new RegExp("\\" + path.sep + "demo$");
export const TEST_REGEXP = new RegExp("\\" + path.sep + "test$");
export const ASSET_REGEXP = /\.(png|jpe?g|gif|webp|ico|jfif|svg|woff2?|ttf)$/i;
export const STYLE_REGEXP = /\.(css|less|scss)$/;
export const SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/;
export const JSX_REGEXP = /\.(j|t)sx$/;
export const ENTRY_EXTS = ["js", "ts", "tsx", "jsx", "vue"];

export const camelizeRE = /-(\w)/g;
export const pascalizeRE = /(\w)(\w*)/g;

// template
export enum CommandTemplateEnum {
    VUE_SFC = 'vue-sfc',
    VUE_TSX = 'vue-tsx'
}

export type CommandTemplate =
  | CommandTemplateEnum.VUE_SFC
  | CommandTemplateEnum.VUE_TSX;