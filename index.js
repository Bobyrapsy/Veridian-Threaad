// Countdown Logic
function updateCountdown() {
  const targetDate = new Date('June 1, 2026 00:00:00').getTime(); // Updated future date
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    document.getElementById('countdown').innerHTML = "Event Started!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('countdown').innerHTML = `
    <div>${days}d</div>
    <div>${hours}h</div>
    <div>${minutes}m</div>
    <div>${seconds}s</div>
  `;
}

document.addEventListener('DOMContentLoaded', function () {
  updateCountdown();
  setInterval(updateCountdown, 1000);

  const ticketButton = document.querySelector('.bg-1 a');
  const leftBox = document.querySelector('.bg-1');
  const rightBox = document.querySelector('.text-box');
  const largeBox = document.querySelector('.large-box');

  if (!ticketButton || !leftBox || !rightBox || !largeBox) {
    console.error("Missing required DOM elements.");
    return;
  }

  const originalRightContent = rightBox.innerHTML;
  const signupFormHTML = `
    <div class="form-container">
      <h2>Get Your Ticket</h2>
      <form class="signup-form">
        <input type="text" placeholder="Full Name" required>
        <input type="email" placeholder="Email" required>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  `;

  let isSwapped = false;
  let isAnimating = false;

  ticketButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (isAnimating) return;
    isAnimating = true;

    leftBox.style.transition = 'transform 0.6s ease, opacity 0.3s ease';
    rightBox.style.transition = 'transform 0.6s ease, opacity 0.3s ease';
    leftBox.style.transform = 'translateX(100%)';
    rightBox.style.transform = 'translateX(-100%)';
    leftBox.style.opacity = '0';
    rightBox.style.opacity = '0';

    setTimeout(() => {
      leftBox.style.transition = 'none';
      rightBox.style.transition = 'none';

      leftBox.style.transform = 'translateX(-100%) scale(0.98)';
      rightBox.style.transform = 'translateX(100%) scale(0.98)';
      leftBox.style.opacity = '0';
      rightBox.style.opacity = '0';

      if (!isSwapped) {
        largeBox.insertBefore(rightBox, leftBox);
        rightBox.innerHTML = signupFormHTML;
        rightBox.style.background = 'linear-gradient(135deg, #f5f7fa, #ffffff)';
        ticketButton.textContent = 'GO BACK';
      } else {
        largeBox.insertBefore(leftBox, rightBox);
        rightBox.innerHTML = originalRightContent;
        rightBox.style.background = 'linear-gradient(135deg, rgba(192,192,192,0.9), rgba(255,255,255,1), rgba(192,192,192,0.9))';
        ticketButton.textContent = 'GET A TICKET';
        updateCountdown(); // restore countdown
      }

      void leftBox.offsetWidth;

      leftBox.style.transition = 'transform 0.6s ease, opacity 0.4s ease';
      rightBox.style.transition = 'transform 0.6s ease, opacity 0.4s ease';
      leftBox.style.transform = 'translateX(0) scale(1)';
      rightBox.style.transform = 'translateX(0) scale(1)';
      leftBox.style.opacity = '1';
      rightBox.style.opacity = '1';

      setTimeout(() => {
        isAnimating = false;
        isSwapped = !isSwapped;
      }, 600);
    }, 600);
  });

  // Optional: Form submit handler
  document.addEventListener('submit', function (e) {
    if (e.target.matches('.signup-form')) {
      e.preventDefault();
      alert('Form submitted successfully!');
      // You can add fetch/POST logic here
    }
  });
});
