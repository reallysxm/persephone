import { executeCommand } from "../../handlers/command-handler.js";
const PREFIX = "!"; // Set your command prefix
export default function commandInvoker(client, message) {
    if (message.author.id !== client.user?.id)
        return;
    if (!message.content.startsWith(process.env.PREFIX || PREFIX))
        return;
    const args = message.content.slice(PREFIX.length).trim().split(/\s+/);
    const commandName = args.shift()?.toLowerCase();
    if (!commandName)
        return;
    executeCommand(client, commandName, message, args);
}
