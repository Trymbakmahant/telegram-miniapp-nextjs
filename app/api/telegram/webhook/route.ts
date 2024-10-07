import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Message received from Telegram:", body);

  const chatId = body.message.chat.id;
  const responseText = `Hello, ${body.message.from.first_name}!`;

  // Respond to Telegram
  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: responseText,
      }),
    }
  );

  return NextResponse.json({ status: "ok" });
}
