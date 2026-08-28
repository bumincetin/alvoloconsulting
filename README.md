# Alvolo Consulting

Marketing site for [Alvolo Consulting](https://alvoloconsulting.com), a cross-border advisory between Italy and Türkiye (Milan, Rome, Istanbul). The site runs in three languages (`en`, `tr`, `it`) and ships to Cloudflare Pages.

## Stack

- Next.js 15.0.3 (App Router, `[locale]` segment, edge runtime on every route)
- React 19, TypeScript 5.8
- Tailwind CSS 4 plus hand-written CSS in `src/app/globals.css` and `src/styles/brief.css`
- GSAP + Lenis for scroll, Framer Motion for panel transitions, Three.js via React Three Fiber for the home scene
- Resend for the contact and brief intake (`/api/contact`)
- `@cloudflare/next-on-pages` + Wrangler for deployment

## Pages

| Route | What it is |
| --- | --- |
| `/[locale]/` | "Two Shores" home: a scrolled walk from Milan to Istanbul in five chapters |
| `/[locale]/services/` | Service catalogue, corridor switcher (Italy inbound / Türkiye outbound), four-phase protocol |
| `/[locale]/services/expansion/italy/` and `/turkey/` | Corridor dossiers with the expansion planner |
| `/[locale]/services/startup-corridor/` | Six-module programme for founders |
| `/[locale]/brief/` | Five-question intake that draws a proposal sheet (modules, phases, desks, checklist) and lets the visitor request it |
| `/[locale]/methodology/`, `/about/`, `/faq/`, `/contact/`, `/portal/` | Inner pages |

`/[locale]/pricing/` redirects to `/brief/` (see `next.config.ts`).

## Where the copy lives

All visitor-facing text is data, not JSX, so it can be edited without touching components:

| File | Content |
| --- | --- |
| `src/lib/content/shore.ts` | Home chapters, nav, footer columns |
| `src/lib/content/brief.ts` | Brief wizard: questions, options, proposal vocabulary |
| `src/lib/content/consultation.ts` | Consultation form labels and messages |
| `src/lib/content/corridors.ts`, `protocol.ts`, `calculator.ts`, `team.ts`, `footer.ts` | Section content |
| `src/lib/translations.ts` | Services, methodology, about, contact, FAQ and startup-corridor pages |
| `src/lib/seo.ts` | Per-page titles, descriptions, canonical and hreflang |

Copy follows the [stop-slop](https://skills.sh/hardikpandya/stop-slop) rules, vendored at `.agents/skills/stop-slop`: active voice, no filler adverbs, no "not X but Y" contrasts, no em dashes inside sentences. Em dashes remain only as separators in labels ("Chapter 01 — The Italian Shore").

## Development

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en/
npm run lint
npx tsc --noEmit
npm run build
```

### Environment

Create `.env.local` (ignored by git):

```bash
RESEND_API_KEY=re_xxxxxxxx
CONTACT_EMAIL=info@alvoloconsulting.com   # where intake emails are delivered
NEXT_PUBLIC_PORTAL_URL=                    # optional; when empty, portal links fall back to /contact/
```

The intake route sends from `onboarding@resend.dev`; switch `from` in `src/app/api/contact/route.ts` to a verified domain sender once the domain is set up in Resend.

## Deployment

The site runs on Cloudflare Pages (project `alvoloconsulting`, custom domain alvoloconsulting.com) as a direct upload, not a Git integration.

```bash
npm run build          # sanity check (Next.js)
npm run pages:build    # @cloudflare/next-on-pages → .vercel/output/static  (run on Linux/WSL; the Vercel CLI it spawns is unreliable on Windows)
npm run pages:deploy   # wrangler pages deploy … --project-name alvoloconsulting
```

Add `--branch main` to `pages:deploy` to publish to production. `RESEND_API_KEY` and `CONTACT_EMAIL` must be set in the Pages project environment for `/api/contact` to send email.

## Repository notes

- `client_portal/` is a separate Django prototype for the client portal. It is not part of the Next.js build; its virtualenv, database and bytecode are ignored.
- `.agents/skills/` holds vendored agent skills; `skills-lock.json` pins them.

## Author

Bumin Kağan Çetin ([@bumincetin](https://github.com/bumincetin)). MIT licence, see [LICENSE](LICENSE).
