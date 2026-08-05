const express = require("express");
const cors = require("cors");
const { db } = require("./db");
const { registrations } = require("./db/schema");
const { registrationSchema } = require("./validation/registrationSchema");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/registrations", async (req, res) => {
  const parsed = registrationSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const [inserted] = await db
      .insert(registrations)
      .values(parsed.data)
      .returning();

    res.status(201).json({ success: true, data: inserted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
});

// GET registrations endpoint for the Admin Dashboard
app.get("/registrations", async (req, res) => {
  try {
    const data = await db.select().from(registrations);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Could not retrieve registrations." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});