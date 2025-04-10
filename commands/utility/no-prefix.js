import path from "path";
import fs from "fs/promises";
import loadJson from "../../utilities/load-json.js";
export default {
    name: "no-prefix",
    description: "Toggle no-prefix mode",
    usage: "<prefix>ping",
    subCommands: {},
    minArgs: 0,
    maxArgs: 0,
    async execute(client, message) {
        const configFilePath = path.resolve(import.meta.dirname, "../../config.json"); //Add the relative path to your config file here
        try {
            const config = await loadJson(path.resolve(import.meta.dirname, configFilePath), new URL(import.meta.url));
            config.noPrefix = !config.noPrefix;
            await fs.writeFile(configFilePath, JSON.stringify(config, null, 2), "utf-8");
            if (config.deleteCommandMessage) {
                return await message.channel.send(`< / > | No prefix mode: ${config.noPrefix ? "ENABLED" : "DISABLED"}`);
            }
            else {
                return await message.reply(`< / > | No prefix mode: ${config.noPrefix ? "ENABLED" : "DISABLED"}`);
            }
        }
        catch (error) {
            console.log("Failed to load the config file or deleteCommandMessage or noPrefix is missing:", error);
        }
    },
};
