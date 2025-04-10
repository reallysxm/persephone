import path from "path";
import chalk from "chalk";
import centerText from "../utilities/center-text";
import fetchAllFiles from "../utilities/fetch-all-files";
import { Collection, Client, Message } from "discord.js-selfbot-v13";

const commands = new Collection<string, any>();

export default async function commandHandler(client: Client) {
  const commandsPath = path.resolve(import.meta.dirname, "..", "commands");
  const commandCategories = fetchAllFiles(commandsPath, 1);

  console.log("");
  console.log(centerText("LOADING COMMANDS", process.stdout.columns, "-"));
  console.log("");

  for (const category of commandCategories) {
    const commandFiles = fetchAllFiles(category.url, 0);

    for (const file of commandFiles) {
      if (!file.url.endsWith(".js") && !file.url.endsWith(".ts")) continue;

      const commandModule = await import(`file://${path.resolve(file.url)}`);
      if (commandModule.default?.name) {
        commands.set(commandModule.default.name, commandModule.default);
        console.log(
          chalk.green("Loaded command: ") +
            chalk.blue(`${category.name} `) +
            "-> " +
            chalk.red(file.name)
        );
      }
    }
  }

  console.log("");
  console.log(centerText("< / >", process.stdout.columns, "-"));
  console.log("");
}

export { commands };
