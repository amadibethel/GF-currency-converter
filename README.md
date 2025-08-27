# GF Currency Converter

A responsive currency converter built with **React + Vite + TypeScript + Tailwind CSS**. It fetches real‑time exchange rates from a public API and provides clear error handling with a **Retry** flow.

> **Live Demo:** [https://currency-converter-fcrlkffx8-amadibethels-projects.vercel.app](https://currency-converter-fcrlkffx8-amadibethels-projects.vercel.app)
>
> **Repository:** *Add your public GitHub URL here*

---

## Features

* Convert between any two currencies using real‑time rates
* Shows formatted conversion result (e.g., `100 USD → 92.34 EUR`)
* Robust **error handling** for network/API issues (with **Retry** button)
* Prevents negative amounts; useful validation messages
* **Responsive UI** with Tailwind (mobile → desktop)
* **TypeScript** types for safer code

---

## Tech Stack

* **React 18** with **Vite** (fast dev + build)
* **TypeScript** (strict typing)
* **Tailwind CSS** (utility‑first styling)
* **Vercel** (hosting & CI/CD)

---

## Project Structure

```
currency-converter/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ AmountInput.tsx
│  │  ├─ CurrencySelector.tsx
│  │  └─ ConversionResult.tsx
│  ├─ services/
│  │  └─ api.ts
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ index.html
├─ package.json
├─ tsconfig.json
├─ tailwind.config.js
└─ postcss.config.js
```

**Key Components**

* `AmountInput` – controlled numeric input with validation
* `CurrencySelector` – dropdown for currency codes
* `ConversionResult` – formatted output of the conversion
* `services/api.ts` – API request & types
* `App.tsx` – state, effects, error handling & Retry UX

---

## Quick Start (Local Development)

### 1) Clone & Install

```bash
git clone <your-repo-url> currency-converter
cd currency-converter
npm install
```

### 2) Configure Tailwind (already done in this repo)

* `tailwind.config.js` includes `./index.html` and `./src/**/*.{js,ts,jsx,tsx}` in `content`.
* `postcss.config.js` uses `@tailwindcss/postcss` + `autoprefixer`.
* `src/index.css` imports Tailwind layers.

### 3) Start Dev Server

```bash
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`).

---

## API Key (Best Practice)

You should **store your API key in an environment variable** rather than hardcoding it. Use Vite’s `import.meta.env` pattern.

### A) Create `.env` locally (do not commit)

```
VITE_EXCHANGE_API_KEY=your_api_key_here
```

> Ensure `.env` is in your `.gitignore` (Vite templates do this by default).

### B) Update `src/services/api.ts`

```ts
const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY as string;
if (!API_KEY) {
  throw new Error("Missing VITE_EXCHANGE_API_KEY. Define it in your environment variables.");
}
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

export type RatesResponse = {
  conversion_rates: Record<string, number>;
};

export async function fetchRates(baseCurrency: string): Promise<RatesResponse> {
  const response = await fetch(`${BASE_URL}${baseCurrency}`);
  if (!response.ok) throw new Error("Failed to fetch exchange rates");
  return response.json();
}
```

### C) Provide the variable to Vercel

* Go to **Vercel → Project → Settings → Environment Variables**
* Key: `VITE_EXCHANGE_API_KEY`  |  Value: `your_api_key_here`  |  Environment: **Production** (and **Preview** if you use preview deployments)
* Redeploy

> If you previously hardcoded a key, rotate it on the provider’s dashboard and remove it from your git history if it was committed.

---

## Available Scripts

```jsonc
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

* `dev` – local development
* `build` – type‑checks & builds production assets into `dist/`
* `preview` – serves the production build locally

---

## Core Logic & Error Handling

### Data Flow

1. On load (and whenever `fromCurrency` changes), `fetchRates(fromCurrency)` requests the latest rates.
2. Rates are cached in state; `currencies` are derived from keys.
3. Conversion recalculates on `amount`, `toCurrency`, or `rates` change.

### Error Handling

* **Network/API Failure** → set error message + show **Retry** button
* **Negative Amount** → clamp to `0` and display a helper message
* **Missing Rate** → inform user `Rate for XYZ not found`

### Retry UX (simplified snippet)

```tsx
const loadRates = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);
    const data = await fetchRates(fromCurrency);
    if (!data?.conversion_rates) throw new Error("Invalid API response");
    setRates(data.conversion_rates);
    setCurrencies(Object.keys(data.conversion_rates));
  } catch (err) {
    setError(err instanceof Error ? err.message : "An unknown error occurred");
  } finally {
    setLoading(false);
  }
}, [fromCurrency]);
```

---

## Styling (Tailwind)

* Utility classes are used for fast iteration and consistent spacing/typography
* Responsive container and card layout
* You can add a dark mode later using `class` strategy and a toggle

---

## Deployment (Vercel)

### Deploy From CLI (Recommended)

```bash
# First time (create project)
vercel
# Production deploy
vercel --prod
```

**Prompts to choose**

* Link to existing project? → **No** (if first‑time)
* Project name → e.g., `currency-converter`
* Directory → `./`
* Detected settings (Vite): accept defaults

**Build settings** (auto‑detected)

* Install Command: `npm install`
* Build Command: `vite build`
* Output Directory: `dist`

### Add Environment Variables on Vercel

`VITE_EXCHANGE_API_KEY=your_api_key_here`

> After setting env vars, trigger a new deployment (git push or **Deploy** button).

---

## Manual Test Checklist

* [ ] App loads without errors
* [ ] Selecting From/To currencies updates the
