import TelegramBot, {
  Message,
  SendMessageOptions,
} from "node-telegram-bot-api";
import config from "@/config";

// Initialize the Telegram bot with the bot token
const bot: TelegramBot = new TelegramBot(config.botToken, { polling: true });

// Define the types for the options object (for better type checking)
interface CustomOptions extends SendMessageOptions {
  reply_markup: {
    inline_keyboard: {
      text: string;
      url?: string;
      web_app?: { url: string };
    }[][];
  };
}

const botService = {
  run: async (): Promise<void> => {
    // Handle the "/start" command
    bot.onText(/\/start(?: (.+))?/, async (msg: Message) => {
      const chatId = msg.chat.id;

      // Define the image URL for the static image hosted in the Next.js public folder
      const imageUrl: string = `${config.baseUrl}/assets/images/logo.png`;

      // Define inline keyboard buttons
      const options: CustomOptions = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Launch",
                web_app: { url: config.miniAppUrl },
              },
            ],
          ],
        },
      };

      try {
        // Send the photo using the public URL
        await bot.sendPhoto(chatId, imageUrl, {
          caption: "Welcome! Check your rating and receive rewards.",
          ...options,
        });
      } catch (err) {
        console.error("Error sending photo:", err);
      }
    });

    // Handle channel posts (e.g., from the Slav News channel)
    bot.on("channel_post", (msg: Message) => {
      if (msg.chat.type === "channel") {
        console.log("Channel post received:", msg);
      }
    });

    // Handle errors during polling
    bot.on("polling_error", (error: any) => {
      console.error("Polling error:", error);
    });

    // Log when bot starts polling
    bot.on("polling", () => {
      console.log("Bot is polling for updates...");
    });
  },

  bot,
};

export default botService;
