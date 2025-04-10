import path from "path";
import loadJson from "./utilities/load-json.js";
import { Client as DiscordClient } from "discord.js-selfbot-v13";
const discordClient = new DiscordClient();
const configFilePath = path.resolve(import.meta.dirname, "config.json"); //Add the relative path to your config file here
const main = async () => {
    try {
        const { token } = await loadJson(configFilePath, new URL(import.meta.url));
        if (!token || token.length === 0) {
        }
    }
    catch (error) {
        console.error("Failed to load the config file or token is missing:", error);
    }
    try {
        const { exarotonApiKey } = await loadJson(configFilePath, new URL(import.meta.url));
        console.log(exarotonApiKey);
    }
    catch (error) {
        console.error("Failed to load the config file or exarotonApiKey is missing:", error);
    }
};
