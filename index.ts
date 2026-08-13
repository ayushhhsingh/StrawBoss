#!/usr/bin/env bun

import { Command } from "commander";
import { runWakeup } from "./tui/wakeup";
import { startDashboardServer } from "./modes/web/dashboard";

const program = new Command();

program
  .name("chaicodeclaw-build")
  .description("Chaicodeclaw cli yt")
  .version("0.0.1");

program
  .command("wakeup")
  .description("Show the banner and pick cli, telegram, or web dashboard mode")
  .action(async () => {
    await runWakeup()
  });

program
  .command("dashboard")
  .description("Start the web dashboard")
  .action(async () => {
    await startDashboardServer();
  });

await program.parseAsync(process.argv);
