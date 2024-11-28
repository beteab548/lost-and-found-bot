import { Telegraf } from "telegraf";
import fs from "fs";
import { pipeline } from "stream";
const token = "7815304747:AAGQPXhRdCa88KMeS3pUau3akF_0XxI53qw";
const bot = new Telegraf(token);
let userResponse = {};
bot.command("start", (ctx) => {
  userResponse[ctx.from.id] = { state: "name" };
  ctx.reply("welcome what is your name?");
  console.log(userResponse);
});
bot.on("text", (ctx) => {
  const userState = userResponse[ctx.from.id];
  if (ctx.message.text === "/start") {
    return;
  }
  if (!userState) {
    ctx.reply("please type /Start to start interacting with the bot");
    return;
  }
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
    ctx.reply("do you have an image of your lost items?", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "yes", callback_data: "yes_image" },
            { text: "no", callback_data: "no_image" },
          ],
        ],
      },
    });
  }
  if (action === "yes_image") {
    ctx.reply("upload your image here...");
  }
  if (action === "no_image") {
    ctx.reply("what is the item you lost? describe it with 3 words");
  }
  if (action === "Report") {
    ctx.reply("");
  }
});
bot.on("photo", async (ctx) => {
  const imageArray = ctx.message.photo;
  const imageUrl = imageArray[imageArray.length - 1].file_id;
  const file = await ctx.telegram.getFileLink(imageUrl);
  console.log(file.href);
  const response = await fetch(file.href);
  const fileStream = fs.createWriteStream(`image-${Date.now()}.jpg`);
  try {
    pipeline(response.body, fileStream, (err) => {
      console.log(err);
    });
    ctx.reply("your image is being processed...pls be patient 😊");
  } catch (err) {
    console.log("error saving the iamge:", err);
    ctx.reply("Error occured while saving Image, pls try agian later 😊");
  }
});
bot.command("help", (ctx) => {
  ctx.reply(
    "Welcome how can help you? this are the commands\n /start='to start', \n /help='to get help' \n /stop='to stop bot'"
  );
});
bot.launch();
console.log("bot litenig...");
