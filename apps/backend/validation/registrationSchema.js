const { z } = require("zod");

const registrationSchema = z.object({
  // ── Identity ─────────────────────────────────────────────────────
  fullName:             z.string().min(1, "Full name is required"),
  email:                z.string().email("Invalid email address"),
  phone:                z.string().min(3, "Phone number is required"),
  affiliation:          z.string().min(1, "Affiliation is required"),
  status:               z.string().default("Researcher"),
  category:             z.enum(["local", "intl"]).default("local"),
  // ── Attendance Mode ───────────────────────────────────────────────
  attendanceMode:       z.enum(["in_person", "online"]),
  // ── Participation Options ─────────────────────────────────────────
  day1:                 z.boolean().default(false),
  day2:                 z.boolean().default(false),
  accommodation:        z.boolean().default(false),
  galaDinner:           z.boolean().default(false),
  nvidiaCertification:  z.boolean().default(false),
  // ── Extra ────────────────────────────────────────────────────────
  dietaryRestrictions:  z.string().optional().default(""),
  totalAmountDue:       z.string().optional().default("0 DT"),
});

module.exports = { registrationSchema };