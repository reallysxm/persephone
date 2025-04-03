import chalk from "chalk";
import centerText from "../../utilities/center-text.js";
import { Client } from "discord.js-selfbot-v13";

export default function readyHandler(client: Client) {
  console.log(centerText("LOGGED/READY", process.stdout.columns, "-"));
  console.log("");
  console.log(chalk.green("USER: ") + chalk.blue(client.user?.username));
  console.log(
    chalk.green("DISPLAY NAME: ") + chalk.blue(client.user?.displayName)
  );
  console.log(chalk.green("ID: ") + chalk.blue(client.user?.id));
  const createdDate = new Date(client.user?.createdTimestamp || 0);
  const formattedDate = `${createdDate.getDate()}/${
    createdDate.getMonth() + 1
  }/${createdDate.getFullYear()}`;
  console.log(chalk.green("CREATED DATE: ") + chalk.blue(formattedDate));
  console.log("");
  console.log(centerText("< / >", process.stdout.columns, "-"));
  console.log("");
}
