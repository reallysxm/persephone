import path from "path";
import loadJson from "./utilities/load-json.js";
import eventHandler from "./handlers/events-handler.js";
import commandHandler from "./handlers/commands-handler.js";
import { Client as DiscordClient } from "discord.js-selfbot-v13";
import { Client as ExarotonClient } from "exaroton";

const discordClient: DiscordClient = new DiscordClient();
const configFilePath: string = path.resolve(import.meta.dirname, "config.json"); //Add the relative path to your config file here

let exarotonClient: ExarotonClient | null = null;

(async (): Promise<void> => {
  try {
    const { discordToken } = await loadJson<{ discordToken: string }>(
      configFilePath,
      new URL(import.meta.url)
    );

    if (!discordToken || discordToken.length === 0)
      return console.log(
        "Discord token not set in config.json, Safely exiting..."
      );

    await commandHandler(discordClient);
    await eventHandler(discordClient);
    await discordClient.login(discordToken);
  } catch (error) {
    console.error("Failed to load the config file or token is missing:", error);
  }

  try {
    const { exarotonToken } = await loadJson<{ exarotonToken: string }>(
      configFilePath,
      new URL(import.meta.url)
    );

    if (!exarotonToken || exarotonToken.length === 0)
      return console.log(
        "Exaroton token not set in config.json, Exaroton client will not be initialized..."
      );

    exarotonClient = new ExarotonClient(exarotonToken);
  } catch (error) {
    console.error(
      "Failed to load the config file or exarotonApiKey is missing:",
      error
    );
  }
})();

export { exarotonClient };
