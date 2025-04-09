import path from "path";
import loadJson from "../../utilities/load-json";
export default {
    name: "ping",
    description: "Check the bot's latency",
    usage: "<prefix>ping",
    async execute(client, message) {
        const configFilePath = path.resolve(import.meta.dirname, "../../config.json");
        try {
            const latency = Date.now() - message.createdTimestamp;
            const apiLatency = Math.round(client.ws.ping);
            const { deleteCommandMessage } = await loadJson(path.resolve(import.meta.dirname, configFilePath), new URL(import.meta.url));
            if (deleteCommandMessage) {
                return await message.channel.send(`< / > | Latency: ${latency}ms\n< / > | API Latency: ${apiLatency}ms`);
            }
            else {
                return await message.reply(`< / > | Latency: ${latency}ms\n< / > | API Latency: ${apiLatency}ms`);
            }
        }
        catch (error) {
            console.log("Failed to load the config file or deleteCommandMessage is missing:", error);
        }
    },
};
