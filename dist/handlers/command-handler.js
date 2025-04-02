import path from "path";
import fetchAllFiles from "../utilities/fetch-all-files.js";
import { Collection } from "discord.js-selfbot-v13";
import { fileURLToPath } from "url";
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const commands = new Collection();
export async function commandHandler(client) {
    const commandsPath = path.resolve(__dirname, "..", "commands");
    const commandCategories = fetchAllFiles(commandsPath, 1);
    for (const category of commandCategories) {
        const commandFiles = fetchAllFiles(category.url, 0);
        for (const file of commandFiles) {
            if (!file.url.endsWith(".js") && !file.url.endsWith(".ts"))
                continue;
            const commandModule = await import(`file://${path.resolve(file.url)}`);
            if (commandModule.default?.name) {
                commands.set(commandModule.default.name, commandModule.default);
                console.log(`Loaded command: ${commandModule.default.name}`);
            }
        }
    }
}
export function executeCommand(client, commandName, message, ...args) {
    const command = commands.get(commandName);
    if (command) {
        return command.execute(client, message, ...args);
    }
    else
        return;
}
