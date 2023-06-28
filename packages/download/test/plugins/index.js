import path from "node:path";
import { glob } from "glob";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import fsx from "fs-extra";
import pkg from "typescript";
const { sys, parseConfigFileTextToJson, findConfigFile } = pkg;

function getTsConfig(configPath) {
  const defaults = { compilerOptions: {}, outDir: "." };
  if (!configPath) {
    return defaults;
  }
  const configJson = sys.readFile(configPath);
  if (!configJson) {
    return defaults;
  }
  const { config } = parseConfigFileTextToJson(
    configPath,
    configJson
  );
  return { ...defaults, ...config };
}

function astParse(filePath, rootPath) {
    console.log("filePath:", filePath);
  const parseContext = fsx.readFileSync(filePath, { encoding: "utf-8" });
  const ast = parse(parseContext, {
    sourceType: "module",
    plugins: [
      "typescript",
      "exportNamespaceFrom",
      "exportDefaultFrom",
      // ["decorators", { decoratorsBeforeExport: true }],
      // "classProperties",
      // "classPrivateProperties"
    ],
  });

  console.log("aaa")
  traverse.default(ast, {
    ImportDeclaration: function (astPath) {
      console.log("old astPath:", astPath.node.source.value);
      // 根据替换变量拿到绝对目录路径
      let relative = path.relative(path.dirname(filePath), rootPath);
      relative = relative.replace(/\\/g, "/");
      astPath.node.source.value = astPath.node.source.value.replace(
        "@/",
        relative + "/"
      );

      console.log("new  astPath:", astPath.node.source.value);
      // 如果绝对路径转相对
      //   if (path.isAbsolute(astPath.node.source.value)) {
      //     astPath.node.source.value = "." + astPath.node.source.value;
      //   }
    },
    ExportDeclaration: function (astPath) {
         console.log("ssss:", astPath.node.source.value);
    },
  });
//   const code = generate(ast).code;
  //fsx.outputFileSync(filePath, code, { encoding: "utf-8" });
}

export const alias = () => {
  const tsConfigPath = findConfigFile("./", sys.fileExists);
  const { compilerOptions } = getTsConfig(tsConfigPath);

  return {
    name: "rollup-plugin-alias",
    closeBundle: async () => {
      const rootPath = path.resolve(
        process.cwd(),
        "./",
        compilerOptions.outDir || ""
      );
      console.log("rootPath:", rootPath);
      const files = glob.sync(`${rootPath}/**/*.d.ts`, { matchBase: true });
    //   console.log("files:", files);
      for (let index = 0; index < files.length; index++) {
        astParse(files[index], rootPath);
      }
    },
  };
};
