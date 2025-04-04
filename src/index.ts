import path from "path";
import loadJson from "./utilities/load-json.js";
import eventHandler from "./handlers/events-handler.js";
import commandHandler from "./handlers/commands-handler.js";
import { Client } from "discord.js-selfbot-v13";

const client: Client = new Client();
const configFilePath = "config.json";

try {
  const { token } = await loadJson<{ token: string }>(
    path.resolve(import.meta.dirname, configFilePath),
    new URL(import.meta.url)
  );
  await eventHandler(client);
  await commandHandler(client);
  client.login(token);
} catch (error) {
  console.error("Failed to load the config file or token is missing:", error);
}
