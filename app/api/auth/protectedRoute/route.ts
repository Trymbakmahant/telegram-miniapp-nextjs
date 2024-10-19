import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "your-very-secure-secret";
const COOKIE_NAME = "telegram-session";

// Middleware or function to verify token
export async function verifyToken(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cookies = req.headers.cookie;
    if (!cookies) {
      return res.status(401).json({ message: "No authentication token found" });
    }

    const { [COOKIE_NAME]: token } = cookie.parse(cookies);
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; username: string };

    // Attach user data to the request (if needed)
    req.user = decoded;

    return decoded; // Return the decoded token (user data)
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
