// Kash Kids — donation impact calculator

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('donate-slider');
  const amountOut = document.getElementById('calc-amount');
  const impactOut = document.getElementById('calc-impact');
  const freqButtons = document.querySelectorAll('.freq-toggle button');
  const tierCards = document.querySelectorAll('.tier-card');
  let frequency = 'monthly';

  function impactText(amount) {
    if (frequency === 'monthly') {
      const perChild = 250;
      if (amount >= perChild) {
        const kids = Math.floor(amount / perChild);
        return `Sponsors full-year programs for <strong>${kids} child${kids > 1 ? 'ren' : ''}</strong>.`;
      }
      const pct = Math.round((amount / perChild) * 100);
      return `Covers about <strong>${pct}%</strong> of one child's full-year program.`;
    } else {
      // one-time
      if (amount >= 250) return `Funds a full workshop kit for a classroom of <strong>~25 students</strong>.`;
      if (amount >= 100) return `Provides curriculum materials for <strong>~10 students</strong>.`;
      if (amount >= 50) return `Covers a student's take-home activity kit for <strong>a full semester</strong>.`;
      return `Helps stock a classroom with basic budgeting workbooks.`;
    }
  }

  function update(amount) {
    amountOut.textContent = '$' + Number(amount).toLocaleString();
    impactOut.innerHTML = impactText(amount);
    tierCards.forEach(card => {
      card.classList.toggle('selected', parseInt(card.dataset.amount, 10) === Number(amount));
    });
  }

  if (slider) {
    slider.addEventListener('input', () => update(slider.value));
    update(slider.value);
  }

  tierCards.forEach(card => {
    card.addEventListener('click', () => {
      const amt = card.dataset.amount;
      if (slider) slider.value = amt;
      update(amt);
    });
  });

  freqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      freqButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      frequency = btn.dataset.freq;
      document.querySelectorAll('[data-freq-label]').forEach(el => {
        el.textContent = frequency === 'monthly' ? '/month' : 'one-time';
      });
      update(slider ? slider.value : 250);
    });
  });
});
