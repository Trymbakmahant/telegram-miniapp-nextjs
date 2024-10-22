import { NextResponse ,NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-very-secure-secret";
interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
    
  };
}
export function authenticate(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1]; // Extract token from Bearer

  if (!token) {
    return NextResponse.json(
      { message: "Authorization token is missing" },
      { status: 401 }
    );
  }

  try {
    // Verify the token and get the user data
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      username: string;
    }; // Cast the decoded value
    (req as AuthenticatedRequest).user = decoded; // Attach user data to the request object
    return true; // Token is valid
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
