// Kash Kids — shared site behavior

document.addEventListener('DOMContentLoaded', () => {
  const KK = window.KK || {};
  const preview = !!KK.preview;
  document.documentElement.classList.toggle('is-preview', preview);

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* Mobile nav toggle */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* Mark active nav link */
  const path = location.pathname.split('/').pop().replace(/\.html$/, '') || 'index';
  document.querySelectorAll('.nav-desktop a, .mobile-nav a').forEach(a => {
    const href = (a.getAttribute('href') || '').replace(/\.html$/, '');
    if (href === path) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* Config-driven links: <a data-link="prindleHouse">. Hidden when not set (shown as pending in preview). */
  document.querySelectorAll('[data-link]').forEach(a => {
    const url = (KK.links || {})[a.dataset.link];
    if (url) {
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
    } else if (preview) {
      a.removeAttribute('href');
      a.classList.add('is-pending-link');
      a.title = 'Link not provided yet';
    } else {
      a.hidden = true;
    }
  });

  /* Contact details */
  const contact = KK.contact || {};
  document.querySelectorAll('[data-contact]').forEach(el => {
    const key = el.dataset.contact;
    const val = contact[key];
    if (!val) {
      if (preview) el.innerHTML = `<span class="pending">Needs approval: ${esc(key)}</span>`;
      else (el.closest('[data-contact-row]') || el).hidden = true;
      return;
    }
    if (key === 'email') el.innerHTML = `<a href="mailto:${esc(val)}">${esc(val)}</a>`;
    else if (key === 'phone') el.innerHTML = `<a href="tel:${esc(val.replace(/[^\d+]/g, ''))}">${esc(val)}</a>`;
    else el.textContent = val;
  });

  /* Social icons — only accounts that are filled in */
  const socialLabels = { facebook: 'Facebook', instagram: 'Instagram', linkedin: 'LinkedIn', x: 'X', youtube: 'YouTube', tiktok: 'TikTok' };
  const socialGlyphs = { facebook: 'f', instagram: '◎', linkedin: 'in', x: '𝕏', youtube: '▶', tiktok: '♪' };
  document.querySelectorAll('[data-social]').forEach(wrap => {
    const entries = Object.entries(KK.social || {}).filter(([, url]) => url);
    wrap.innerHTML = entries.map(([k, url]) =>
      `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="Kash Kids on ${socialLabels[k] || k}">${socialGlyphs[k] || '•'}</a>`
    ).join('');
    wrap.hidden = entries.length === 0;
  });

  /* Click-to-play YouTube videos: <div class="video" data-video="about" data-title="…"> */
  const youtubeId = (url) => {
    const m = String(url || '').match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : (/^[\w-]{11}$/.test(url || '') ? url : '');
  };
  const youtubeEmbedUrl = (url) => {
    const clean = String(url || '').trim();
    if (!clean) return '';

    const directId = youtubeId(clean);
    if (directId) return `https://www.youtube-nocookie.com/embed/${directId}?autoplay=1&cc_load_policy=1&rel=0`;

    const playlistMatch = clean.match(/[?&]list=([^&]+)/);
    if (playlistMatch) return `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(playlistMatch[1])}&autoplay=1&cc_load_policy=1&rel=0`;

    const searchMatch = clean.match(/[?&]search_query=([^&]+)/);
    if (searchMatch) return `https://www.youtube-nocookie.com/embed/videoseries?listType=search&list=${encodeURIComponent(decodeURIComponent(searchMatch[1]).replace(/\+/g, ' '))}&autoplay=1&cc_load_policy=1&rel=0`;

    return '';
  };
  document.querySelectorAll('[data-video]').forEach(el => {
    const url = (KK.videos || {})[el.dataset.video];
    const id = youtubeId(url);
    const embedUrl = youtubeEmbedUrl(url);
    const title = el.dataset.title || 'Kash Kids video';
    if (!embedUrl) {
      if (preview) el.innerHTML = `<div class="video-empty"><span class="pending">Needs video link: ${esc(title)}</span></div>`;
      else (el.closest('[data-video-block]') || el).hidden = true;
      return;
    }
    const poster = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : 'https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg';
    el.innerHTML = `
      <button type="button" class="video-poster" aria-label="Play video: ${esc(title)}">
        <img src="${poster}" alt="" loading="lazy">
        <span class="video-play" aria-hidden="true"></span>
      </button>`;
    el.querySelector('button').addEventListener('click', () => {
      el.innerHTML = `<iframe src="${embedUrl}"
        title="${esc(title)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    });
  });

  /* Money Makers in Training status */
  const mmit = KK.mmit || {};
  const startOfToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const allSessions = (mmit.sessions || []).filter(s => s.date);
  // Only future (or today's) sessions with open spots can be registered for.
  const sessions = allSessions.filter(s =>
    parseDate(s.date) >= startOfToday() && (s.spotsLeft === undefined || s.spotsLeft > 0));
  const mmitOpen = mmit.status === 'open' && sessions.length > 0;
  document.querySelectorAll('[data-mmit-label]').forEach(el => {
    el.textContent = mmitOpen ? 'School registration is open' : 'Join the interest list for upcoming sessions';
  });
  document.querySelectorAll('[data-mmit-cta]').forEach(el => {
    el.textContent = mmitOpen ? (el.dataset.openText || 'Register Your School') : (el.dataset.closedText || 'Join the Interest List');
  });
  document.querySelectorAll('[data-mmit-open]').forEach(el => { el.hidden = !mmitOpen; });
  document.querySelectorAll('[data-mmit-closed]').forEach(el => { el.hidden = mmitOpen; });
  document.querySelectorAll('[data-mmit-sessions]').forEach(list => {
    list.innerHTML = sessions.map(s => `
      <div class="session-card">
        <div class="event-date">${dateBadge(s.date)}</div>
        <div>
          <h3>${esc(formatDate(s.date))}</h3>
          <div class="event-details">
            ${s.time ? `<span>🕘 ${esc(s.time)}</span>` : ''}
            ${s.location ? `<span>📍 ${esc(s.location)}</span>` : ''}
            ${s.grades ? `<span>🎓 Grades ${esc(s.grades)}</span>` : ''}
            ${s.spotsLeft !== undefined ? `<span>👥 ${esc(s.spotsLeft)} of ${esc(s.capacity)} student spots open</span>` : ''}
          </div>
        </div>
      </div>`).join('');
  });
  document.querySelectorAll('select[data-mmit-session-select]').forEach(sel => {
    sel.innerHTML = '<option value="">Choose a session</option>' + sessions.map(s =>
      `<option value="${esc(s.id || s.date)}">${esc(formatDate(s.date))}${s.location ? ' — ' + esc(s.location) : ''}</option>`
    ).join('');
    sel.required = mmitOpen;
  });

  /* Events — upcoming vs. past, sorted by date */
  function parseDate(d) { const [y, m, day] = String(d).split('-').map(Number); return new Date(y, (m || 1) - 1, day || 1); }
  function formatDate(d) { return parseDate(d).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }); }
  function dateBadge(d) {
    const dt = parseDate(d);
    return `<span class="num">${dt.getDate()}</span><span class="mon">${dt.toLocaleDateString('en-US', { month: 'short' })}</span>`;
  }
  const today = startOfToday();
  // Money Makers in Training sessions are listed as events automatically.
  const mmitEvents = allSessions.map(s => ({
    date: s.date, title: 'Money Makers in Training', type: 'Field Trip',
    time: s.time, location: s.location, link: 'money-makers.html#register',
  }));
  const events = [...(KK.events || []).filter(e => e.date), ...mmitEvents]
    .sort((a, b) => parseDate(a.date) - parseDate(b.date));
  const upcoming = events.filter(e => parseDate(e.date) >= today);
  const past = events.filter(e => parseDate(e.date) < today).reverse();
  const linkTarget = (url) => /^https?:/i.test(url) ? ' target="_blank" rel="noopener"' : '';
  const eventCard = (e) => `
    <div class="event-card">
      <div class="event-date">${dateBadge(e.date)}</div>
      <div style="flex:1;">
        ${e.type ? `<span class="event-tag">${esc(e.type)}</span>` : ''}
        <h3 style="margin:0 0 4px;font-size:1.05rem;">${esc(e.title)}</h3>
        <div class="event-details">
          ${e.location ? `<span>📍 ${esc(e.location)}</span>` : ''}
          ${e.time ? `<span>🕘 ${esc(e.time)}</span>` : ''}
        </div>
      </div>
      ${e.link ? `<a href="${esc(e.link)}" class="btn btn-ghost btn-sm"${linkTarget(e.link)}>Details</a>` : ''}
    </div>`;
  document.querySelectorAll('[data-events]').forEach(wrap => {
    const which = wrap.dataset.events === 'past' ? past : upcoming;
    const limit = parseInt(wrap.dataset.limit, 10) || which.length;
    wrap.innerHTML = which.slice(0, limit).map(eventCard).join('') ||
      `<p class="empty-note">${wrap.dataset.events === 'past' ? 'Past events will appear here.' : 'New events are announced here and on our parent email list.'}</p>`;
    if (wrap.dataset.events === 'past') (wrap.closest('[data-past-block]') || wrap).hidden = past.length === 0;
  });

  /* Homepage monthly event calendar — always opens on the current month and
     re-renders itself at midnight so "today" stays correct. */
  const calendarEvents = events;

  const renderCalendar = (wrap, offset) => {
    const now = startOfToday();
    const start = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
    const startsOn = start.getDay();
    const daysInMonth = end.getDate();
    const isThisMonth = start.getFullYear() === now.getFullYear() && start.getMonth() === now.getMonth();

    const monthEvents = calendarEvents.filter(e => {
      const dt = parseDate(e.date);
      return dt.getFullYear() === start.getFullYear() && dt.getMonth() === start.getMonth();
    });

    const byDay = new Map();
    monthEvents.forEach(e => {
      const day = parseDate(e.date).getDate();
      if (!byDay.has(day)) byDay.set(day, []);
      byDay.get(day).push(e);
    });

    const monthName = start.toLocaleDateString('en-US', { month: 'long' });
    const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const cells = [];
    for (let i = 0; i < startsOn; i += 1) cells.push('<div class="calendar-day is-empty" aria-hidden="true"></div>');
    for (let day = 1; day <= daysInMonth; day += 1) {
      const dayEvents = byDay.get(day) || [];
      const isToday = isThisMonth && day === now.getDate();
      const isPast = new Date(start.getFullYear(), start.getMonth(), day) < now;
      const cls = ['calendar-day', dayEvents.length && 'has-event', isToday && 'is-today', isPast && 'is-past'].filter(Boolean).join(' ');
      const label = `${monthName} ${day}${isToday ? ', today' : ''}${dayEvents.length ? `: ${dayEvents.map(e => e.title).join(', ')}` : ''}`;
      cells.push(`<div class="${cls}" aria-label="${esc(label)}" title="${esc(label)}"${isToday ? ' aria-current="date"' : ''}>${day}${dayEvents.length ? '<span class="dot" aria-hidden="true"></span>' : ''}</div>`);
    }

    const item = (e) => `
        <div class="calendar-item${parseDate(e.date) < now ? ' is-past' : ''}">
          <span>•</span>
          <div><b>${esc(formatDate(e.date))}</b> — ${esc(e.title)}${e.time ? ` · ${esc(e.time)}` : ''}${e.location ? ` · ${esc(e.location)}` : ''}${e.link ? ` (<a href="${esc(e.link)}"${linkTarget(e.link)}>details</a>)` : ''}</div>
        </div>`;

    // If nothing else is left this month, point people at what's next.
    const upcomingInMonth = monthEvents.filter(e => parseDate(e.date) >= now);
    const nextUp = calendarEvents.filter(e => parseDate(e.date) >= now && parseDate(e.date) > end).slice(0, 3);
    let listMarkup;
    if (monthEvents.length) {
      listMarkup = monthEvents.slice(0, 6).map(item).join('');
      if (isThisMonth && !upcomingInMonth.length && nextUp.length) {
        listMarkup += `<p class="calendar-next-label">Coming up</p>${nextUp.map(item).join('')}`;
      }
    } else if (offset >= 0 && nextUp.length) {
      listMarkup = `<p class="empty-note">No events in ${esc(monthName)}.</p><p class="calendar-next-label">Coming up</p>${nextUp.map(item).join('')}`;
    } else {
      listMarkup = `<p class="empty-note">No events listed in ${esc(monthName)}.</p>`;
    }

    wrap.innerHTML = `
      <div class="calendar-head">
        <div class="calendar-nav-group">
          <button type="button" class="calendar-nav" data-calendar-nav="-1" aria-label="Show previous month">←</button>
          <button type="button" class="calendar-today" data-calendar-today>Today</button>
        </div>
        <h3 class="calendar-month" aria-live="polite">${esc(start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))}</h3>
        <button type="button" class="calendar-nav" data-calendar-nav="1" aria-label="Show next month">→</button>
      </div>
      <span class="calendar-key"><span class="key-swatch key-event"></span> Event <span class="key-swatch key-today"></span> Today, ${esc(now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))}</span>
      <div class="calendar-grid">
        ${dow.map(d => `<div class="calendar-dow">${d}</div>`).join('')}
        ${cells.join('')}
      </div>
      <div class="calendar-list">${listMarkup}</div>`;
  };

  const calendars = [...document.querySelectorAll('[data-events-calendar]')];
  calendars.forEach(wrap => {
    let offset = parseInt(wrap.dataset.monthOffset || '0', 10) || 0;
    renderCalendar(wrap, offset);

    wrap.addEventListener('click', (e) => {
      const todayBtn = e.target.closest('[data-calendar-today]');
      const btn = e.target.closest('[data-calendar-nav]');
      if (!todayBtn && !btn) return;
      offset = todayBtn ? 0 : offset + (parseInt(btn.dataset.calendarNav || '0', 10) || 0);
      wrap.dataset.monthOffset = String(offset);
      renderCalendar(wrap, offset);
    });
  });

  // Keep "today" current if the page stays open past midnight.
  if (calendars.length) {
    const scheduleMidnight = () => {
      const next = startOfToday(); next.setDate(next.getDate() + 1);
      setTimeout(() => {
        calendars.forEach(wrap => renderCalendar(wrap, parseInt(wrap.dataset.monthOffset || '0', 10) || 0));
        scheduleMidnight();
      }, next - new Date() + 1000);
    };
    scheduleMidnight();
  }

  /* Community reviews from Google */
  const reviews = KK.reviews || [];
  document.querySelectorAll('[data-reviews]').forEach(wrap => {
    const section = wrap.closest('[data-reviews-section]');
    if (!reviews.length) {
      if (preview) wrap.innerHTML = `<p class="empty-note"><span class="pending">Needs approval: Google review excerpts and links</span></p>`;
      else if (section) section.hidden = true;
      return;
    }
    wrap.innerHTML = reviews.map(r => `
      <figure class="card testi-card">
        ${r.rating ? `<div class="testi-stars" aria-label="${esc(r.rating)} out of 5 stars">${'★'.repeat(r.rating)}</div>` : ''}
        <blockquote class="testi-quote">“${esc(r.quote)}”</blockquote>
        <figcaption class="testi-person">
          <div class="who"><b>${esc(r.name)}</b>
          ${r.link ? `<a href="${esc(r.link)}" target="_blank" rel="noopener">Read on Google</a>` : '<span>Google review</span>'}</div>
        </figcaption>
      </figure>`).join('');
  });

  /* Resource links */
  document.querySelectorAll('[data-resources]').forEach(wrap => {
    const items = (KK.resources || []).filter(r => r.link);
    if (!items.length) {
      if (preview) wrap.innerHTML = `<p class="empty-note"><span class="pending">Needs content: parent resources with their own links</span></p>`;
      else (wrap.closest('[data-resources-block]') || wrap).hidden = true;
      return;
    }
    wrap.innerHTML = items.map(r => `
      <a class="card resource-card" href="${esc(r.link)}" target="_blank" rel="noopener">
        ${r.type ? `<span class="program-tag">${esc(r.type)}</span>` : ''}
        <h3>${esc(r.title)}</h3>
        ${r.description ? `<p>${esc(r.description)}</p>` : ''}
      </a>`).join('');
  });

  /* Zeffy embed */
  document.querySelectorAll('[data-zeffy]').forEach(wrap => {
    const src = (KK.links || {}).zeffyEmbed;
    if (src) wrap.innerHTML = `<iframe src="${esc(src)}" title="Donate to Kash Kids with Zeffy" allowpaymentrequest loading="lazy"></iframe>`;
    else wrap.hidden = true;
  });

  /* Forms: <form data-form="schoolInquiry" data-success="#id">. Posts to the endpoint in site-config. */
  document.querySelectorAll('form[data-form]').forEach(form => {
    const key = form.dataset.form;
    const endpoint = key === 'convertkit' ? (KK.convertkit || {}).formAction : (KK.forms || {})[key];
    const success = document.querySelector(form.dataset.success);
    const status = form.querySelector('.form-status');

    if (!endpoint) {
      if (preview && status) status.innerHTML = '<span class="pending">Preview: this form is not connected yet, so nothing is sent.</span>';
      else if (!preview) {
        // Never show an unconnected form on the live site — point people to email instead.
        form.outerHTML = `<p class="lede" style="max-width:100%;">Email <a href="mailto:${esc(contact.email)}">${esc(contact.email)}</a> and we'll be in touch.</p>`;
        return;
      }
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!endpoint) return;
      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      try {
        const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(res.status);
        form.hidden = true;
        if (success) { success.classList.add('show'); success.focus(); }
      } catch (err) {
        if (status) status.textContent = `Something went wrong. Please try again or email ${contact.email}.`;
        btn.disabled = false;
      }
    });
  });

  /* Pre-select a topic from ?topic= on the contact form */
  const topic = new URLSearchParams(location.search).get('topic');
  if (topic) {
    const sel = document.querySelector('select[data-topic]');
    const opt = sel && Array.from(sel.options).find(o => o.value === topic);
    if (opt) sel.value = topic;
  }

  /* Stagger index for grouped reveals — must run before we collect .reveal els below */
  document.querySelectorAll('.reveal-stagger').forEach(group => {
    Array.from(group.children).forEach((child, i) => {
      child.style.setProperty('--i', i);
      child.classList.add('reveal');
    });
  });

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* Grow-up path tabs (homepage) */
  document.querySelectorAll('[data-path]').forEach(path => {
    const tabs = path.querySelectorAll('[role="tab"]');
    const panels = path.querySelectorAll('[role="tabpanel"]');
    const select = (i) => {
      tabs.forEach((t, j) => {
        t.setAttribute('aria-selected', i === j ? 'true' : 'false');
        t.tabIndex = i === j ? 0 : -1;
      });
      panels.forEach((p, j) => { p.hidden = i !== j; });
      path.style.setProperty('--stage', i);
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', (e) => {
        const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!dir) return;
        const next = (i + dir + tabs.length) % tabs.length;
        tabs[next].focus();
        select(next);
      });
    });
    select(0);
  });

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.setAttribute('aria-expanded', 'false');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.faq-list')?.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !isOpen);
      q.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
    });
  });

  /* Set current year */
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});
