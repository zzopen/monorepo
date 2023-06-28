import { Command } from "commander";
import { clean } from "./clean.js";

function makeCommand(): Command {
  const command = new Command("clean");
  command.description("Clean all dist files").action(async () => {
    return await clean();
  });

  return command;
}
 
  export { makeCommand as makeCleanCommand };