"use client";

// @ts-ignore
import { useInitData } from "@telegram-apps/sdk-react";
import styles from "./page.module.css";
import { useAuth, User } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRef } from "react";

export default function Home() {
  const initData = useInitData();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const hasRun = useRef(false);

  const authenticate = async () => {
    // if (token || loading) return;
    setLoading(true);
    const fetchUserData: User = {
      auth_date: initData?.authDate.getTime()
        ? initData?.authDate.getTime() / 1000
        : 0,
      first_name: initData?.user?.firstName ? initData?.user?.firstName : "",
      hash: initData?.hash ? initData?.hash : "",
      id: initData?.user?.id ? initData?.user?.id : 0,
      last_name: initData?.user?.lastName ? initData?.user?.lastName : "",
      photo_url: initData?.user?.photoUrl ? initData?.user?.photoUrl : "",
      username: initData?.user?.username ? initData?.user?.username : "",
      premium: initData?.user?.isPremium ? initData?.user?.isPremium : false,
      referral: initData?.startParam ? initData?.startParam : "",
    };
    const tokenData = await login(fetchUserData);
    if (tokenData) {
      setToken(tokenData);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!hasRun.current) {
      authenticate();
      hasRun.current = true;
    }
  }, []);
  return (
    <div className={styles.page}>{loading ? "Loading" : `Authenticated`}</div>
  );
}
