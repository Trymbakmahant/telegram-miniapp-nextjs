import crypto from "crypto"

interface TelegramAuthData {
  id: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: string;
  hash: string;
  [key: string]: string | undefined; // allow additional fields like `photo_url` or `username`
}

export const verifyTelegramAuth = (authData: TelegramAuthData): boolean => {
  const { hash, ...dataToCheck } = authData;

  // 1. Sort the data and concatenate it
  const dataString = Object.keys(dataToCheck)
    .sort()
    .map((key) => `${key}=${dataToCheck[key]}`)
    .join('\n');

  // 2. Create a hash using your bot's token
  const secretKey = crypto.createHash('sha256').update(process.env.BOT_TOKEN as string).digest('hex'); // Changed to 'hex'

  // 3. Generate an HMAC SHA-256 hash of the data string
  const computedHash = crypto.createHmac('sha256', secretKey).update(dataString).digest('hex'); // Ensure secretKey is hex

  // 4. Compare the hashes
  return computedHash === hash;
};

