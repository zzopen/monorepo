import { Command } from "commander";
import { build } from "./build.js";


function makeCommand(): Command {
  const command = new Command("build");

  command
    .description("Compile components in production mode")
    .action(async () => {
      return await build();
    });

  return command;
}

export { makeCommand as makeBuildCommand }