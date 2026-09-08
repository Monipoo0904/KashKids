# Kash Kids — Enhanced Site (Redesign)

An enhanced, static redesign of [kashkids.org](https://kashkids.org/), a nonprofit teaching K-12
students real-world financial skills. Built as plain HTML/CSS/JS — no build step, no framework —
so it deploys anywhere instantly.

> **Content note:** Copy, stats, staff names, testimonials, blog posts, and events on this site
> are illustrative placeholders drafted from the public kashkids.org site, meant to show the design
> and features. Swap in real content, photography, and a real payment processor before launch.

## What's here

- **`index.html`** — Home page: hero, programs teaser, stats, testimonials, events/blog preview
- **`about.html`** — Mission, story timeline, team, values
- **`programs.html`** — Filterable catalog of programs by grade level
- **`lesson.html`** + **`js/quiz.js`** — A real interactive lesson & quiz ("4 Ways to Make Money"),
  scored client-side with instant feedback (progress saved to `localStorage`)
- **`donate.html`** + **`js/calculator.js`** — Donation page with a live impact calculator
  (slider + preset tiers) and a demo checkout form
- **`blog.html`** / **`blog-post.html`** — Filterable blog listing + a full sample article
- **`events.html`** — Filterable events list (workshops / fundraisers / virtual)
- **`contact.html`** — Contact form + FAQ accordion

All pages share `css/style.css` (design system: colors, type, components) and `js/main.js`
(mobile nav, scroll reveal, animated counters, FAQ accordion, filter pills, demo form handling).

## Before launch (real integrations needed)

- Connect the donate/contact forms to a real backend or service (e.g. Formspree, Netlify Forms,
  Zeffy for donations, Stripe, or a CRM)
- Replace placeholder stats, team bios, testimonials, blog posts, and events with real content
- Swap the inline SVG logo for a real brand logo/favicon if one exists
- Add real photography (currently uses color/gradient panels + emoji as stand-ins)
- Wire up analytics (GA4/Plausible) and an SEO sitemap if desired

## Running locally

No build step required — just serve the folder statically, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploying

**Vercel:** import this repo in the Vercel dashboard, or run `vercel` from this folder —
`vercel.json` is already configured for clean URLs.

**GitHub Pages:** push to GitHub and enable Pages on the `main` branch (root directory).
