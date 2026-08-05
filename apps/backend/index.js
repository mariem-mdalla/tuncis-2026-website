const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dns = require("dns");

// Render often fails with IPv6 for outgoing connections like Gmail SMTP.
// This forces Node to use IPv4 instead.
dns.setDefaultResultOrder("ipv4first");

const { db } = require("./db");
const { registrations } = require("./db/schema");
const { registrationSchema } = require("./validation/registrationSchema");

const app = express();
const PORT = process.env.PORT || 3001;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/registrations", async (req, res) => {
  console.log("📥 Received registration request:", req.body);
  const parsed = registrationSchema.safeParse(req.body);

  if (!parsed.success) {
    console.error("❌ Validation Error:", parsed.error.flatten().fieldErrors);
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

    // Send confirmation email asynchronously without blocking the response
    transporter.sendMail({
      from: `"TUNCIS 2026" <${process.env.EMAIL_USER}>`,
      to: parsed.data.email,
      subject: "Registration Confirmed — TUNCIS 2026",
      html: `<p>Hi ${parsed.data.fullName},</p>
             <p>Your registration for TUNCIS 2026 (October 23–24, Green Park Hotel, Sousse) is confirmed. We look forward to seeing you!</p>`,
    }).catch(emailErr => {
      console.error("Email failed to send:", emailErr);
    });

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