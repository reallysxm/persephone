import path from "path";
import loadJson from "../../utilities/load-json";
import { Client, Message } from "discord.js-selfbot-v13";

export default {
  name: "ping",
  description: "Check the bot's latency",
  usage: "<prefix>ping",
  subCommands: {},
  minArgs: 0,
  maxArgs: 0,
  async execute(client: Client, message: Message) {
    const configFilePath: string = path.resolve(
      import.meta.dirname,
      "../../config.json"
    );

    try {
      const latency = Date.now() - message.createdTimestamp;
      const apiLatency = Math.round(client.ws.ping);
      const { deleteCommandMessage } = await loadJson<{
        deleteCommandMessage: boolean;
      }>(
        path.resolve(import.meta.dirname, configFilePath),
        new URL(import.meta.url)
      );

      if (deleteCommandMessage) {
        return await message.channel.send(
          `< / > | Latency: ${latency}ms\n< / > | API Latency: ${apiLatency}ms`
        );
      } else {
        return await message.reply(
          `< / > | Latency: ${latency}ms\n< / > | API Latency: ${apiLatency}ms`
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
