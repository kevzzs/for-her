const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let shootingStars = [];

function createStars() {
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      alpha: Math.random(),
      dx: Math.random() * 0.2,
      dy: Math.random() * 0.2
    });
  }
}

function createShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height / 2,
    length: Math.random() * 80 + 20,
    speed: 4 + Math.random() * 4,
    angle: Math.PI / 4
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw stars
  stars.forEach(star => {
    ctx.beginPath();
    ctx.globalAlpha = star.alpha;
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();

    star.x += star.dx;
    star.y += star.dy;

    if (star.x > canvas.width || star.y > canvas.height) {
      star.x = Math.random() * canvas.width;
      star.y = 0;
    }
  });

  // Draw shooting stars
  shootingStars.forEach((s, index) => {
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(
      s.x - s.length * Math.cos(s.angle),
      s.y - s.length * Math.sin(s.angle)
    );
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    s.x += s.speed;
    s.y += s.speed;

    // Remove after it goes off screen
    if (s.x > canvas.width || s.y > canvas.height) {
      shootingStars.splice(index, 1);
    }
  });

  requestAnimationFrame(draw);
}

// Shooting star spawn interval
setInterval(() => {
  if (Math.random() < 0.5) {
    createShootingStar();
  }
}, 1000);

createStars();
draw();

// Resize handling
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Music & Scroll
const clickBtn = document.getElementById("clickBtn");
const bgMusic = document.getElementById("bgMusic");
const letterSection = document.getElementById("letter");

clickBtn.addEventListener("click", () => {
  bgMusic.play();
  letterSection.classList.remove("hidden");
  letterSection.scrollIntoView({ behavior: "smooth" });
});
