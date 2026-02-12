// function reveal(event) {
//     const container = event.currentTarget;
//     const rect = container.getBoundingClientRect();
    
//     const x = event.clientX - rect.left;
    
//     const percentage = (x / rect.width) * 100;

//     event.target.previousElementSibling.style.clipPath = `inset(0 0 0 ${percentage}%)`;
// }

function reveal(e) {
  const reveal = document.querySelector(".reveal");
  const video = document.querySelector(".video-layer video");
  const divider = document.getElementById("divider");
  const handle = document.getElementById("handle");

  const rect = reveal.getBoundingClientRect();
  let x = e.clientX - rect.left;

  let width = reveal.offsetWidth;

  if (x < 0) x = 0;
  if (x > width) x = width;

  // Convert mouse position to percentage
  let percent = (x / width) * 100;

  video.style.clipPath = `inset(0 0 0 ${percent}%)`;

  divider.style.left = x + "px";
  handle.style.left = x + "px";
}
