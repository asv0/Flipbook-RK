// function reveal(e) {
//   const reveal = document.querySelector(".reveal");
//   const video = document.querySelector(".video-layer video");
//   const divider = document.getElementById("divider");
//   const handle = document.getElementById("handle");

//   const rect = reveal.getBoundingClientRect();
//   let x = e.clientX - rect.left;

//   let width = reveal.offsetWidth;

//   if (x < 0) x = 0;
//   if (x > width) x = width;

//   // Convert mouse position to percentage
//   let percent = (x / width) * 100;

//   video.style.clipPath = `inset(0 0 0 ${percent}%)`;

//   divider.style.left = x + "px";
//   handle.style.left = x + "px";
// }

const revealContainer = document.querySelector(".reveal");
const video = document.querySelector(".video-layer video");
const divider = document.getElementById("divider");
const handle = document.getElementById("handle");

let dragging = false;

function reveal(e) {
  const rect = revealContainer.getBoundingClientRect();

  const clientX = e.touches
    ? e.touches[0].clientX
    : e.clientX;

  let x = clientX - rect.left;
  const width = rect.width;

  // clamp position
  x = Math.max(0, Math.min(x, width));

  const percent = (x / width) * 100;

  video.style.clipPath = `inset(0 0 0 ${percent}%)`;
  divider.style.left = x + "px";
  handle.style.left = x + "px";
}

// ---------- Desktop ----------
revealContainer.addEventListener("mousedown", () => dragging = true);
window.addEventListener("mouseup", () => dragging = false);
window.addEventListener("mousemove", e => {
  if (dragging) reveal(e);
});

// ---------- Mobile ----------
revealContainer.addEventListener("touchstart", () => dragging = true, { passive:true });
window.addEventListener("touchend", () => dragging = false);
window.addEventListener("touchmove", e => {
  if (dragging) reveal(e);
}, { passive:true });

window.addEventListener("load", () => {
  const width = revealContainer.offsetWidth;
  const startX = width / 2;

  divider.style.left = startX + "px";
  handle.style.left = startX + "px";
});
