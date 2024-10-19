
"use client"
import { useEffect, useState } from "react";

import jwt from "jsonwebtoken";
import { initData } from "@telegram-apps/sdk-react";
const JWT_SECRET = process.env.JWT_SECRET || "your-very-secure-secret";

export default function ProtectedPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

 
  useEffect(()=>{
    console.log(initData)
  },[initData])
  useEffect(() => {
    // Check if the token is already present in localStorage
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        setIsAuthenticated(true); // Token is valid
      } catch (err) {
        console.error("Invalid token:", err);
        startTelegramAuth(); // Token invalid, start Telegram authentication
      }
    } else {
      // No token found, initiate the Telegram authentication process
      startTelegramAuth();
    }

    setIsLoading(false); // Stop loading spinner
  }, []);

  // Function to initiate Telegram login/authentication
  const startTelegramAuth = async () => {
    try {
      // Simulate a POST request to your Telegram authentication API
      const response = await fetch("/api/auth/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: initData.receiver, // Replace with actual Telegram data
          username: "exampleUser",
          hash: "hash", // Replace with actual hash from Telegram login
        }),
      });

      if (!response.ok) {
        throw new Error("Authentication failed.");
      }

      const data = await response.json();
      
      // Save the JWT token to localStorage
      localStorage.setItem("token", data.token);

      // Set authenticated state to true
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Error during authentication:", err);
     
    }
  };

  if (isLoading) {
    return <p>Loading...</p>; // Loading spinner while checking authentication
  }

  if (!isAuthenticated) {
    return null; // Do not render anything until user is authenticated
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome! You have successfully accessed a protected page.</p>
    </div>
  );
}
