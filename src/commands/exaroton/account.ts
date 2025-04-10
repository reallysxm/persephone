import path from "path";
import loadJson from "../../utilities/load-json";
import { Client, Message } from "discord.js-selfbot-v13";

export default {
  name: "exaroton-account",
  description: "Get Exaroton account information",
  usage: "<prefix>exaroton-account",
  subCommands: {},
  minArgs: 1,
  maxArgs: 0,
  async execute(client: Client, message: Message, args: string[]) {
    try {
      interface ExarotonAccountResponse {
        data: {
          name: string;
          verified: boolean;
          credits: number;
        };
      }

      const configFilePath: string = path.resolve(
        import.meta.dirname,
        "../../config.json"
      );
      const URI: string = "https://api.exaroton.com/v1/account/";
      const { exarotonApiKey, deleteCommandMessage, strictMode } =
        await loadJson<{
          exarotonApiKey: string;
          deleteCommandMessage: boolean;
          strictMode: boolean;
        }>(configFilePath, new URL(import.meta.url));

      const res = await fetch(URI, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${exarotonApiKey}`,
        },
      });
      const resJson: ExarotonAccountResponse = await res.json();

      if (deleteCommandMessage) {
        return message.channel.send(
          `< / > | Name: **${resJson.data.name}**\n< / > | Verified: **${resJson.data.verified}**\n< / > | Credits: **${resJson.data.credits}**`
        );
      } else {
        return message.reply(
          `< / > | Name: **${resJson.data.name}**\n< / > | Verified: **${resJson.data.verified}**\n< / > | Credits: **${resJson.data.credits}**`
        );
      }
    } catch (error) {
      console.error(
        "Failed to load the config file or exarotonApiKey is missing or fetch failed:",
        error
      );
    }
  },
};
