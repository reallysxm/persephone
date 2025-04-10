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
const configFilePath = path.resolve(import.meta.dirname, "../config.json"); //Add the relative path to your config file here
export default async function executeCommand(client, commandName, message, ...args) {
    const command = commands.get(commandName);
    if (command) {
        try {
            const { deleteCommandMessage } = await loadJson(configFilePath, new URL(import.meta.url));
            try {
                const { strictMode } = await loadJson(configFilePath, new URL(import.meta.url));
                if ((strictMode && args[0].length < command.minArgs) ||
                    args[0].length > command.maxArgs) {
                    if (deleteCommandMessage)
                        return await message.delete().then(() => {
                            message.channel.send(`# Invalid Usage\n\n< / > | Command: ${command.name}\n< / > | Usage: ${command.usage}\n< / > | MinArgs: ${command.minArgs}, MaxArgs: ${command.maxArgs}`);
                        });
                    return message.reply(`# Invalid Usage\n\n< / > | Command: ${command.name}\n< / > | Usage: ${command.usage}\n< / > | MinArgs: ${command.minArgs}, MaxArgs: ${command.maxArgs}`);
                }
            }
            catch (error) {
                console.error("Failed to load the config file or strictMode is missing:", error);
            }
            if (!deleteCommandMessage)
                return command.execute(client, message, ...args);
            if (message.deletable) {
                await message.delete();
                return command.execute(client, message, ...args);
            }
        }
        catch (error) {
            console.error("Failed to load the config file or deleteCommandMessage is missing:", error);
        }
    }
    else
        return;
}
