import url from "node:url";
import path from "node:path";

export const ROOT_DIR_PATH = path.dirname(url.fileURLToPath(import.meta.url));
export const TEMPLATES_DIR_PATH = path.resolve(ROOT_DIR_PATH, "../templates");
export const PACKAGE_JSON_PATH = url.fileURLToPath(
  new URL("../package.json", import.meta.url)
)

// console.log("PACKAGE_JSON_PATH:", PACKAGE_JSON_PATH);
// const p = path.resolve(process.cwd(), '.')
// const p1 = path.resolve(process.cwd(), 'usr')
// console.log("p:", p)
// console.log("p1:", p1)

// import ora from "ora"

// const spinner = ora("Loading unicorns").start();

// setTimeout(() => {
//   spinner.color = "red";
//   spinner.text = "Loading rainbows";
//   setTimeout(() => {
//     spinner.stop()
//   },2000)
// }, 1000);