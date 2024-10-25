import crypto from "crypto";

export const verifyTelegramAuth = (authData: any): boolean => {
  try {
    const { hash, ...dataToCheck } = authData;
    console.log(dataToCheck)
    // 1. Filter only the required fields and sort them alphabetically
    const requiredKeys = ['auth_date', 'first_name', 'id', 'last_name', 'photo_url', 'username'];
    const dataString = requiredKeys
      .filter(key => key in dataToCheck) // Filter out undefined keys
      .sort() // Sort alphabetically
      .map(key => `${key}=${dataToCheck[key]}`) // Concatenate key=value
      .join('\n'); // Join by newlines
    console.log(dataString)
    // 2. Ensure that BOT_TOKEN is set
    const botToken = process.env.BOT_TOKEN;
    if (!botToken) {
      throw new Error("BOT_TOKEN is not defined in environment variables");
    }

    // 3. Create an HMAC SHA-256 hash using the bot token directly
    const computedHash = crypto
      .createHmac("sha256", botToken) // Use botToken directly
      .update(dataString) // Hash the data string
      .digest("hex");

    console.log('Computed Hash:', computedHash, 'Auth Hash:', hash);

    // 4. Compare the computed hash with the one provided by Telegram
    return computedHash === hash;
  } catch (e: any) {
    console.log(e);
    return false;
  }
};
