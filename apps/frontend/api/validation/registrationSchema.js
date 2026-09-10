import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(3, "Phone number is required"),
  affiliation: z.string().min(1, "Affiliation is required"),
  status: z.string().default("Researcher"),
  category: z.enum(["local", "intl"]).default("local"),
  day1: z.boolean().default(false),
  day2: z.boolean().default(false),
  accommodation: z.boolean().default(false).optional(),
  galaDinner: z.boolean().default(false),
  nvidiaCertification: z.boolean().default(false),
  dietaryRestrictions: z.string().optional().default(""),
  totalAmountDue: z.string().optional().default("0 DT"),
});