# Kash Kids — Enhanced Site (Redesign)

An enhanced, static redesign of [kashkids.org](https://kashkids.org/), a nonprofit teaching K-12
students real-world financial skills. Built as plain HTML/CSS/JS — no build step, no framework —
so it deploys anywhere instantly.

> **Status:** Content follows Twyla Prindle's handoff of October 14, 2026. The site is in **preview mode**:
> yellow "Needs approval" notes mark anything still waiting on materials or sign-off.

## Pages

- **`index.html`**: Homepage. Hero, how we support schools, grade-level path, Try a Lesson, Money Makers in Training, video, reviews, events
- **`about.html`**: Mission, story, approach, About video, reach figures
- **`programs.html`**: Elementary, middle/high, family engagement, program access, and the **Request a Program** form
- **`money-makers.html`**: Money Makers in Training sessions, registration form, sponsor and volunteer actions
- **`get-involved.html`**: Partners, supporters, ways businesses can help
- **`resources.html`**: Parent email list (ConvertKit), parent resources, events (past events archive automatically), stories, Google reviews
- **`donate.html`**: Zeffy giving
- **`contact.html`**: Contact form and FAQ
- **`lesson.html`** + **`js/lesson.js`**: "Needs, Wants, and a Money Plan" interactive sample lesson (script copy lives in `js/lesson.js`)

## Editing content (Archel, Biane)

Almost everything that changes lives in **`js/site-config.js`**: links (Zeffy, Prindle House, sponsorship sheet),
form destinations, the ConvertKit form, contact details, social accounts, YouTube videos, Money Makers in Training
status/sessions/capacity, events, Google reviews, and parent resources. Empty values are hidden on the live site.
Set `preview: false` only after Twyla approves launch. With `preview: false`, any form that is still not connected is
replaced by an email link, so no demonstration forms appear on the live site.

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
