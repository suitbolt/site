// ==============================
// 🚀 SITE FEATURES
// ==============================

// Toggle Mobile Menu
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

if (burger) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

// ==============================
// ⏳ COUNTDOWN TIMER + MODAL + REDIRECT
// ==============================

const countdownEl = document.getElementById("countdown");
const launchDate = countdownEl.getAttribute("data-launch");
const redirectUrl = countdownEl.getAttribute("data-redirect");
const popupModal = document.getElementById("popupModal");

const targetDate = new Date(launchDate).getTime();

const redirectToPage = () => {
  if (redirectUrl) {
    window.location.href = redirectUrl;
  }
};

const countdown = () => {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference <= 0) {
    // Show popup modal
    popupModal.style.display = "flex";

    // Redirect after 3 seconds
    setTimeout(() => {
      redirectToPage();
    }, 3000);

    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
};

setInterval(countdown, 1000);

// ==============================
// ⚡ Neon Electron Simulation with Repulsion + Network
// ==============================
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 70;
const mouse = { x: null, y: null, radius: 120 };

// Neon electron colors
const colors = ["#00f7ff", "#ff00ff", "#00ff88", "#ff0088", "#a29bfe", "#ffeaa7"];

// Create particles (electrons)
for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    radius: Math.random() * 3 + 2,
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Apply repulsion between particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100 && distance > 0) {
        let force = (1 / distance) * 0.6;
        let fx = (dx / distance) * force;
        let fy = (dy / distance) * force;

        particles[i].vx += fx;
        particles[i].vy += fy;
        particles[j].vx -= fx;
        particles[j].vy -= fy;
      }
    }
  }

  // Draw + move particles
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

    // Neon glow
    ctx.shadowBlur = 20;
    ctx.shadowColor = p.color;
    ctx.fillStyle = p.color;
    ctx.fill();

    // Update position
    p.x += p.vx;
    p.y += p.vy;

    // Friction
    p.vx *= 0.95;
    p.vy *= 0.95;

    // Bounce off edges
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    // Mouse interaction (repel)
    if (mouse.x && mouse.y) {
      let dx = p.x - mouse.x;
      let dy = p.y - mouse.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        let angle = Math.atan2(dy, dx);
        let push = (mouse.radius - dist) / mouse.radius;
        p.vx += Math.cos(angle) * push * 1.5;
        p.vy += Math.sin(angle) * push * 1.5;
      }
    }
  });

  // Connect nearby particles with glowing lines
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 140) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255," + (1 - distance / 140) + ")";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ffffff";
        ctx.lineWidth = 1;
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  drawParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Mouse tracking
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener("mouseout", () => {
  mouse.x = null;
  mouse.y = null;
});
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ==============================
// ⏳ Countdown Timer
// ==============================
const timerEl = document.getElementById("timer");
const countdownDate = new Date().getTime() + 1000 * 60 * 60 * 24; // 24h from now

function updateTimer() {
  let now = new Date().getTime();
  let distance = countdownDate - now;

  if (distance <= 0) {
    timerEl.innerHTML = "🚀 Surprise Revealed!";
    return;
  }

  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  timerEl.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateTimer, 1000);

// ==============================
// 🎉 Surprise Reveal Popup + Confetti
// ==============================
const modal = document.getElementById("surpriseModal");
const closeModal = document.getElementById("closeModal");

function launchConfetti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      }
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Modify countdown to show modal
function updateTimer() {
  let now = new Date().getTime();
  let distance = countdownDate - now;

  if (distance <= 0) {
    timerEl.innerHTML = "🚀 Surprise Revealed!";
    modal.classList.add("show");
    launchConfetti();
    return;
  }

  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  timerEl.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
}

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});


