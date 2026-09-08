// Kash Kids — interactive lesson quiz engine

const LESSON = {
  title: "4 Ways to Make Money",
  slides: [
    {
      type: "info",
      heading: "Meet the 4 ways to make money",
      body: "Before we quiz you, here's the big idea: there are four main ways anyone — kids included — can make money. Earning (working for someone), Entrepreneurship (starting your own thing), Gifts (money given to you), and Investing (money that makes more money over time)."
    },
    {
      type: "question",
      q: "Mowing a neighbor's lawn for $10 is an example of which way to make money?",
      options: ["Earning", "Investing", "Gifts", "Interest"],
      correct: 0,
      explain: "Correct! Getting paid for work you do — like mowing a lawn or babysitting — is called Earning."
    },
    {
      type: "question",
      q: "Selling friendship bracelets you made yourself at a school fair is an example of...",
      options: ["Gifts", "Entrepreneurship", "Earning a salary", "Borrowing"],
      correct: 1,
      explain: "Exactly! Creating and selling your own product or service is Entrepreneurship."
    },
    {
      type: "question",
      q: "Your grandma gives you $20 for your birthday. What category is this?",
      options: ["Investing", "Entrepreneurship", "Gifts", "Earning"],
      correct: 2,
      explain: "Right — money someone gives you without you working for it is a Gift."
    },
    {
      type: "question",
      q: "You put $50 in a savings account and it grows over time. This is an example of...",
      options: ["Gifts", "Earning", "Investing", "Spending"],
      correct: 2,
      explain: "You got it! Putting money somewhere it can grow over time is Investing."
    },
    {
      type: "question",
      q: "Which of these is NOT one of the 4 ways to make money?",
      options: ["Earning", "Entrepreneurship", "Borrowing", "Investing"],
      correct: 2,
      explain: "That's right — borrowing isn't making money, it's money you have to pay back later (often with interest)!"
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  const box = document.getElementById('quiz-box');
  if (!box) return;

  let step = 0;
  let score = 0;
  const total = LESSON.slides.filter(s => s.type === 'question').length;

  function render() {
    const slide = LESSON.slides[step];
    const progressPct = Math.round((step / LESSON.slides.length) * 100);

    if (!slide) {
      renderResult();
      return;
    }

    if (slide.type === 'info') {
      box.innerHTML = `
        <div class="quiz-progress"><div class="quiz-progress-bar" style="width:${progressPct}%"></div></div>
        <span class="eyebrow">Lesson</span>
        <h2>${slide.heading}</h2>
        <p class="lede" style="max-width:100%;">${slide.body}</p>
        <div class="lesson-nav">
          <span></span>
          <button class="btn btn-primary" id="quiz-next">Start Quiz →</button>
        </div>
      `;
      document.getElementById('quiz-next').addEventListener('click', () => { step++; render(); });
      return;
    }

    if (slide.type === 'question') {
      const qNum = LESSON.slides.slice(0, step + 1).filter(s => s.type === 'question').length;
      const letters = ['A', 'B', 'C', 'D'];
      box.innerHTML = `
        <div class="quiz-progress"><div class="quiz-progress-bar" style="width:${progressPct}%"></div></div>
        <span class="eyebrow">Question ${qNum} of ${total}</span>
        <div class="quiz-question">${slide.q}</div>
        <div class="quiz-options">
          ${slide.options.map((opt, i) => `
            <button class="quiz-option" data-index="${i}">
              <span class="letter">${letters[i]}</span> ${opt}
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quiz-feedback"></div>
        <div class="lesson-nav">
          <span></span>
          <button class="btn btn-primary" id="quiz-next" disabled>Next →</button>
        </div>
      `;

      const optionButtons = box.querySelectorAll('.quiz-option');
      const feedback = document.getElementById('quiz-feedback');
      const nextBtn = document.getElementById('quiz-next');

      optionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.index, 10);
          const isCorrect = idx === slide.correct;
          optionButtons.forEach(b => b.disabled = true);
          if (isCorrect) {
            btn.classList.add('correct');
            score++;
          } else {
            btn.classList.add('wrong');
            optionButtons[slide.correct].classList.add('correct');
          }
          feedback.textContent = (isCorrect ? '✅ ' : '❌ ') + slide.explain;
          feedback.style.color = isCorrect ? 'var(--success-500)' : 'var(--error-500)';
          feedback.classList.add('show');
          nextBtn.disabled = false;
        }, { once: true });
      });

      nextBtn.addEventListener('click', () => { step++; render(); });
    }
  }

  function renderResult() {
    const pct = Math.round((score / total) * 100);
    let message = "Nice effort — try again to boost your score!";
    if (pct === 100) message = "Perfect score! You're a certified Money Maker. 🏆";
    else if (pct >= 70) message = "Great job! You really understand the 4 ways to make money.";

    box.innerHTML = `
      <div class="quiz-progress"><div class="quiz-progress-bar" style="width:100%"></div></div>
      <div class="quiz-result">
        <span class="eyebrow">Lesson complete</span>
        <div class="big-score">${score}/${total}</div>
        <h2>${message}</h2>
        <p class="lede center-col">You just completed "${LESSON.title}" — the same interactive format Kash Kids uses in classrooms every day.</p>
        <div class="hero-actions" style="justify-content:center;">
          <button class="btn btn-primary" id="quiz-restart">Try Again</button>
          <a href="programs.html" class="btn btn-ghost">Explore More Programs</a>
        </div>
      </div>
    `;
    document.getElementById('quiz-restart').addEventListener('click', () => {
      step = 0; score = 0; render();
    });

    try {
      localStorage.setItem('kashkids_last_score', JSON.stringify({ score, total, date: new Date().toISOString() }));
    } catch (e) { /* localStorage unavailable — ignore */ }
  }

  render();
});
