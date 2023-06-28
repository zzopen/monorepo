import { Command } from "commander";
import {
  PACKAGE_JSON_DATA,
  BIN_NAME,
  wrapLoading,
  exit,
} from "@common/index.js";
import { action } from "./action.js";
import figlet from "figlet";

const logo = figlet.textSync(BIN_NAME, {
  font: "Standard",
  horizontalLayout: "default",
  verticalLayout: "default",
  width: 80,
  whitespaceBreak: true,
});

function createCommand(): Command {
  const command = new Command();
  command.addHelpText("before", (): string => {
    return "\r\n" + logo;
  });

  command.name(BIN_NAME).usage("<arguments ...>");
  command.version(`${BIN_NAME} ${PACKAGE_JSON_DATA.version}`);
  command.showHelpAfterError(
    `(use ${command.name()} --help for additional information)`
  );

  command
    .description("Generate type-challenges's question files")
    .argument("<question_alias>", "A specific question")
    .argument("[dir]", "question files will be create to here", "./")
    .action(async (questionAlias, dir) => {
        await wrapLoading({
          fn: action,
          fnParams: [questionAlias, dir],
          successTip: `${questionAlias} create success`,
          failTip: `${questionAlias} create fail`,
        }).catch((err) => {
          exit(err);
        });
    });

  return command;
}
export { createCommand as createMainCommand };
