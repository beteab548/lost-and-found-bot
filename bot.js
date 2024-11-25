import { Telegraf } from "telegraf";
const token = process.env.TELEGRAM_API_TOKEN;
const bot = new Telegraf(token);
console.log(token);
bot.start((ctx) => {
  ctx.reply("what would you like to do?", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Find", callback_data: "Find" },
          { text: "Report", callback_data: "Report" },
        ],
      ],
    },
  });
});
bot.on("callback_query", (ctx) => {
  const action = ctx.callbackQuery.data;
  if (action === "Find") {
    ctx.reply("pls fill on this form to find your lost items");
    ctx.reply("pls fill on this form to find your lost items");
  }
  if (action === "Report") {
    ctx.reply("pls fill on this form to report a lost items");
  }
  ctx.answerCbQuery({ text: "this an alert! " });
});

bot.launch();
console.log("bot listning...");
