const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { db } = require("./db");
const { registrations } = require("./db/schema");
const { registrationSchema } = require("./validation/registrationSchema");

const app = express();

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

exports.api = functions.https.onRequest(app);