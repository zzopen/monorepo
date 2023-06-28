import { Command } from "Commander";
import { dev } from "./dev.js";

function makeCommand(): Command {
  const command = new Command("dev");
  command.description("Run dev server").action(async () => {
    return await dev();
  });

  return command;
}
 

export { makeCommand as makeDevCommand };