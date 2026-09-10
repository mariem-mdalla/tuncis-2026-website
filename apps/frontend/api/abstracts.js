import Busboy from 'busboy';
import nodemailer from 'nodemailer';
import dns from 'dns';

dns.setDefaultResultOrder("ipv4first");

export const config = {
  api: {
    bodyParser: false,
  },
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const SENDER_EMAIL = process.env.EMAIL_USER || "tuncis2026@horizon-tech.tn";
const ORGANIZER_EMAIL = process.env.NOTIFY_EMAIL || process.env.ORGANIZER_EMAIL || process.env.EMAIL_USER || "tuncis2026@horizon-tech.tn";

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

            <tr>
              <td style="padding: 30px 30px 10px 30px;">
                <h2 style="color: #022c5e; margin: 0 0 8px 0; font-size: 20px; font-weight: 700;">
                  ${title}
                </h2>
                ${subtitle ? `<p style="color: #64748b; margin: 0 0 20px 0; font-size: 14px; line-height: 1.5;">${subtitle}</p>` : ''}
              </td>
            </tr>

            <tr>
              <td style="padding: 10px 30px 30px 30px;">
                ${contentHtml}
              </td>
            </tr>

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

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    try {
      const busboy = Busboy({ headers: req.headers });
      const fields = {};
      let fileBuffer = null;
      let fileName = '';
      const filePromises = [];

      busboy.on('field', (name, val) => {
        fields[name] = val;
      });

      busboy.on('file', (name, file, info) => {
        fileName = info.filename;
        const chunks = [];
        const filePromise = new Promise((resFile, rejFile) => {
          file.on('data', (data) => chunks.push(data));
          file.on('end', () => {
            fileBuffer = Buffer.concat(chunks);
            resFile();
          });
          file.on('error', rejFile);
        });
        filePromises.push(filePromise);
      });

      const onFinishOrClose = async () => {
        try {
          await Promise.all(filePromises);
          resolve({ fields, fileBuffer, fileName });
        } catch (e) {
          reject(e);
        }
      };

      busboy.on('close', onFinishOrClose);
      busboy.on('finish', onFinishOrClose);

      busboy.on('error', (err) => {
        reject(err);
      });

      req.pipe(busboy);
    } catch (err) {
      reject(err);
    }
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { fields, fileBuffer, fileName } = await parseMultipart(req);
    const { fullName, email } = fields;

    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        message: "Full name and email address are required.",
      });
    }

    if (!fileBuffer || fileBuffer.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload your abstract in PDF format.",
      });
    }

    const submissionDate = new Date().toLocaleString("en-US", { timeZone: "Africa/Tunis" }) + " (Tunis Time)";

    const abstractTableRows = [
      ["Author Name", fullName],
      ["Author Email", email],
      ["Attached PDF File", fileName || "abstract.pdf"],
      ["File Size", `${(fileBuffer.length / 1024).toFixed(1)} KB`],
      ["Submission Date", submissionDate]
    ];

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

    // Send emails independently — one failure must not block the other
    console.log(`[Abstract] Sending to organizer: ${ORGANIZER_EMAIL}, applicant: ${email}`);

    try {
      await transporter.sendMail({
        from: `"TUNCIS 2026 Submissions" <${SENDER_EMAIL}>`,
        to: ORGANIZER_EMAIL,
        subject: `[Abstract Submission] ${fullName} - TUNCIS 2026`,
        html: organizerHtml,
        attachments: [
          {
            filename: fileName || "abstract.pdf",
            content: fileBuffer,
            contentType: "application/pdf",
          },
        ],
      });
      console.log(`[Abstract] Organizer email sent OK to ${ORGANIZER_EMAIL}`);
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

    return res.status(201).json({
      success: true,
      message: "Abstract submitted successfully.",
    });
  } catch (err) {
    console.error("Abstract submission error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to submit abstract. Please try again.",
    });
  }
}
