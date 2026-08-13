require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function run() {
  try {
    const sql = neon(process.env.DATABASE_URL);
    // Drop old column
    await sql`ALTER TABLE registrations DROP COLUMN IF EXISTS doctoral_consortium`;
    
    // Add new columns
    await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS day1 boolean DEFAULT false NOT NULL`;
    await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS day2 boolean DEFAULT false NOT NULL`;
    await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS category text DEFAULT 'local'`;
    await sql`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS total_amount_due text`;
    
    console.log("Migration complete");
  } catch (err) {
    console.error(err);
  }
}

run();
