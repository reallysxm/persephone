import path from "path";
import loadJson from "./utilities/load-json.js";
import eventHandler from "./handlers/events-handler.js";
import commandHandler from "./handlers/commands-handler.js";
import { Client as DiscordClient } from "discord.js-selfbot-v13";
import { Client as ExarotonClient } from "exaroton";

const discordClient: DiscordClient = new DiscordClient();
const configFilePath: string = path.resolve(import.meta.dirname, "config.json"); //Add the relative path to your config file here

const main = async () => {
  try {
    const { token } = await loadJson<{ token: string }>(
      configFilePath,
      new URL(import.meta.url)
    );

    if (!token || token.length === 0) {
    }
  } catch (error) {
    console.error("Failed to load the config file or token is missing:", error);
  }

  try {
    const { exarotonApiKey } = await loadJson<{ exarotonApiKey: string }>(
      configFilePath,
      new URL(import.meta.url)
    );
    console.log(exarotonApiKey);
  } catch (error) {
    console.error(
      "Failed to load the config file or exarotonApiKey is missing:",
      error
    );
  }
};
