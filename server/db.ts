import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL not set, using in-memory storage");
}

export const db = process.env.DATABASE_URL
  ? drizzle(new Pool({ connectionString: process.env.DATABASE_URL }), { schema })
  : null;
