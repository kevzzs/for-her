// Star animation
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
      dy: Math.random() * 0.2,
    });
  }
}
function createShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width,
    y: (Math.random() * canvas.height) / 2,
    length: Math.random() * 80 + 20,
    speed: 4 + Math.random() * 4,
    angle: Math.PI / 4,
  });
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
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
    if (s.x > canvas.width || s.y > canvas.height) {
      shootingStars.splice(index, 1);
    }
  });
  requestAnimationFrame(draw);
}
setInterval(() => {
  if (Math.random() < 0.5) createShootingStar();
}, 1000);

createStars();
draw();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Music logic
const playBtn = document.getElementById("playBtn");
const music = document.getElementById("music");
let warning = document.querySelector(".warning");
let isPlaying = false;

playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    music.play();
    playBtn.textContent = "⏸";
    warning.textContent =
      "You won’t hear anything yet.. but make sure your volume is up!";
  } else {
    music.pause();
    playBtn.textContent = "▶";
    warning.textContent =
      "Still waiting for the moment? Pick a button to play the music.";
  }
  isPlaying = !isPlaying;
});
