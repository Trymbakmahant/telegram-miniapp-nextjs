// hooks/useTelegramSDK.ts
import { useEffect, useState } from "react";

const useTelegramSDK = () => {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      setIsSdkLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.onload = () => setIsSdkLoaded(true);
    document.body.appendChild(script);
  }, []);

  return isSdkLoaded;
};

export default useTelegramSDK;
