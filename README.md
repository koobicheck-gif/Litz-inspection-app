# Litz Inspection Report App

Field-ready roof inspection report builder for Litz Roofing & Construction.

## Run locally
```
npm install
npm run dev
```

## What it does
- Build inspection reports in the field on phone or tablet
- 15 photo categories covering all 4 elevations + damage areas
- Insurance-grade fields (carrier, claim #, adjuster, cause of loss, test squares, hit sizes)
- Generate clean printable / downloadable PDF report for customers and adjusters
- Local-first storage — works offline, no account needed

## Customizing branding
Edit `src/utils/constants.js`:
- `COMPANY.phone` — replace placeholder with real number
- `COMPANY.license` — replace with OK CIB roofing registration number

Drop a `litz-logo.svg` into `/public` to override the placeholder leaf icon.

## Phase 2 — Firebase migration
Storage is fully abstracted in `src/services/storageService.js`. To add Firebase:
1. `npm install firebase`
2. Replace the `read`/`write`/`uploadPhoto` internals in `storageService.js` with Firestore + Firebase Storage calls — keep the function signatures identical
3. Add Firebase config to `.env`
4. No component code needs to change

## Phase 2 ideas
- Multi-user / inspector accounts
- Photo annotations (draw on photos)
- Customer-facing share links
- Estimate builder integration
- GoHighLevel / CRM webhook on report finalize
