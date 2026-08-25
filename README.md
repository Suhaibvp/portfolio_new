# Suhaib VP — Portfolio

A React + Vite site for an Android developer portfolio. Personal details live in one file so you can fill gaps from the resume without hunting through components.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build    # production build
npm run preview  # preview the build
```

## Live site

The site deploys automatically to **GitHub Pages** on every push to `main`:

**https://sayanth-confio.github.io/suhaib-vp-portfolio/**

If the first deploy fails, open the repo → **Settings → Pages → Source** and choose **GitHub Actions**.

### Want a cleaner free URL?

[Vercel](https://vercel.com) is the nicest free host for this Vite app (`your-name.vercel.app`, HTTPS, no `/portfolio_new` path). Import `Suhaibvp/portfolio_new` — `vercel.json` is already in the repo.

## Fill in missing details

Edit [`src/content.ts`](src/content.ts). Empty values stay hidden or show a small dashed slot so you know what to add.

| Field | What to put |
| --- | --- |
| `profile.photo` | `'portrait.jpg'` after adding the file to `public/` (keep `withBase(...)`) |
| `profile.extraAbout` | A second About paragraph |
| `profile.socials` | Play Store / personal site URLs (LinkedIn and GitHub are already set) |
| `certifications` | Uncomment the example and add your own |
| `spokenLanguages` | e.g. `['English', 'Malayalam', 'Hindi']` |
| `interests` | Optional personal interests |
| `testimonials` | Quotes from managers or clients |
| Project `href` | Play Store or case-study links per app |

The resume PDF is served from `public/Suhaib_VP_Resume.pdf` (Resume button in the nav).
