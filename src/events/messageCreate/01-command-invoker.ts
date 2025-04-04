import path from "path";
import loadJson from "../../utilities/load-json.js";
import executeCommand from "../../utilities/execute-commands.js";
import { Client, Message } from "discord.js-selfbot-v13";

const configFilePath: string = "../../config.json"; //Add the relative path to your config file here
let PREFIX: string[] = ["!"];

export default async function commandInvoker(client: Client, message: Message) {
  if (message.author.id !== client.user?.id) return;

  try {
    const { prefix, noPrefix } = await loadJson<{
      prefix: string[];
      noPrefix: boolean;
    }>(
      path.resolve(import.meta.dirname, configFilePath),
      new URL(import.meta.url)
    );

    PREFIX = prefix.every((__prefix: string) => __prefix.trim() === "")
      ? PREFIX
      : prefix;

    if (!noPrefix && !PREFIX.some((p) => message.content.startsWith(p))) return;

    const contentWithoutPrefix = noPrefix
      ? message.content.trim()
      : PREFIX.find((p) => message.content.startsWith(p))
      ? message.content
          .slice(PREFIX.find((p) => message.content.startsWith(p))!.length)
          .trim()
      : "";

    const args = contentWithoutPrefix.split(/\s+/);
    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    executeCommand(client, commandName, message, args);
  } catch (error) {
    console.error(
      "Failed to load the config file or prefix is missing:",
      error
    );
  }
}
