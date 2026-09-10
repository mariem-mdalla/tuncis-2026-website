const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { drizzle } = require("drizzle-orm/neon-http");
const { neon } = require("@neondatabase/serverless");
const schema = require("./schema");

if (!process.env.DATABASE_URL) {
  require("dotenv").config();
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

module.exports = { db };