

import { NextResponse, NextRequest } from "next/server";
import { authenticate } from "./../middleware/auth";


interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
    
  };
}
export async function GET(req: NextRequest) {
  const auth = authenticate(req);

  if (auth !== true) {
    return auth; // Return the response from the authentication check
  }

  const userId = (req as AuthenticatedRequest).user.id;

  return NextResponse.json({ message: "Access granted", userId });
}
