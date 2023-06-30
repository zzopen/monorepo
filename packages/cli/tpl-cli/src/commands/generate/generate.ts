import { Command } from "commander";
import { gen } from "./gen/index.js";
import inquirer from "inquirer";
import { CommandTemplateEnum, wrapLoading } from "@commons/index.js";

function makeCommand(): Command {
  const command = new Command("gen");
  const projectTplPromptConfig = {
    type: "expand",
    name: "tpl",
    message: "请选择一个模板",
    choices: [
      { key: "a", value: CommandTemplateEnum.VUE_SFC },
      { key: "b", value: CommandTemplateEnum.VUE_TSX },
    ],
  };

  const projectNamePromptConfig = {
    type: "input",
    name: "name",
    message: "请输入项目名称",
  };

  const projectPathPromptConfig = {
    type: "input",
    name: "path",
    message: "请输入项目路径",
    default: ".",
  };

  command
    .description("Generate various framework templates")
    .option("-n, --name <string>", "Project Name")
    .option("-p, --path <string>", "Project Path")
    .option("-t, --tpl <string>", "Project template will be copy to here")
    .action(async (options) => {
      //  console.log("options:", options);
      // 示例: vcli gen -n vue-tsx  -t vue-tsx
      const params = {
        [projectNamePromptConfig.name]: {
          prompt_key: projectNamePromptConfig.name,
          value: options.name ?? "",
        },
        [projectPathPromptConfig.name]: {
          prompt_key: projectPathPromptConfig.name,
          value: options.path ?? ".",
        },
        [projectTplPromptConfig.name]: {
          prompt_key: projectTplPromptConfig.name,
          value: options.tpl ?? "",
        },
      };

      // 没传参数的话，开启交互
      const prompts = [];

      // 如果传递了参数并且有效
      if (!params[projectNamePromptConfig.name].value) {
        prompts.push(projectNamePromptConfig);
      }

      if (!params[projectPathPromptConfig.name].value) {
        prompts.push(projectPathPromptConfig);
      }

      if (
        !params[projectTplPromptConfig.name].value ||
        Object.values(CommandTemplateEnum).indexOf(
          params[projectTplPromptConfig.name].value
        ) === -1
      ) {
        prompts.push(projectTplPromptConfig);
      }

      if (prompts.length) {
        const answers = await inquirer.prompt(prompts);
        for (const _key of Object.keys(params)) {
          if (answers.hasOwnProperty(_key)) {
            params[_key].value = answers[_key];
          }
        }
      }

      await wrapLoading(
        gen,
        "创建项目成功",
        params[projectNamePromptConfig.name].value,
        params[projectPathPromptConfig.name].value,
        params[projectTplPromptConfig.name].value
      );
    });

  return command;
}

export { makeCommand as makeGenCommand };
