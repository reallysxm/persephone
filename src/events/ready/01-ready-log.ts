import { Client } from 'discord.js-selfbot-v13';

export default function readyHandler(client: Client) {
  console.log(`${client.user?.username} is online and ready!`);
}
