import eventHandler from "./handlers/event-handler.js";
import { Client } from "discord.js-selfbot-v13";
import { commandHandler } from "./handlers/command-handler.js";

const client: Client = new Client();

try {
  const {
    default: { token },
  } = await import("../config.json", { assert: { type: "json" } });

  await eventHandler(client);
  await commandHandler(client);

  client.login(token);
} catch (error) {
  console.error("Failed to load the config file or token is missing:", error);
}
