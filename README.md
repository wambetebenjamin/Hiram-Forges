# Hiram Forges

**Fire, skill, lasting tools.**

Directory of blacksmiths, welders and metal fabricators so communities can repair,
commission and keep metal tools in use.

- Live: https://hiram-forges.vercel.app, production, region cdg1
- Site: Next.js 16 App Router, React 19, Tailwind 4, TypeScript
- Locales: English, Kiswahili, Francais (light switcher, cookie and device storage)
- Images: real Pexels workshop photography only, credited in `image-credits.md`
- Region: `cdg1` (Vercel), full security headers in `vercel.json`

## Stack

| Package    | Version       |
| ---------- | ------------- |
| next       | 16.4.2        |
| react      | 19.2.0        |
| react-dom  | 19.2.0        |
| next-auth  | 5.0.0-beta.28 |
| tailwindcss| 4.1.10        |
| lenis      | 1.3.11        |
| node       | >= 24         |

`@auth/core` is pinned to `0.41.3` through an npm override. See `docs/SECURITY.md` for the
one residual advisory and its remediation.

## Getting started

```bash
nvm use            # .nvmrc pins Node 24
npm ci
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Quality gate

```bash
npm ci
npx tsc --noEmit
npm run build
npm audit --audit-level=high
```

The first three pass clean. `npm audit` reports the documented `next-auth` advisory; the
reason and the single command to clear it are in `docs/SECURITY.md`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Craft value, how to find an artisan, featured workshops, join call to action |
| `/artisans` | Filterable directory by region, specialty and free text |
| `/artisans/[slug]` | Artisan profile with hours, common work and preparation notes |
| `/specialties` | Work types and what to prepare before visiting |
| `/safety` | Workshop safety notes for clients and for makers |
| `/regions` | Coverage examples across six countries |
| `/join` | Artisan listing form with review workflow |
| `/saved` | Saved artisans on this device |
| `/my-listing` | Status of the listing submitted from this device |
| `/sign-in` | Light sign in for shortlist and listing status only |
| `/about`, `/contact`, `/privacy`, `/terms`, `/credits` | Information pages |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | Machine readable metadata |
| `/api/contact`, `/api/join` | Validated form handlers with reCAPTCHA and rate limiting |
| `/api/auth/[...nextauth]` | Auth.js route handler |

## Design

The uploaded theme is preserved as the design system. Its stylesheets ship unchanged in
`app/styles/` (`template.css`, `responsive.css`, `bootstrap-grid.min.css`,
`font-awesome.min.css`, `animate.min.css`) and `app/styles/fonts.css` self hosts the
Poppins family from the theme.

Branding changes only:

- The wordmark is Hiram Forges in the theme's own palette: `#f3cf2d` yellow, `#030303`
  black, `#061553` headings, `#212120` footer.
- The hero keeps the theme's yellow hexagon field and swoosh exactly. Only the
  photographic region inside the swoosh carries the new Pexels forge photography, so the
  layout, curve, hexagon pattern and type positions are the theme's.
- Template animations are the only motion used, plus Lenis smooth scrolling at 1.2.

Nothing on the page uses gradients as branding, glass effects, chrome, neon, orbs, blobs,
sparkles or generated imagery.

## Responsive contract

- Every interactive target is at least 44px tall.
- No horizontal overflow at 320, 375, 390, 414, 768, 1024, 1280 or 1440 wide.
- Filters open as a bottom sheet under 992px with a scrim, Escape to close and body scroll
  lock.
- Floating WhatsApp is 56px, fixed bottom right at z-index 9998. The voice tour sits bottom
  left and collapses to an icon on phones.
- The cookie panel sits above the floating buttons on phones and uses
  `env(safe-area-inset-bottom)`.
- `userScalable` is true and the viewport is `device-width`.

## Internationalisation

`app/lib/dictionaries.ts` holds the three dictionaries. Keys fall back to English when a
translation is missing, so a partial locale never renders a blank string. The switcher
writes `hiram-forges-locale` to a cookie and to device storage.

## Forms

No database is required. Both endpoints validate on the server, apply rate limits, verify
reCAPTCHA when keys exist and return a WhatsApp hand off link so nothing is lost. Set
`CONTACT_WEBHOOK_URL` to forward submissions into Slack, n8n or a form service.

## Environment

Copy `.env.example` to `.env.local`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical URL for metadata and sitemap |
| `AUTH_SECRET` | yes in production | Signs the session cookie |
| `AUTH_TRUST_HOST` | yes on Vercel | Trusts the forwarded host |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | optional | Enables the reCAPTCHA widget |
| `NEXT_PUBLIC_RECAPTCHA_VERSION` | optional | `v3` (default) or `v2` |
| `RECAPTCHA_SECRET_KEY` | optional | Server side token verification |
| `CONTACT_WEBHOOK_URL` | optional | Forwards listing and contact submissions |

## Deploy

The project is already created on Vercel as `hiram-forges` and deployed to production at
https://hiram-forges.vercel.app with `AUTH_SECRET`, `AUTH_TRUST_HOST` and
`NEXT_PUBLIC_SITE_URL` set for production, preview and development.

To redeploy by hand:

```bash
vercel link
vercel env add AUTH_SECRET production
vercel env add AUTH_TRUST_HOST production
vercel deploy --prod
```

`vercel.json` pins the region to `cdg1` and sets the security headers.

## Credits

Workshop photographs are published under the Pexels licence. Each file, subject and photo
reference is listed in `image-credits.md` and rendered at `/credits`.
