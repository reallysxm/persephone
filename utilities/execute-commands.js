import path from "path";
import loadJson from "../utilities/load-json.js";
import { commands } from "../handlers/commands-handler.js";
/**
 * Executes a command by its name.
 *
 * @param client - The Discord client instance.
 * @param commandName - The name of the command to execute.
 * @param message - The Discord message object triggering the command.
 * @param args - Additional arguments to pass to the command.
 */
export default async function executeCommand(client, commandName, message, ...args) {
    const command = commands.get(commandName);
    if (command) {
        try {
            const configFilePath = "../config.json";
            const { anonymousCommands } = await loadJson(path.resolve(import.meta.dirname, configFilePath), new URL(import.meta.url));
            if (!anonymousCommands)
                return command.execute(client, message, ...args);
            if (message.deletable) {
                command.execute(client, message, ...args);
                await new Promise((resolve) => setTimeout(resolve, 1));
                await message.delete();
            }
        }
        catch (error) {
            console.log("Failed to load the config file or anonymousCommands is missing:", error);
        }
    }
    else
        return;
}
