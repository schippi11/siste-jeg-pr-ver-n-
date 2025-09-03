# Dubeditter Store 🛒

En enkel nettbutikk bygget med **Next.js 14**, **TypeScript** og **Tailwind CSS**.  
Her selges små og kule dubeditter – med handlekurv, Stripe checkout og admin-panel.

---

## 🚀 Funksjoner
- Produkter med kategorier, bilder og pris
- Handlekurv med summering
- Stripe Checkout for betaling
- Admin-panel med:
  - KPI-er (omsetning, ordreantall, snittordre)
  - Graf over omsetning pr dag
  - Eksport av ordre til CSV
  - Detaljvisning av enkeltordre
- Egen sider: Frakt, Retur, Personvern
- Tilpasset logo og favicon

---

## 📂 Struktur
```
app/            # Next.js App Router
 ├─ page.tsx    # Forsiden (produkter + handlekurv)
 ├─ admin/      # Admin-panel
 ├─ success/    # Betaling vellykket
 ├─ cancel/     # Betaling avbrutt
 ├─ frakt/      # Infoside
 ├─ retur/      # Infoside
 └─ personvern/ # Infoside
components/
 └─ ui/         # Enkle UI-komponenter (Button, Card)
public/         # Logo, ikoner og produktbilder
```

---

## ⚙️ Oppsett lokalt
1. Klon repoet:
   ```bash
   git clone https://github.com/<brukernavn>/dubeditter-store.git
   cd dubeditter-store
   ```

2. Installer avhengigheter:
   ```bash
   npm install
   ```

3. Sett opp `.env.local` med:
   ```
   ADMIN_PASSWORD=dinhemmeligeadmin
   STRIPE_SECRET_KEY=sk_test_xxxxxxx
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Kjør dev-server:
   ```bash
   npm run dev
   ```

5. Åpne http://localhost:3000 i nettleseren.

---

## 🌍 Deploy
Prosjektet er testet på **Vercel**.  
Miljøvariabler legges inn under **Project Settings → Environment Variables**.

---

## 👤 Admin-panel
Gå til `/admin` og logg inn med `ADMIN_PASSWORD`.  
Her kan du se KPI-er, grafer og laste ned ordre som CSV.

---

## 📄 Lisens
MIT – fritt å bruke og endre.
