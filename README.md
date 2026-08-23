# tireddesimom media kit

The official media-kit landing page for Annie Azhar (Qurratulain), built with the Next.js App Router API through Vinext, React, TypeScript, Vite and Cloudflare Workers.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Update content or stats

- Page copy, brand list, reel links and audience data: `app/MediaKitPage.tsx`
- Design tokens and responsive styles: `app/globals.css`
- SEO and social metadata: `app/layout.tsx`
- Production URL fallback: `app/site-config.ts`
- Source photographs: `public/images`

Only publish audience figures that are visible in the supplied Instagram Insights. Follower count and engagement rate are intentionally omitted until verified figures are available.

## Replace the PDFs

- Public media kit: `public/downloads/annie-azhar-media-kit.pdf`
- Public rate card: `public/downloads/annie-azhar-rate-card.pdf`

The editable PDF generator is `scripts/create_pdfs.py`. Run it with the bundled Python runtime (ReportLab and Pillow required) to rebuild both documents. Keep the public filenames unchanged so tracked links continue to work.

## Analytics and privacy

Download and contact intent events post to `app/api/events/route.ts`. The endpoint validates origin, event names, content type and payload size and includes a best-effort per-isolate rate limit. Download requests pass through `app/api/download/route.ts` before redirecting to the PDF.

Worker logs are not permanent analytics storage. Enable Cloudflare Web Analytics in the client's dashboard, or connect another privacy-respecting provider, if the client needs a retained conversion dashboard.

## Pre-deployment checks

```bash
npm ci
npm run lint
npm test
npm audit --audit-level=high
```

The production Worker applies CSP, anti-framing, MIME-sniffing protection, restrictive browser permissions, cross-origin isolation headers, HSTS on HTTPS and no-store caching for API responses. The contact actions use email and Instagram links; there is no public form or secret in browser code.

## Deploy to the client's Cloudflare account

1. Ask the client to invite your email to their Cloudflare account with the minimum Workers permission needed. Do not ask for their password or two-factor code.
2. Run `npx wrangler login` and approve the client's Cloudflare account in the browser.
3. Set `NEXT_PUBLIC_SITE_URL` in the build environment to the final HTTPS origin, for example `https://media.tireddesimom.com`. If it is omitted, SEO metadata falls back to `https://tireddesimom.com`.
4. Deploy:

```bash
npm run deploy:cloudflare
```

5. In Cloudflare, attach the client's domain, enable Web Analytics if wanted, and add an account-level WAF rate-limit rule for `/api/events` for stronger distributed abuse protection.
6. Verify the live canonical URL, `robots.txt`, `sitemap.xml`, both PDF downloads, mobile layout and HTTPS response headers.

The project also contains `.openai/hosting.json` for Sites previews. It does not contain production credentials. Local `.env*`, `.dev.vars*`, Wrangler state and deployment output are git-ignored.
