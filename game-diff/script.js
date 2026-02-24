// ===== SELECT ELEMENTS =====
const spots = document.querySelectorAll(".spot");
// const statusText = document.getElementById("status");
const popup = document.getElementById("winPopup");

let found = 0;
const total = spots.length;


// ===== CLICK HANDLER =====
spots.forEach(spot => {
  spot.addEventListener("click", () => {

    if (spot.classList.contains("found")) return;

    spot.classList.add("found");

    // create marker
    const marker = document.createElement("img");
    marker.src = "assets/RK_Check.png";
    marker.className = "marker";

    spot.appendChild(marker);

    // update score
    found++;
    // statusText.textContent = `Found: ${found} / ${total}`;

    // win condition
    if (found === total) {
      setTimeout(showWin, 500);
    }
  });
});


// ===== WIN ANIMATION =====
function showWin() {
  popup.style.display = "block";

  setTimeout(() => {
    document.addEventListener("click", closePopupOnce);
  }, 900);
}
function closePopupOnce() {
  closePopup();
  document.removeEventListener("click", closePopupOnce);
}

function closePopup() {
  popup.style.display = "none";

  found = 0;

  spots.forEach(spot => {
    spot.classList.remove("found");
    spot.innerHTML = "";
  });
}
