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
    prindleHouse: '',      // Prindle House financial literacy collection
    zeffy: '',             // Zeffy public donation form link
    zeffyEmbed: '',        // Zeffy embed link (optional — shows the form on the Donate page)
    sponsorshipSheet: '',  // Money Makers in Training sponsorship sheet (PDF or page)
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
    formAction: '',
  },

  /* Contact details */
  contact: {
    email: 'twyla@kashkids.org',
    phone: '',             // approved public phone number
    location: 'Jacksonville, Florida',
    serviceArea: '',       // e.g. 'Schools and community organizations in Northeast Florida'
  },

  /* Social accounts — only filled-in accounts show an icon */
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    tiktok: '',
  },

  /* YouTube links for videos (any normal YouTube URL works) */
  videos: {
    about: '',             // About Kash Kids
    family: '',            // Family engagement
    mmit: '',              // Money Makers in Training
  },

  /* Money Makers in Training
     status: 'open'     → shows Register Your School and the session picker
             'interest' → shows Join the Interest List (no sessions needed)  */
  mmit: {
    status: 'interest',
    sessions: [
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
