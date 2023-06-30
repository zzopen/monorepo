import { Command, type AddHelpTextPosition } from "commander";
import { packageJson } from "@commons/index.js";
import { makePackCommand } from './pack/index.js'
import { makeGenCommand } from "./generate/index.js";
import figlet from "figlet"

const logo = figlet.textSync("vcli", {
  font: "Standard",
  horizontalLayout: "default",
  verticalLayout: "default",
  width: 80,
  whitespaceBreak: true,
});

export const mainCommand = new Command();
mainCommand.addHelpText("before", (): string => {
  return "\r\n" + logo
});

mainCommand.name("vcli").usage("<command> [options]"); // vcli
mainCommand.version(`vcli ${packageJson.version}`); // --version
mainCommand.addCommand(makePackCommand());
mainCommand.addCommand(makeGenCommand());
mainCommand.showHelpAfterError(
  `(use ${mainCommand.name()} --help for additional information)`
);