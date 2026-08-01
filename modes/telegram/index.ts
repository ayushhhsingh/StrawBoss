import { Telegraf } from "telegraf";
import chalk from "chalk";
import { WELCOME } from "./constants";
import { registerHandlers } from "./handlers";

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not set. Add it to .env or your environment before launching Telegram mode.`);
  }
  return value;
}

export async function runTelegramMode() {
  let token: string;
  let ownerId: string;

  try {
    token = getRequiredEnv("TELEGRAM_BOT_TOKEN");
    ownerId = getRequiredEnv("TELEGRAM_OWNER_ID");
  } catch (error) {
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    return;
  }

  const bot = new Telegraf(token);
  registerHandlers(bot);

  try {
    await bot.telegram.sendMessage(ownerId, WELCOME, { parse_mode: "Markdown" });
    console.log(chalk.green("Sent welcome message to Telegram.\n"));
  } catch (error) {
    console.error(chalk.red("Telegram bot could not start. Check your bot token and owner ID."));
    console.error(error);
    return;
  }

  try {
    await bot.launch();
  } catch (error) {
    console.error(chalk.red("Telegram bot failed to launch."));
    console.error(error);
    return;
  }

  console.log(chalk.green("Telegram bot is running. Press Ctrl+C to stop.\n"));

  await new Promise<void>((resolve) => {
    const stop = () => {
      bot.stop("SIGINT");
      resolve();
    };
    process.once("SIGINT", stop);
    process.once("SIGTERM", stop);
  });
}
