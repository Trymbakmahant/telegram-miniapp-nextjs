interface TelegramUser {
    auth_date: number;
    first_name: string;
    hash: string;
    id: number;
    last_name?: string;
    photo_url?: string;
    username?: string;
  }
  
  interface Window {
    onTelegramAuth?: (user: TelegramUser) => void;
    Telegram: {
      WebApp: {
        shareText: (text: string) => void;
      };
    };
  }