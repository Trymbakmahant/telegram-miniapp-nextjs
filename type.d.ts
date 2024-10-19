// types.d.ts
import { NextApiRequest } from "next";

declare module "next" {
  interface NextApiRequest {
    user?: { id: string; username: string };
  }
}
