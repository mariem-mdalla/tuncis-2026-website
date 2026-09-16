# 👥 How to Add the Scientific Committee (When You Receive the List)

Currently on the **Committees** page (`/committees`), the **Scientific Committee** section shows a placeholder:
> *"Les membres du Comité Scientifique seront annoncés prochainement."* / *"Scientific Committee members will be announced soon."*

When the organizers give you the final list of Scientific Committee members (Professors, Researchers, Universities), follow this step-by-step guide to add them cleanly to the UI.

---

## 📍 File to Edit
Open:
```
apps/frontend/src/pages/Committees.jsx
```

---

## 🛠️ Step 1: Add the Scientific Committee Members Array

Near the top of `Committees.jsx` (around line 20, right under `const organizing = [ ... ];`), define your `scientific` list:

```javascript
const scientific = [
  { name: "Prof. Nom Prénom 1", affiliation: "Université ou Laboratoire" },
  { name: "Prof. Nom Prénom 2", affiliation: "Université ou Laboratoire" },
  { name: "Prof. Nom Prénom 3", affiliation: "Université ou Laboratoire" },
  { name: "Prof. Nom Prénom 4", affiliation: "Université ou Laboratoire" },
  // Add as many members as you have on the list!
];
```

---

## 🛠️ Step 2: Replace the "Coming Soon" Box with the Member Cards

Scroll down in `Committees.jsx` to **lines 110–118**:

### Current Code:
```jsx
{/* 2 — Scientific Committee (coming soon) */}
<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
  <h2 className="font-heading text-2xl font-bold text-tuncis-blue mb-8 pb-3 border-b-2 border-tuncis-yellow/40 inline-block">
    {t("committees.scientific")}
  </h2>
  <div className="bg-white border border-gray-100 p-10 rounded-2xl shadow-xs flex items-center justify-center min-h-[120px] text-center">
    <p className="text-tuncis-gray italic text-base sm:text-lg">{t("committees.comingSoon")}</p>
  </div>
</motion.div>
```

### 📋 Replace it with this complete Grid Layout:
```jsx
{/* 2 — Scientific Committee */}
<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
  <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-tuncis-yellow/40">
    <h2 className="font-heading text-2xl font-bold text-tuncis-blue">
      {t("committees.scientific")}
    </h2>
    <span className="text-xs font-semibold uppercase tracking-wider text-tuncis-blue bg-tuncis-blue/5 px-3 py-1 rounded-full">
      {scientific.length} Members
    </span>
  </div>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
    {scientific.map((m, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.03 }}
        viewport={{ once: true }}
        whileHover={{ y: -2 }}
        className="bg-white border border-gray-100 hover:border-tuncis-blue/30 p-5 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 border-l-4 border-l-tuncis-blue group flex flex-col justify-center"
      >
        <h3 className="font-heading font-bold text-base sm:text-lg text-tuncis-blue group-hover:text-tuncis-blue-dark transition-colors">
          {m.name}
        </h3>
        <p className="text-xs sm:text-sm text-tuncis-gray/80 flex items-center gap-2 mt-1.5 font-medium">
          <Building2 size={14} className="text-tuncis-yellow/90 shrink-0" />
          <span>{m.affiliation}</span>
        </p>
      </motion.div>
    ))}
  </div>
</motion.div>
```

---

## 🌐 Optional: What if Affiliations Need English & French Translations?

If affiliations should translate between English and French (e.g. *"Université de Carthage"* vs *"University of Carthage"*):

### 1. In `apps/frontend/src/locales/fr/translation.json`:
Inside `"committees"`:
```json
"scientificMembers": [
  { "name": "Prof. Nom Prénom 1", "affiliation": "Université de Carthage" },
  { "name": "Prof. Nom Prénom 2", "affiliation": "Université de Sousse" }
]
```

### 2. In `apps/frontend/src/locales/en/translation.json`:
Inside `"committees"`:
```json
"scientificMembers": [
  { "name": "Prof. Nom Prénom 1", "affiliation": "University of Carthage" },
  { "name": "Prof. Nom Prénom 2", "affiliation": "University of Sousse" }
]
```

### 3. In `Committees.jsx`:
Inside the `Committees()` component:
```javascript
const scientific = t("committees.scientificMembers", { returnObjects: true }) || [];
```
Then map over `scientific` as shown in Step 2!

---

## 🚀 Testing & Pushing Your Changes
```bash
# Test locally
pnpm dev

# Check build
pnpm build

# Push to GitHub (Vercel deploys automatically)
git add .
git commit -m "Add scientific committee members"
git push origin main
```
