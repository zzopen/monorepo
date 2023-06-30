import url from "node:url"
import path from "node:path"

export const PROJECT_PATH = url.fileURLToPath(new URL("../", import.meta.url))
export const PACKAGE_JSON_PATH = path.resolve(PROJECT_PATH, './package.json')