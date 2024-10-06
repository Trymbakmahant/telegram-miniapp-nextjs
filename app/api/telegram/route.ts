// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     console.log(body);
//     if (body.message && body.message.text === "/start") {
//       const chatId = body.message.chat.id;
//       console.log(body);
//       // Image URL
//       const imageUrl =
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShH3iHRhGytuJaDhNq9J89H5W27TXwbsP4tZZknqDs8nOW6KkBiw8vzxfe2LqkToAU2VI&usqp=CAU"; // Pass your image URL

//       // Define inline keyboard buttons
//       const options = {
//         reply_markup: {
//           inline_keyboard: [
//             [
//               {
//                 text: "Launch",
//                 web_app: { url: process.env.MINI_APP_URL }, // Use your mini app URL from env variables
//               },
//             ],
//           ],
//         },
//       };

//       // Send the photo with inline buttons
//       await sendPhotoWithInlineKeyboard(
//         chatId,
//         imageUrl,
//         "Welcome! Check your rating and receive rewards.",
//         options
//       );
//     }

//     return NextResponse.json({ status: "ok" });
//   } catch (error) {
//     console.error("Error handling Telegram webhook:", error);
//     return NextResponse.json(
//       { status: "error", message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export const dynamic = "force-dynamic";

export const fetchCache = "force-no-store";

import { Bot, webhookCallback } from "grammy";

const token = process.env.MINI_APP_URL;

if (!token)
  throw new Error("TELEGRAM_BOT_TOKEN environment variable not found.");

const bot = new Bot(token);
bot.on("message:text", async (ctx) => {
  await ctx.reply(ctx.message.text);
});

export const POST = webhookCallback(bot, "std/http");
