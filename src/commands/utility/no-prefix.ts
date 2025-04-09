import path from "path";
import fs from "fs/promises";
import loadJson from "../../utilities/load-json.js";
import { Client, Message } from "discord.js-selfbot-v13";

export default {
  name: "no-prefix",
  description: "Toggle no-prefix mode",
  usage: "<prefix>ping",
  async execute(client: Client, message: Message) {
    const configFilePath: string = path.resolve(
      import.meta.dirname,
      "../../config.json"
    ); //Add the relative path to your config file here

    try {
      const config = await loadJson<{
        deleteCommandMessage: boolean;
        noPrefix: boolean;
      }>(
        path.resolve(import.meta.dirname, configFilePath),
        new URL(import.meta.url)
      );

      config.noPrefix = !config.noPrefix;

      await fs.writeFile(
        configFilePath,
        JSON.stringify(config, null, 2),
        "utf-8"
      );

      if (config.deleteCommandMessage) {
        return await message.channel.send(
          `< / > | No prefix mode: ${config.noPrefix ? "ENABLED" : "DISABLED"}`
        );
      } else {
        return await message.reply(
          `< / > | No prefix mode: ${config.noPrefix ? "ENABLED" : "DISABLED"}`
        );
      }
    } catch (error) {
      console.log(
        "Failed to load the config file or deleteCommandMessage or noPrefix is missing:",
        error
      );
    }
  },
};
