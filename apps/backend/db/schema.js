const { pgTable, serial, text, boolean, timestamp } = require("drizzle-orm/pg-core");

const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  affiliation: text("affiliation").notNull(),
  status: text("status").notNull(),
  day1: boolean("day1").default(false).notNull(),
  day2: boolean("day2").default(false).notNull(),
  galaDinner: boolean("gala_dinner").default(false).notNull(),
  nvidiaCertification: boolean("nvidia_certification").default(false).notNull(),
  dietaryRestrictions: text("dietary_restrictions"),
  category: text("category").default('local'),
  totalAmountDue: text("total_amount_due"),
  createdAt: timestamp("created_at").defaultNow(),
});

module.exports = { registrations };