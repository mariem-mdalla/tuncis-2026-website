# ✉️ Developer Guide: Editing Emails, Routes & Website Content

> **Note for the incoming developer:**  
> The project, database, and Vercel deployment are **already set up and live**.  
> This guide covers specifically the things you might need to touch: **customizing the emails (adding bank/RIB info, changing recipients)**, **finding which file belongs to which page**, and **updating website texts**.

---

## ⚡ Quick Terminal Commands

```bash
# 1. If you don't have pnpm installed yet:
npm install -g pnpm

# 2. Install all packages for frontend & backend:
pnpm install

# 3. Start local development (frontend on :5173, backend on :3001):
pnpm dev

# 4. Check that build passes before pushing:
pnpm build

# 5. Push to GitHub (Vercel redeploys automatically):
git add .
git commit -m "Your update description"
git push origin main
```

---

## 1. 📧 The Email System: Exact Files & How to Edit

When a user registers or submits an abstract, automated emails are sent via Nodemailer.

### ⚠️ Crucial Rule for Editing Emails
There are two files that contain the email logic:
1. **`apps/frontend/api/registrations.js`** *(Runs on Vercel in production)*
2. **`apps/backend/index.js`** *(Runs locally if you test on your machine)*

👉 **Always edit BOTH files when changing email content so production and local stay identical!**

---

### A. How to Add Bank / RIB / Payment Info in the Attendee Email

When an attendee registers, they receive an email confirmation. Currently, the email tells them:
> *"Payment instructions will be communicated to you by the organizing committee."*

#### To add your Bank details (RIB, IBAN, Beneficiary):
Open **`apps/frontend/api/registrations.js`** (and `apps/backend/index.js`).
Look around **line 210** inside `const attendeeHtml = wrapEmailHtml({ ... })`.

Find this block:
```html
<p style="font-size: 13px; color: #64748b; margin-top: 20px; line-height: 1.6;">
  <strong>Payment & Next Steps:</strong> Payment instructions will be communicated to you by the organizing committee. Please keep this email for your records.
</p>
```

Replace it with this ready-to-use styled box:
```html
<div style="margin-top: 24px; padding: 18px 20px; border-radius: 10px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 5px solid #022c5e;">
  <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: 800; color: #022c5e; text-transform: uppercase; letter-spacing: 0.5px;">
    💳 Instructions de Paiement / Bank Details (Virement Bancaire)
  </p>
  <p style="margin: 0 0 8px 0; font-size: 13px; color: #334155; line-height: 1.5;">
    Veuillez effectuer votre virement sur le compte bancaire suivant en indiquant votre <strong>Nom et Prénom</strong> dans le libellé :
  </p>
  <table width="100%" cellpadding="6" cellspacing="0" style="font-size: 13px; color: #334155; margin-top: 8px;">
    <tr>
      <td style="font-weight: 700; width: 35%; color: #022c5e;">Bénéficiaire :</td>
      <td>Association TunAISia</td>
    </tr>
    <tr>
      <td style="font-weight: 700; color: #022c5e;">Banque :</td>
      <td>Nom de votre banque (ex: BIAT / Attijari / etc.)</td>
    </tr>
    <tr>
      <td style="font-weight: 700; color: #022c5e;">RIB (20 chiffres) :</td>
      <td><code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-family: monospace;">XX XXX XXXXXXXXXXX XX</code></td>
    </tr>
    <tr>
      <td style="font-weight: 700; color: #022c5e;">IBAN (International) :</td>
      <td><code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-family: monospace;">TN59 XXXX XXXX XXXX XXXX XXXX</code></td>
    </tr>
    <tr>
      <td style="font-weight: 700; color: #022c5e;">Code SWIFT / BIC :</td>
      <td><code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-family: monospace;">XXXXXXXX</code></td>
    </tr>
  </table>
  <p style="margin: 12px 0 0 0; font-size: 12px; color: #64748b;">
    Une fois le virement effectué, veuillez envoyer une copie du justificatif à <a href="mailto:tuncis2026@horizon-tech.tn" style="color: #022c5e; font-weight: 700;">tuncis2026@horizon-tech.tn</a>.
  </p>
</div>
```

Also update the plain-text version in `attendeeText` around line 234:
```text
Instructions de Paiement (Virement Bancaire):
- Bénéficiaire: Association TunAISia
- RIB: XX XXX XXXXXXXXXXX XX
- IBAN: TN59 XXXX XXXX XXXX XXXX XXXX
- Merci de mentionner votre Nom & Prénom dans le libellé et d'envoyer le reçu à tuncis2026@horizon-tech.tn
```

---

### B. How to Change Who Receives Notification Emails
Whenever a participant registers or submits an abstract PDF, an email is sent to the organizer.

- **To change the recipient email on Vercel:**
  1. Open your Vercel Dashboard for this project.
  2. Go to **Settings** > **Environment Variables**.
  3. Edit `NOTIFY_EMAIL` and type the new email address (e.g. `new-email@domain.com`).
  4. Go to **Deployments** > Click the three dots `...` on the latest deployment > Click **Redeploy**.
- **To change it locally:**
  Edit `apps/backend/.env` and update `NOTIFY_EMAIL=...`.

---

### C. Where the Abstract (PDF) Submission Email is Defined
When someone submits a PDF on the *Call for Communications* page:
- **`apps/frontend/api/abstracts.js`** (Vercel)
- **`apps/backend/index.js`** (Local)

The uploaded PDF is automatically attached to the email sent to `NOTIFY_EMAIL`.

---

## 2. 🗺️ Website Routes: Which File Belongs to Which Page?

All routes are declared in **`apps/frontend/src/App.jsx`**:

| Page / Route URL | Component File to Open | What it is |
|---|---|---|
| `/` | `apps/frontend/src/pages/Home.jsx` | Home page (Hero, countdown, tracks, sponsors) |
| `/programme` | `apps/frontend/src/pages/Programme.jsx` | Schedule timeline (Day 1 & Day 2 tabs) |
| `/register` | `apps/frontend/src/pages/Registration.jsx` | Registration form & price calculator |
| `/call-for-communications` | `apps/frontend/src/pages/CallForCommunications.jsx` | Call for papers & PDF upload modal |
| `/committees` | `apps/frontend/src/pages/Committees.jsx` | Chairs, co-chairs & scientific committee *(see [HOW-TO-ADD-SCIENTIFIC-COMMITTEE.md](./HOW-TO-ADD-SCIENTIFIC-COMMITTEE.md))* |
| `/practical-info` | `apps/frontend/src/pages/PracticalInfo.jsx` | Venue hotel (Marhaba Palace), travel & access |
| `/best-project-award` | `apps/frontend/src/pages/BestPaperAward.jsx` | Best project competition details |
| `/nvidia-certification` | `apps/frontend/src/pages/NvidiaCertification.jsx` | NVIDIA DLI LLM certified workshop page |
| `/partners` | `apps/frontend/src/pages/Partners.jsx` | Partner logos and descriptions |
| `/about` | `apps/frontend/src/pages/About.jsx` | About AIS and TunAISia chapter |
| Header Navigation | `apps/frontend/src/components/Header.jsx` | Top menu & navigation drawer |
| Footer | `apps/frontend/src/components/Footer.jsx` | Footer links and copyright |

---

## 3. 🌐 How to Change Website Texts & Translations

All text on the website is translated into French and English using two files:
- **French**: `apps/frontend/src/locales/fr/translation.json`
- **English**: `apps/frontend/src/locales/en/translation.json`

### Fast way to change any text:
1. Copy the phrase you want to change from the browser (e.g. *"October 23–24, 2026"*).
2. Use **Search in Files** (`Ctrl + Shift + F` in VS Code).
3. Update both `fr/translation.json` and `en/translation.json`.
4. Save and commit.

---

## 4. 💰 How to Change Registration Prices

Registration prices are in **`apps/frontend/src/pages/Registration.jsx`** at line 9:

```javascript
const getFeeRows = (t) => [
  { key: "day1",          label: t("registration.fees.day1"),          local: 170, intl: 70,  onlineAllowed: true  },
  { key: "day2",          label: t("registration.fees.day2"),          local: 120, intl: 40,  onlineAllowed: true  },
  { key: "accommodation", label: t("registration.fees.accommodation"), local: 170, intl: 70,  onlineAllowed: false },
  { key: "nvidia",        label: t("registration.fees.nvidia"),        local: 130, intl: 100, onlineAllowed: true  },
  { key: "gala",          label: t("registration.fees.gala"),          local: 100, intl: 40,  onlineAllowed: false },
];
```
- `local`: Price in Tunisian Dinars (DT)
- `intl`: Price in Euros (€)
- `onlineAllowed`: `false` will disable/gray out the option if the user picks "Online" mode.
