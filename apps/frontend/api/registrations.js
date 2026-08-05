import { db } from './db/index.js';
import { registrations } from './db/schema.js';
import { registrationSchema } from './validation/registrationSchema.js';
import nodemailer from 'nodemailer';
import dns from 'dns';

// Force IPv4 if Vercel encounters the IPv6 ENETUNREACH bug on Lambda
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
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

      // In Serverless functions, we MUST await all tasks before returning the response,
      // otherwise the function is frozen and the email will be killed.
      try {
        await transporter.sendMail({
          from: `"TUNCIS 2026" <${process.env.EMAIL_USER}>`,
          to: parsed.data.email,
          subject: "Registration Confirmed — TUNCIS 2026",
          html: `<p>Hi ${parsed.data.fullName},</p>
                 <p>Your registration for TUNCIS 2026 (October 23–24, Green Park Hotel, Sousse) is confirmed. We look forward to seeing you!</p>`,
        });
      } catch (emailErr) {
        console.error("Email failed to send:", emailErr);
      }

      return res.status(201).json({ success: true, data: inserted });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
    }
  } 
  
  else if (req.method === 'GET') {
    try {
      const data = await db.select().from(registrations);
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Could not retrieve registrations." });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
