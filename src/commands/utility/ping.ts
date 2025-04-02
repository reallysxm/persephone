import { Client, Message } from "discord.js-selfbot-v13";

export default {
  name: "ping",
  execute(client: Client, message: Message) {
    const latency = Date.now() - message.createdTimestamp;
    message.reply(`Pong! 🏓 Latency is ${latency}ms`);
  },
};
