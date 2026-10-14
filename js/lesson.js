// Kash Kids — "Needs, Wants, and a Money Plan" sample lesson
// Copy follows Twyla's screen-by-screen script (handoff, Oct 14 2026). Edit wording here only with her approval.

const STEPS = [
  {
    type: 'info',
    kicker: "Let's make a money plan",
    title: 'You have $10 to use today',
    body: "You have $10 to use today. Your choices can help you take care of what matters now and save for something later. Let's make a money plan.",
    next: "Let's go",
  },
  {
    type: 'info',
    kicker: 'Learn',
    title: 'Needs and wants',
    body: 'A need is something important for health, safety, or daily life, such as food or a safe place to live. A want is something you would enjoy having. The situation matters: a warm coat can be a need in cold weather, while an extra fashionable coat may be a want.',
    extra: `
      <div class="teach-pair">
        <div class="need"><b>🥕 Need</b>Important for health, safety, or daily life, like food or a safe place to live.</div>
        <div class="want"><b>🎈 Want</b>Something you would enjoy having.</div>
      </div>`,
    next: "I'm ready",
  },
  {
    type: 'question',
    kicker: 'Question 1',
    title: 'You need lunch today. Which choice meets a basic need?',
    choices: [
      { label: 'A nutritious lunch', emoji: '🥪', correct: true },
      { label: 'An extra video game', emoji: '🎮' },
      { label: 'A collectible toy', emoji: '🧸' },
    ],
    good: 'Food meets a basic need.',
    retry: 'That could be fun, but lunch meets your need for food today. Try again.',
  },
  {
    type: 'question',
    kicker: 'Question 2',
    title: 'You already have a backpack that works. You want another because it has your favorite character. Is the extra backpack a need or a want right now?',
    layout: 'two',
    choices: [
      { label: 'Need' },
      { label: 'Want', correct: true },
    ],
    good: 'You already have what you need. You can save for the extra backpack if you choose.',
    retry: 'Your current backpack works, so the extra one is a want right now. Try again.',
  },
  {
    type: 'question',
    kicker: 'Question 3',
    title: 'You have $10. Lunch costs $6, and a toy costs $5. Can you buy both today?',
    layout: 'two',
    extra: `
      <div class="price-row" aria-hidden="true">
        <span class="price-tag">🥪 Lunch <b>$6</b></span>
        <span class="price-tag">🧸 Toy <b>$5</b></span>
      </div>`,
    choices: [
      { label: 'Yes' },
      { label: 'No', correct: true },
    ],
    good: 'They cost $11 together. That is $1 more than you have.',
    retry: 'Add the prices: $6 + $5 = $11. You have $10, so you need to make a choice.',
    onCorrect: showBudgetMeter,
  },
  {
    type: 'question',
    kicker: 'Question 4',
    title: 'You buy the $6 lunch. How much of your $10 is left?',
    choices: [
      { label: '$4', correct: true },
      { label: '$5' },
      { label: '$6' },
    ],
    good: '$10 minus $6 leaves $4. You can choose to save it.',
    retry: 'Start with $10 and subtract the $6 you spent. Try again.',
    onCorrect: () => spend(6),
  },
  {
    type: 'end',
    kicker: 'You made a money plan!',
    title: 'Nice work, Money Maker!',
    body: 'A money plan helps you meet your needs and decide what to save for. Different families have different circumstances. Talk with a trusted adult about a money choice you can practice.',
  },
];

const START_AMOUNT = 10;
let step = 0;
let wallet = START_AMOUNT;

const box = document.getElementById('lesson');
const bodyEl = box && box.querySelector('.lesson-body');
const walletEl = box && box.querySelector('.wallet');
const walletAmt = box && box.querySelector('.wallet-amt');
const progressBar = box && box.querySelector('.lesson-progress-bar');
const progressLabel = box && box.querySelector('.lesson-progress-label');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setWallet(amount, animate) {
  if (!animate || reduceMotion) {
    wallet = amount;
    walletAmt.textContent = '$' + amount;
    return;
  }
  const from = wallet;
  wallet = amount;
  const bill = document.createElement('span');
  bill.className = 'flying-bill';
  bill.textContent = '💵';
  walletEl.appendChild(bill);
  setTimeout(() => bill.remove(), 1000);
  const start = performance.now();
  const dur = 900;
  (function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    walletAmt.textContent = '$' + Math.round(from + (amount - from) * p);
    if (p < 1) requestAnimationFrame(tick);
    else {
      walletEl.classList.remove('bump');
      void walletEl.offsetWidth;
      walletEl.classList.add('bump');
    }
  })(start);
}

function spend(n) {
  setWallet(wallet - n, true);
  walletEl.setAttribute('aria-label', `Wallet: $${wallet} left`);
}

function showBudgetMeter(container) {
  const meter = document.createElement('div');
  meter.className = 'budget-meter';
  meter.setAttribute('aria-hidden', 'true');
  // Scale: $12 = 100% so the $10 line and the $1 overage are both visible.
  meter.innerHTML = `
    <div class="budget-track">
      <div class="budget-fill" style="width:0;background:var(--green-600);">$6</div>
      <div class="budget-fill over" style="width:0;left:50%;background:var(--coral-500);">$5</div>
      <div class="budget-limit" style="left:${(10 / 12) * 100}%"><span>Your $10</span></div>
    </div>`;
  container.appendChild(meter);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    meter.querySelector('.budget-fill').style.width = '50%';
    meter.querySelector('.budget-fill.over').style.width = `${(5 / 12) * 100}%`;
  }));
}

function updateProgress() {
  const total = STEPS.length;
  progressBar.style.width = Math.round(((step + 1) / total) * 100) + '%';
  progressLabel.textContent = `Step ${step + 1} of ${total}`;
}

function focusTitle() {
  const h = bodyEl.querySelector('h2');
  if (h) h.focus({ preventScroll: true });
  if (box.getBoundingClientRect().top < 120) box.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}

function render() {
  const s = STEPS[step];
  updateProgress();

  if (s.type === 'info') {
    bodyEl.innerHTML = `
      <span class="lesson-kicker">${s.kicker}</span>
      <h2 tabindex="-1">${s.title}</h2>
      <p class="lede">${s.body}</p>
      ${s.extra || ''}
      <div class="lesson-nav-row"><span></span><button class="btn btn-primary btn-lg" data-next>${s.next} →</button></div>`;
    bodyEl.querySelector('[data-next]').addEventListener('click', () => { step++; render(); focusTitle(); });
    return;
  }

  if (s.type === 'question') {
    bodyEl.innerHTML = `
      <span class="lesson-kicker">${s.kicker} of 4</span>
      <h2 tabindex="-1">${s.title}</h2>
      ${s.extra || ''}
      <div class="choice-grid ${s.layout === 'two' ? 'two' : ''}" role="group" aria-label="Answer choices">
        ${s.choices.map((c, i) => `
          <button type="button" class="choice" data-i="${i}">
            ${c.emoji ? `<span class="emoji" aria-hidden="true">${c.emoji}</span>` : ''}${c.label}
          </button>`).join('')}
      </div>
      <div class="feedback-slot" aria-live="polite"></div>
      <div class="lesson-nav-row"><span></span><button class="btn btn-primary btn-lg" data-next hidden>Next →</button></div>`;

    const buttons = bodyEl.querySelectorAll('.choice');
    const slot = bodyEl.querySelector('.feedback-slot');
    const next = bodyEl.querySelector('[data-next]');

    buttons.forEach(btn => btn.addEventListener('click', () => {
      if (btn.getAttribute('aria-disabled') === 'true') return;
      const choice = s.choices[+btn.dataset.i];
      if (choice.correct) {
        buttons.forEach(b => { b.disabled = true; });
        btn.classList.add('is-correct');
        btn.setAttribute('aria-label', `${choice.label}, correct`);
        slot.innerHTML = `<div class="feedback good">✅ ${s.good}</div>`;
        if (s.onCorrect) s.onCorrect(slot);
        next.hidden = false;
        next.focus();
      } else {
        // aria-disabled (not disabled) keeps keyboard focus on the button after a wrong try
        btn.setAttribute('aria-disabled', 'true');
        btn.classList.add('is-tried');
        btn.setAttribute('aria-label', `${choice.label}, not this one`);
        slot.innerHTML = `<div class="feedback retry">💡 ${s.retry}</div>`;
      }
    }));
    next.addEventListener('click', () => { step++; render(); focusTitle(); });
    return;
  }

  // End screen
  bodyEl.innerHTML = `
    <span class="lesson-kicker">${s.kicker}</span>
    <h2 tabindex="-1">${s.title}</h2>
    <p class="lede">${s.body}</p>
    <div class="family-box">
      <b>👪 Family activity</b><br>
      Name one need and one want together, then choose a small savings goal.
    </div>
    <div class="end-actions">
      <a href="programs.html" class="btn btn-secondary">Explore Programs</a>
      <a href="programs.html#request" class="btn btn-primary">Bring Kash Kids to Your School</a>
      <a href="resources.html#parent-list" class="btn btn-ghost">Get Parent Resources</a>
      <button type="button" class="btn btn-ghost" data-restart>↺ Try Again</button>
    </div>`;
  bodyEl.querySelector('[data-restart]').addEventListener('click', () => {
    step = 0;
    setWallet(START_AMOUNT, false);
    walletEl.setAttribute('aria-label', `Wallet: $${START_AMOUNT}`);
    render();
    focusTitle();
  });
}

if (box) {
  setWallet(START_AMOUNT, false);
  render();
}
