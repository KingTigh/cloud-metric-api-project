import { Pool } from "pg";
import { config } from "../config";

if (!config.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export const pool = new Pool({
  connectionString: config.DATABASE_URL
});

export async function closeDb() {
  await pool.end();
}

