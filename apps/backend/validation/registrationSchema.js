const { z } = require("zod");

const registrationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is required"),
  affiliation: z.string().min(1, "Affiliation is required"),
  status: z.enum(["Researcher", "Engineer", "PhD Student", "Other"]),
  doctoralConsortium: z.boolean(),
  galaDinner: z.boolean(),
  nvidiaCertification: z.boolean(),
  dietaryRestrictions: z.string().optional(),
});

module.exports = { registrationSchema };