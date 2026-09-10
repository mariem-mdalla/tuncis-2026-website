import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema.js";

let db = null;
if (process.env.DATABASE_URL) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    db = drizzle(sql, { schema });
  } catch (err) {
    console.error("Failed to initialize database:", err.message);
  }
}

export { db };