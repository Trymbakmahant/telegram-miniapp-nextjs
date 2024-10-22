import crypto from "crypto";

export const verifyTelegramAuth = (authData: any): boolean => {
  try {
    const { hash, ...dataToCheck } = authData;

    // 1. Sort the data and concatenate it, filtering out undefined values
    const dataString = Object.keys(dataToCheck)
      .sort()
      .map((key) => {
        const value = dataToCheck[key];
        return value ? `${key}=${value}` : null;
      })
      .filter(Boolean) // Filter out null values
      .join("\n");

    // Check if dataString is valid
    if (!dataString) {
      throw new Error("Data string is undefined or empty");
    }

    // 2. Ensure that BOT_TOKEN is set
    const botToken = process.env.BOT_TOKEN;
    if (!botToken) {
      throw new Error("BOT_TOKEN is not defined in environment variables");
    }

    // 3. Create a hash using your bot's token
    const secretKey = crypto
      .createHash("sha256")
      .update(botToken)
      .digest("hex");

    // 4. Generate an HMAC SHA-256 hash of the data string
    const computedHash = crypto
      .createHmac("sha256", secretKey)
      .update(dataString) // Ensure this is a string
      .digest("hex");
    // 5. Compare the hashes
    return computedHash === hash;
  } catch (e: any) {
    console.log(e.message, "error");
    return false;
  }
};
