const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
if (!process.env.EMAIL_USER) {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");
const dns = require("dns");

// Force IPv4 for external SMTP connections
dns.setDefaultResultOrder("ipv4first");

const { db } = require("./db");
const { registrations } = require("./db/schema");
const { registrationSchema } = require("./validation/registrationSchema");

const app = express();
const PORT = process.env.PORT || 3001;

// Multer memory storage for PDF abstract uploads (max 10MB)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Configure Nodemailer transporter with existing Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const SENDER_EMAIL = process.env.EMAIL_USER || "tuncis2026@horizon-tech.tn";
const ORGANIZER_EMAIL = process.env.NOTIFY_EMAIL || process.env.ORGANIZER_EMAIL || process.env.EMAIL_USER || "tuncis2026@horizon-tech.tn";

app.use(cors({ origin: true }));
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Shared Email Styling Helper ──────────────────────────
function wrapEmailHtml({ title, subtitle, contentHtml }) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f9; padding: 30px 15px;">
      <tr>
        <td align="center">
          <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
            <!-- Header Banner -->
            <tr>
              <td style="background-color: #022c5e; padding: 32px 30px; text-align: center; border-bottom: 4px solid #FBD53A;">
                <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 1px;">
                  TUNCIS <span style="color: #FBD53A;">2026</span>
                </h1>
                <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px;">
                  October 23–24, 2026 · Sousse, Tunisia
                </p>
              </td>
            </tr>

            <!-- Title & Subtitle -->
            <tr>
              <td style="padding: 30px 30px 10px 30px;">
                <h2 style="color: #022c5e; margin: 0 0 8px 0; font-size: 20px; font-weight: 700;">
                  ${title}
                </h2>
                ${subtitle ? `<p style="color: #64748b; margin: 0 0 20px 0; font-size: 14px; line-height: 1.5;">${subtitle}</p>` : ''}
              </td>
            </tr>

            <!-- Content Area -->
            <tr>
              <td style="padding: 10px 30px 30px 30px;">
                ${contentHtml}
              </td>
            </tr>

            <!-- Venue & Event Footer Box -->
            <tr>
              <td style="background-color: #f8fafc; padding: 20px 30px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #022c5e; text-transform: uppercase; letter-spacing: 0.5px;">
                  Venue & Location
                </p>
                <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.4;">
                  <strong>Hotel Marhaba Palace</strong>, Port El Kantaoui, Sousse, Tunisia
                </p>
              </td>
            </tr>

            <!-- Copyright Footer -->
            <tr>
              <td style="background-color: #022c5e; padding: 18px 30px; text-align: center;">
                <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 12px;">
                  © 2026 TUNCIS · Organized by TunAISia & AIS · <a href="mailto:tuncis2026@horizon-tech.tn" style="color: #FBD53A; text-decoration: none;">tuncis2026@horizon-tech.tn</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

function renderTableRows(rows) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin-top: 12px;">
      ${rows.map(([label, value], idx) => `
        <tr style="background-color: ${idx % 2 === 0 ? '#f8fafc' : '#ffffff'}; border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #022c5e; width: 38%; vertical-align: top;">
            ${label}
          </td>
          <td style="padding: 12px 16px; font-size: 13px; color: #334155; width: 62%; vertical-align: top;">
            ${value || '—'}
          </td>
        </tr>
      `).join('')}
    </table>
  `;
}

// ── 1. REGISTRATION ENDPOINT ─────────────────────────────
app.post("/registrations", async (req, res) => {
  console.log("Received registration request:", req.body);
  const parsed = registrationSchema.safeParse(req.body);

  if (!parsed.success) {
    console.error("Validation Error:", parsed.error.flatten().fieldErrors);
    return res.status(400).json({
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    // Insert into Postgres Database
    let inserted = null;
    try {
      const [record] = await db.insert(registrations).values(parsed.data).returning();
      inserted = record;
    } catch (dbErr) {
      console.warn("Database insertion warning:", dbErr.message);
    }

    const {
      fullName, email, phone, affiliation, status, category,
      day1, day2, accommodation, galaDinner, nvidiaCertification,
      dietaryRestrictions, totalAmountDue
    } = parsed.data;

    const registrationTableRows = [
      ["Full Name", fullName],
      ["Email Address", email],
      ["Phone Number", phone],
      ["Affiliation", affiliation],
      ["Academic / Professional Status", status],
      ["Participant Category", category === "intl" ? "International" : "Local (Tunisia)"],
      ["Day 1 Attendance (Oct 23)", day1 ? "Yes" : "No"],
      ["Day 2 Attendance (Oct 24)", day2 ? "Yes" : "No"],
      ["Hotel Accommodation", accommodation ? "Requested (TBC)" : "Not included"],
      ["NVIDIA AI Certification", nvidiaCertification ? "Enrolled" : "No"],
      ["Gala Dinner", galaDinner ? "Included" : "No"],
      ["Total Amount Due", `<strong>${totalAmountDue || '0'}</strong>`],
      ["Dietary / Special Needs", dietaryRestrictions || "None specified"],
      ["Submission Date", new Date().toLocaleString("en-US", { timeZone: "Africa/Tunis" }) + " (Tunis Time)"]
    ];

    // Email 1: Notification to Organizer
    const organizerHtml = wrapEmailHtml({
      title: "New Conference Registration Received",
      subtitle: `A new registration has been submitted by <strong>${fullName}</strong>.`,
      contentHtml: `
        <p style="font-size: 14px; color: #334155; margin-bottom: 12px;">
          Below are the attendee's full registration details:
        </p>
        ${renderTableRows(registrationTableRows)}
      `
    });

    // Email 2: Confirmation to Registrant
    const attendeeHtml = wrapEmailHtml({
      title: "Registration Confirmation — TUNCIS 2026",
      subtitle: `Dear ${fullName}, thank you for registering for TUNCIS 2026!`,
      contentHtml: `
        <p style="font-size: 14px; color: #334155; line-height: 1.6; margin-bottom: 16px;">
          We are delighted to confirm your registration for the <strong>Tunisian Conference on Artificial Intelligence and Scientific Innovation (TUNCIS 2026)</strong>.
        </p>
        <p style="font-size: 14px; font-weight: 700; color: #022c5e; margin-bottom: 8px;">
          Summary of Your Registration:
        </p>
        ${renderTableRows(registrationTableRows)}
        <p style="font-size: 13px; color: #64748b; margin-top: 20px; line-height: 1.6;">
          <strong>Payment &amp; Next Steps:</strong> Payment instructions will be communicated to you by the organizing committee. Please keep this email for your records.
        </p>
      `
    });

    console.log(`[Registration] Sending to organizer: ${ORGANIZER_EMAIL}, attendee: ${email}`);

    try {
      await transporter.sendMail({
        from: `"TUNCIS 2026" <${SENDER_EMAIL}>`,
        to: ORGANIZER_EMAIL,
        subject: `[New Registration] ${fullName} (${affiliation}) - TUNCIS 2026`,
        html: organizerHtml,
      });
      console.log(`[Registration] Organizer email sent OK`);
    } catch (mailErr) {
      console.error(`[Registration] Organizer email FAILED:`, mailErr.message);
    }

    try {
      await transporter.sendMail({
        from: `"TUNCIS 2026 Organizing Committee" <${SENDER_EMAIL}>`,
        to: email,
        subject: "Registration Confirmed - TUNCIS 2026",
        html: attendeeHtml,
      });
      console.log(`[Registration] Attendee email sent OK to ${email}`);
    } catch (mailErr) {
      console.error(`[Registration] Attendee email FAILED to ${email}:`, mailErr.message);
    }

    res.status(201).json({ success: true, data: inserted || parsed.data });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
});

// ── 2. ABSTRACT SUBMISSION ENDPOINT ──────────────────────
app.post("/abstracts", upload.single("file"), async (req, res) => {
  console.log("Received abstract submission:", req.body);
  const { fullName, email } = req.body;
  const file = req.file;

  if (!fullName || !email) {
    return res.status(400).json({
      success: false,
      message: "Full name and email address are required.",
    });
  }

  if (!file) {
    return res.status(400).json({
      success: false,
      message: "Please upload your abstract in PDF format.",
    });
  }

  try {
    const submissionDate = new Date().toLocaleString("en-US", { timeZone: "Africa/Tunis" }) + " (Tunis Time)";

    const abstractTableRows = [
      ["Author Name", fullName],
      ["Author Email", email],
      ["Attached PDF File", file.originalname],
      ["File Size", `${(file.size / 1024).toFixed(1)} KB`],
      ["Submission Date", submissionDate]
    ];

    // Email 1: Notification to Organizer with PDF attachment
    const organizerHtml = wrapEmailHtml({
      title: "New Abstract Submission Received",
      subtitle: `A new abstract has been submitted by <strong>${fullName}</strong> for the Innovative Research Project Pitching Session.`,
      contentHtml: `
        <p style="font-size: 14px; color: #334155; margin-bottom: 12px;">
          The author's abstract details are summarized below. The uploaded PDF is attached directly to this email:
        </p>
        ${renderTableRows(abstractTableRows)}
      `
    });

    // Email 2: Confirmation to Applicant
    const applicantHtml = wrapEmailHtml({
      title: "Abstract Submission Received — TUNCIS 2026",
      subtitle: `Dear ${fullName}, thank you for submitting your abstract.`,
      contentHtml: `
        <p style="font-size: 14px; color: #334155; line-height: 1.6; margin-bottom: 16px;">
          We have successfully received your abstract for the <strong>Innovative Research Project Pitch Session</strong> at TUNCIS 2026.
        </p>
        <p style="font-size: 14px; font-weight: 700; color: #022c5e; margin-bottom: 8px;">
          Submission Summary:
        </p>
        ${renderTableRows(abstractTableRows)}
        <p style="font-size: 13px; color: #64748b; margin-top: 20px; line-height: 1.6;">
          <strong>Review Process:</strong> Our scientific review committee will review your submission and contact you with notification results before <strong>September 30, 2026</strong>.
        </p>
      `
    });

    console.log(`[Abstract] Sending to organizer: ${ORGANIZER_EMAIL}, applicant: ${email}`);

    try {
      await transporter.sendMail({
        from: `"TUNCIS 2026 Submissions" <${SENDER_EMAIL}>`,
        to: ORGANIZER_EMAIL,
        subject: `[Abstract Submission] ${fullName} - TUNCIS 2026`,
        html: organizerHtml,
        attachments: [{ filename: file.originalname, content: file.buffer }],
      });
      console.log(`[Abstract] Organizer email sent OK`);
    } catch (mailErr) {
      console.error(`[Abstract] Organizer email FAILED:`, mailErr.message);
    }

    try {
      await transporter.sendMail({
        from: `"TUNCIS 2026 Organizing Committee" <${SENDER_EMAIL}>`,
        to: email,
        subject: "Abstract Submission Confirmation - TUNCIS 2026",
        html: applicantHtml,
      });
      console.log(`[Abstract] Applicant email sent OK to ${email}`);
    } catch (mailErr) {
      console.error(`[Abstract] Applicant email FAILED to ${email}:`, mailErr.message);
    }

    res.status(201).json({
      success: true,
      message: "Abstract submitted successfully.",
    });
  } catch (err) {
    console.error("Abstract submission error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to submit abstract. Please try again.",
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`TUNCIS 2026 Backend running on port ${PORT}`);
  console.log(`Sender: ${SENDER_EMAIL} | Organizer Recipient: ${ORGANIZER_EMAIL}`);
});
