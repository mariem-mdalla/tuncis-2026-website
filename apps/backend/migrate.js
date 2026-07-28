require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function run() {
  try {
    const sql = neon(process.env.DATABASE_URL);
    // Add column (nullable first)
    await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS full_name text`;
    // Update existing rows
    await sql`UPDATE registrations SET full_name = COALESCE(first_name, '') || ' ' || COALESCE(last_name, '') WHERE full_name IS NULL`;
    // Make not null
    await sql`ALTER TABLE registrations ALTER COLUMN full_name SET NOT NULL`;
    // Drop old columns
    await sql`ALTER TABLE registrations DROP COLUMN IF EXISTS first_name`;
    await sql`ALTER TABLE registrations DROP COLUMN IF EXISTS last_name`;
    console.log("Migration complete");
  } catch (err) {
    console.error(err);
  }
}

run();
