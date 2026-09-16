# TUNCIS 2026 — Developer Handover

Welcome to the **TUNCIS 2026** project!

The website and database are **already deployed and live on Vercel**.

---

## ⚡ Commands & Package Installation Guide

This project is a monorepo using **pnpm** and **Turborepo**. Follow these exact steps to run or work on the project:

### 1. Prerequisites
- **Node.js**: Version 18+ (Node 20+ recommended).
- **pnpm**: If you don't have `pnpm` installed on your machine yet, install it globally via npm:
  ```bash
  npm install -g pnpm
  ```

### 2. Install All Packages (One Single Command)
From the root folder of the project, run:
```bash
pnpm install
```
> 💡 *Note: Because this is a pnpm monorepo workspace, `pnpm install` automatically downloads and installs **all dependencies for both the frontend and backend** at the same time.*

### 3. Setup Your Local Environment File
Place the `.env` file you were given into the `apps/backend/` folder:
```
apps/backend/.env
```
*(You can also use `.env.example` as a template).*

### 4. Start the Project Locally
```bash
pnpm dev
```
- **Frontend (Website)** runs on: `http://localhost:5173`
- **Backend (API)** runs on: `http://localhost:3001`
- Any code changes you make will automatically reload in your browser!

### 5. Check for Build Errors Before Pushing (Recommended)
Before pushing to GitHub, you can test if the site compiles cleanly:
```bash
pnpm build
```

### 6. How to Deploy Your Changes
Because Vercel is already linked to this GitHub repository, deploying is as simple as pushing to Git:
```bash
git add .
git commit -m "Your update description"
git push origin main
```
Vercel will automatically detect the push, build, and deploy the new version live in ~1 minute!

---

### 📦 How to Install a New Package (If Needed in the Future)
If you ever need to install an additional npm package:
- **To add a package to the Frontend**:
  ```bash
  pnpm --filter frontend add <package-name>
  ```
  *(Example: `pnpm --filter frontend add lucide-react`)*

- **To add a package to the Backend**:
  ```bash
  pnpm --filter functions add <package-name>
  ```
  *(Example: `pnpm --filter functions add axios`)*

---

## 📖 Guides for Specific Tasks

| Guide | Description |
|---|---|
| 👉 **[HOW-TO-EDIT-EMAILS-AND-PAGES.md](./HOW-TO-EDIT-EMAILS-AND-PAGES.md)** | **Email Customization & Bank Info**, routes map, fee calculation, and updating text/translations. |
| 👉 **[HOW-TO-ADD-SCIENTIFIC-COMMITTEE.md](./HOW-TO-ADD-SCIENTIFIC-COMMITTEE.md)** | **Adding Scientific Committee members**: exact code to replace the "coming soon" box with member cards. |

