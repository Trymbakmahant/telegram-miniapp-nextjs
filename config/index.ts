const config = {
  botToken: process.env.BOT_TOKEN as string,
  miniAppUrl: process.env.MINI_APP_URL as string,
  baseUrl: process.env.BASE_URL || "https://your-app.com",
};

export default config;
