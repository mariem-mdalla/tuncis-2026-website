const { pgTable, serial, text, boolean, timestamp } = require("drizzle-orm/pg-core");

const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  affiliation: text("affiliation").notNull(),
  status: text("status").notNull(),
  doctoralConsortium: boolean("doctoral_consortium").notNull(),
  galaDinner: boolean("gala_dinner").notNull(),
  nvidiaCertification: boolean("nvidia_certification").notNull(),
  dietaryRestrictions: text("dietary_restrictions"),
  createdAt: timestamp("created_at").defaultNow(),
});

module.exports = { registrations };