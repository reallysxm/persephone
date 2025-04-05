import { Client, Message } from "discord.js-selfbot-v13";

export default {
  name: "ping",
  description: "Check the bot's latency",
  usage: "<prefix>ping",
  execute(client: Client, message: Message) {
    const latency = Date.now() - message.createdTimestamp;
    const apiLatency = Math.round(client.ws.ping);
    message.reply(
      `< / > | Latency: ${latency}ms\n< / > | API Latency: ${apiLatency}ms`
    );
  },
};
