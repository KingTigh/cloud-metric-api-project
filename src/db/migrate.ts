import { pool } from "./index";

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      type TEXT NOT NULL,
      payload JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  console.log("migration_complete");
  await pool.end();
}

migrate().catch((err) => {
  console.error("migration_failed", err);
  process.exit(1);
});
