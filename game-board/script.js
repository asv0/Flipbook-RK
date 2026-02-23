const spots = document.querySelectorAll(".spot");
const statusText = document.getElementById("status");

let found = 0;
const total = spots.length;

spots.forEach(spot => {
  spot.addEventListener("click", () => {

    if (!spot.classList.contains("found")) {
      spot.classList.add("found");
      found++;

      statusText.textContent = `Found: ${found} / ${total}`;

      if (found === total) {
        setTimeout(() => {
          alert("🎉 You found all the differences!");
        }, 300);
      }
    }

  });
});