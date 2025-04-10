import path from "path";
import loadJson from "../../utilities/load-json.js";
export default {
    name: "exaroton-account",
    description: "Get Exaroton account information",
    usage: "<prefix>exaroton-account",
    subCommands: {},
    minArgs: 1,
    maxArgs: 0,
    async execute(client, message, args) {
        try {
            const configFilePath = path.resolve(import.meta.dirname, "../../config.json");
            const URI = "https://api.exaroton.com/v1/account/";
            const { exarotonApiKey, deleteCommandMessage, strictMode } = await loadJson(configFilePath, new URL(import.meta.url));
            const res = await fetch(URI, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${exarotonApiKey}`,
                },
            });
            const resJson = await res.json();
            if (deleteCommandMessage) {
                return message.channel.send(`< / > | Name: **${resJson.data.name}**\n< / > | Verified: **${resJson.data.verified}**\n< / > | Credits: **${resJson.data.credits}**`);
            }
            else {
                return message.reply(`< / > | Name: **${resJson.data.name}**\n< / > | Verified: **${resJson.data.verified}**\n< / > | Credits: **${resJson.data.credits}**`);
            }
        }
        catch (error) {
            console.error("Failed to load the config file or exarotonApiKey is missing or fetch failed:", error);
        }
    },
};
