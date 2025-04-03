import { Client, Message } from "discord.js-selfbot-v13";
import { commands } from "../handlers/commands-handler.js";

/**
 * Executes a command by its name.
 *
 * @param client - The Discord client instance.
 * @param commandName - The name of the command to execute.
 * @param message - The Discord message object triggering the command.
 * @param args - Additional arguments to pass to the command.
 */
export default function executeCommand(
  client: Client,
  commandName: string,
  message: Message,
  ...args: any[]
) {
  const command = commands.get(commandName);
  if (command) {
    return command.execute(client, message, ...args);
  } else return;
}
