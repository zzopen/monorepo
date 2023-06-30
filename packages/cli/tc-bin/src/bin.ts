import { createMainCommand } from "@commands/index.js";
import process from "node:process";

createMainCommand().parse(process.argv);
