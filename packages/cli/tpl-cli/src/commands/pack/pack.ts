import { Command } from "commander";
import { makeBuildCommand } from "./build/index.js";
import { makeDevCommand } from "./dev/index.js";
import { makeCleanCommand } from "./clean/index.js";


export function makeCommand(){
  const command = new Command("pack");
    command.addCommand(makeBuildCommand());
    command.addCommand(makeCleanCommand());
    command.addCommand(makeDevCommand());
    return command
}


export { makeCommand as makePackCommand };