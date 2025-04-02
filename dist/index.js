import "dotenv/config";
import eventHandler from "./handlers/event-handler.js";
import { Client } from "discord.js-selfbot-v13";
import { commandHandler } from "./handlers/command-handler.js";
const client = new Client();
await eventHandler(client);
await commandHandler(client);
client.login(process.env.TOKEN);
