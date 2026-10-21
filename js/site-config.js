/* ==========================================================================
   Kash Kids — site settings
   --------------------------------------------------------------------------
   This is the ONE file to edit for links, videos, events, reviews and
   Money Makers in Training sessions. Every page reads from it.

   Rules of thumb:
   - Leave a value as '' (empty) until it is approved. Empty links are hidden
     on the live site, so nothing ever points nowhere.
   - Keep the quotes and commas exactly as shown.
   - Set `preview: false` only when Twyla has approved the site for launch.
     While `preview` is true, yellow "Needs approval" notes are shown.
   ========================================================================== */

window.KK = {
  preview: true,

  /* Public links (paste the full https:// address) */
  links: {
    prindleHouse: 'https://prindlehouse.com/books/',  // Prindle House storefront (no financial literacy collection page exists yet — swap in when it does)
    zeffy: 'https://www.zeffy.com/en-US/donation-form/sponsor-a-child-change-a-life-4',  // Zeffy public donation form link
    zeffyEmbed: 'https://www.zeffy.com/embed/donation-form/sponsor-a-child-change-a-life-4',  // Zeffy embed link (shows the form on the Donate page)
    sponsorshipSheet: 'https://form.jotform.com/262508545876065',  // Money Makers in Training Business Partner Interest Form (Jotform)
    googleReviews: '',     // Google business profile reviews page
  },

  /* Where form submissions go (e.g. a Formspree endpoint).
     Until set, forms show a preview notice and do not submit. */
  forms: {
    schoolInquiry: '',
    mmitRegistration: '',
    contact: '',
  },

  /* ConvertKit parent email list — the form's action URL */
  convertkit: {
    formAction: 'https://app.kit.com/forms/3633824/subscriptions',  // Kit form 3633824 (kashkids.kit.com/5d3371a385)
  },

  /* Contact details. Inquiries and registrations go to info@kashkids.org —
     use it when setting up the form endpoints above. */
  contact: {
    email: 'twyla@kashkids.org',
    phone: '(866) 877-4635',  // approved public phone number
    location: 'Jacksonville, Florida',
    serviceArea: '',       // e.g. 'Schools and community organizations in Northeast Florida'
  },

  /* Social accounts — only filled-in accounts show an icon */
  social: {
    facebook: 'https://www.facebook.com/ckashkids',
    instagram: 'https://www.instagram.com/kashkidss/',
    linkedin: '',          // Twyla sent the page title only — paste the company page URL
    x: 'https://x.com/kashkidsuaoc',
    youtube: 'https://www.youtube.com/@kashkids5912',
    tiktok: '',
  },

  /* YouTube links for videos (any normal YouTube URL works) */
  videos: {
    about: '',             // About Kash Kids
    family: '',            // Family engagement
    mmit: 'https://youtube.com/shorts/wmWieg26gEk',  // Money Makers in Training
  },

  /* Money Makers in Training
     status: 'open'     → shows Register Your School and the session picker
             'interest' → shows Join the Interest List (no sessions needed)  */
  mmit: {
    status: 'open',
    // From the Bridgepoint CD / Kash Kids flyer (Drive folder). Field trip
    // coordinated with DCPS and home schools. Add time, location, grades,
    // capacity and spotsLeft once confirmed.
    sessions: [
      { id: '2026-12-01', date: '2026-12-01' },
      { id: '2026-12-15', date: '2026-12-15' },
      { id: '2026-12-16', date: '2026-12-16' },
      // { id: 'spring-1', date: '2027-03-06', time: '9:00 AM – 12:00 PM',
      //   location: '1Bridge Connect, Jacksonville', grades: '6–12',
      //   capacity: 120, spotsLeft: 120 },
    ],
  },

  /* Events. Past events move to "Past events" automatically after their date.
     To remove one completely, delete its { ... } block. */
  events: [
    // { date: '2026-11-08', title: 'Family Money Night', type: 'Family',
    //   location: 'Jacksonville, FL', time: '6:00 PM', link: '' },
  ],

  /* Community reviews — exact excerpts from Google, approved by Twyla.
     Do not edit the wording of a review. */
  reviews: [
    // { quote: '…exact excerpt…', name: 'Reviewer name as shown on Google',
    //   link: 'https://g.page/…', rating: 5 },
  ],

  /* Parent and family resources — each item needs its own real link */
  resources: [
    // { title: 'Needs vs. wants conversation starters', type: 'Activity',
    //   description: 'Five questions to ask at the grocery store.', link: '' },
  ],
};
