import path from "path";
import chalk from "chalk";
import centerText from "../utilities/center-text.js";
import fetchAllFiles from "../utilities/fetch-all-files.js";
import { fileURLToPath } from "url";
import { Client } from "discord.js-selfbot-v13";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default async function loadEvents(client: Client) {
  const eventsPath = path.resolve(__dirname, "..", "events");
  const eventDirs = fetchAllFiles(eventsPath, 1);

  console.log(centerText("LOADING EVENTS", process.stdout.columns, "-"));
  console.log("");

  for (const dir of eventDirs) {
    let eventFiles = fetchAllFiles(dir.url, 0);
    const eventName = path.basename(dir.url);

    eventFiles = eventFiles.sort((a, b) => {
      const numA = parseInt(a.name.match(/^\d+/)?.[0] || "0", 10);
      const numB = parseInt(b.name.match(/^\d+/)?.[0] || "0", 10);
      return numA - numB;
    });

    for (const file of eventFiles) {
      if (!file.url.endsWith(".js") && !file.url.endsWith(".ts")) continue;

      const eventModule = await import(`file://${path.resolve(file.url)}`);

      if (eventModule.default) {
        client.on(eventName, eventModule.default.bind(null, client));
        console.log(
          chalk.green(`Loaded event: `) +
            chalk.blue(`${eventName} `) +
            "-> " +
            chalk.red(file.name)
        );
      }
    }
  }

  console.log("");
  console.log(centerText("< / >", process.stdout.columns, "-"));
}
