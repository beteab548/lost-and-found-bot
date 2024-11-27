import { Telegraf } from "telegraf";
import dotenv from "dotenv";
dotenv.config();
const token = "7815304747:AAGQPXhRdCa88KMeS3pUau3akF_0XxI53qw";
const bot = new Telegraf(token);
const userResponse = {};
bot.command("start", (ctx) => {
  userResponse[ctx.from.id] = { state: "name" };
  ctx.reply("welcome what is your name?");
});
bot.on("text", (ctx) => {
  const userState = userResponse[ctx.from.id];
  if (userState.state === "name") {
    userState.name = ctx.message.text;
    userState.state = "email";
    ctx.reply("what is your Email?");
  } else if (userState.state === "email") {
    userState.email = ctx.message.text;
    userState.state = "phone_number";
    ctx.reply("what is your phone number?");
  } else if (userState.state === "phone_number") {
    userState.phone_number = ctx.message.text;
    userState.state = "completed";
  }
  if (userState.state === "completed") {
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
  }
});
bot.on("callback_query", (ctx) => {
  const action = ctx.callbackQuery.data;
  if (action === "Find") {
    ctx.reply("pls fill on this form to find your lost items");
    ctx.reply("pls fill on this form to find your lost items");
  }
  if (action === "Report") {
    ctx.reply("pls fill on this form to report a lost items");
    ctx.reply()
  }
});
bot.command("help", (ctx) => {
  ctx.reply(
    "Welcome how can help you? this are the commands\n /start='to start', \n /help='to get help' \n /stop='to stop bot'"
  );
});
// bot.on("text", (ctx) => {
//
// });
// bot.on("callback_query", (ctx) => {
//   const action = ctx.callbackQuery.data;
//   if (action === "Find") {
//     ctx.reply("pls fill on this form to find your lost items");
//     ctx.reply("pls fill on this form to find your lost items");
//   }
//   if (action === "Report") {
//     ctx.reply("pls fill on this form to report a lost items");
//   }
// });
bot.launch();
console.log("bot litenig...");
