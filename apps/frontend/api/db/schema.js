import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const registrations = pgTable("registrations", {
  // ── Identity ────────────────────────────────────────────────────
  id:                   serial("id").primaryKey(),
  fullName:             text("full_name").notNull(),
  email:                text("email").notNull(),
  phone:                text("phone").notNull(),
  affiliation:          text("affiliation").notNull(),
  status:               text("status").notNull(),
  category:             text("category").default("local"),          // "local" | "intl"
  // ── Attendance Mode ─────────────────────────────────────────────
  attendanceMode:       text("attendance_mode").notNull(),          // "in_person" | "online"
  // ── Participation Options ────────────────────────────────────────
  day1:                 boolean("day1").default(false).notNull(),
  day2:                 boolean("day2").default(false).notNull(),
  accommodation:        boolean("accommodation").default(false).notNull(),
  nvidiaCertification:  boolean("nvidia_certification").default(false).notNull(),
  galaDinner:           boolean("gala_dinner").default(false).notNull(),
  // ── Extra ───────────────────────────────────────────────────────
  dietaryRestrictions:  text("dietary_restrictions"),
  totalAmountDue:       text("total_amount_due"),
  createdAt:            timestamp("created_at").defaultNow(),
});