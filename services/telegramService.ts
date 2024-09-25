const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export async function sendPhotoWithInlineKeyboard(
  chatId: number,
  imageUrl: string,
  caption: string,
  options: any
) {
  const response = await fetch(`${TELEGRAM_API_URL}/sendPhoto`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      photo: imageUrl, // Pass the image URL directly
      caption: caption,
      reply_markup: options.reply_markup,
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.description);
}
