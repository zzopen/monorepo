import { mainCommand } from "@commands/index.js"
import { setCliVersion, packageJson } from "@commons/index.js";

setCliVersion(packageJson.version);
mainCommand.parse();