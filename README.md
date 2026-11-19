# Kash Kids — Enhanced Site (Redesign)

An enhanced, static redesign of [kashkids.org](https://kashkids.org/), a nonprofit teaching K-12
students real-world financial skills. Built as plain HTML/CSS/JS — no build step, no framework —
so it deploys anywhere instantly.

> **Status:** Content follows Twyla Prindle's handoff of October 14, 2026, styled to the Kash Kids Brand Guide
> (greens #89BF3D / #A7DB50 / #C8F763, blue #1166B2; Poppins headings, Lato body). No approval notes are shown on
> the site — open items are tracked in the list below.

## Open items (waiting on Kash Kids)

- [ ] Google reviews — real Google business profile link, plus approved excerpts and review links
- [ ] LinkedIn company page URL
- [ ] Regents — exact organization name and logo
- [ ] Service area wording (`contact.serviceArea`)
- [ ] Reach figures (20 schools / 3,200 students in 2026) — reporting dates, unique-student counting, whether 2026 is complete
- [ ] Money Makers in Training — time, location, grade levels, capacity per date; updated flyer with all six December dates
- [ ] Book cover images (Tiny Penny, Mighty Nickel; Where Is My Money?)
- [ ] Classroom photo permissions (About page) and first classroom stories (Resources)
- [ ] Support type for each supporter (Get Involved)
- [ ] Confirm ongoing instruction vs. 30–90 minute modules (Programs)
- [ ] Parent resources, each with its own link; any further confirmed events
- [ ] Form endpoints for school inquiry and contact (currently fall back to email)
- [ ] Test forms end to end (inbox receipt + sender confirmation) and Zeffy (monthly/one-time, receipt) using test entries
- [ ] Privacy notice reflecting the actual forms and services

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
Keep `preview: false`. Any form that is still not connected is replaced by an email link, so no demonstration
forms appear on the live site.

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
