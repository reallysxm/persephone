import path from "path";
import fs from "fs/promises";
import loadJson from "../../utilities/load-json.js";
import { Client, Message } from "discord.js-selfbot-v13";

export default {
  name: "delete-command-message",
  description: "Toggle no-command message mode",
  usage: "<prefix>delete-command-message",
  async execute(client: Client, message: Message) {
    const configFilePath: string = path.resolve(
      import.meta.dirname,
      "../../config.json"
    ); //Add the relative path to your config file here

    try {
      const config = await loadJson<{
        deleteCommandMessage: boolean;
      }>(configFilePath, new URL(import.meta.url));

      if (config.deleteCommandMessage) {
        await message.channel.send(
          `< / > |  No command message mode: ${
            config.deleteCommandMessage ? "DISABLED" : "ENABLED"
          }`
        );

        config.deleteCommandMessage = !config.deleteCommandMessage;

        return await fs.writeFile(
          configFilePath,
          JSON.stringify(config, null, 2),
          "utf-8"
        );
      } else {
        await message.reply(
          `< / > | No command message mode: ${
            config.deleteCommandMessage ? "DISABLED" : "ENABLED"
          }`
        );

        config.deleteCommandMessage = !config.deleteCommandMessage;

        return await fs.writeFile(
          configFilePath,
          JSON.stringify(config, null, 2),
          "utf-8"
        );
      }
    } catch (error) {
      console.log(
        "Failed to load the config file or deleteCommandMessage is missing:",
        error
      );
    }
  },
};
