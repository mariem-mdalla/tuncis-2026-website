const { z } = require("zod");

const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  affiliation: z.string().min(1, "Affiliation is required"),
  status: z.enum(["Researcher", "Practitioner", "PhD Student", "Student"]),
  doctoralConsortium: z.boolean(),
  galaDinner: z.boolean(),
  nvidiaCertification: z.boolean(),
  dietaryRestrictions: z.string().optional(),
});

module.exports = { registrationSchema };