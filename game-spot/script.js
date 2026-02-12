// function reveal(event) {
//     const container = event.currentTarget;
//     const rect = container.getBoundingClientRect();
    
//     const x = event.clientX - rect.left;
    
//     const percentage = (x / rect.width) * 100;

//     event.target.previousElementSibling.style.clipPath = `inset(0 0 0 ${percentage}%)`;
// }

function reveal(e) {
  const reveal = document.querySelector(".reveal");
  const videoLayer = document.getElementById("videoLayer");
  const divider = document.getElementById("divider");
  const handle = document.getElementById("handle");

  let x = e.offsetX;
  let width = reveal.offsetWidth;

  // Limit movement
  if (x < 0) x = 0;
  if (x > width) x = width;

  // Move video reveal
  videoLayer.style.width = x + "px";

  // Move divider
  divider.style.left = x + "px";

  // Move handle
  handle.style.left = x + "px";
}