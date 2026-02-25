const canvas = document.getElementById("playerCanvas");
const ctx = canvas.getContext("2d");

const GRID = 20;
let cellSize;

const mazeMap = [
  // y → rows
  [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
  [{},{},{},{},{},{},{},{},{},{e:1},{s:1,e:1,w:1},{e:1,w:1},{w:1,s:1},{},{},{},{},{},{},{}],
  [{},{},{},{},{},{},{},{},{},{},{n:1,s:1},{},{s:1,n:1},{},{},{},{},{},{},{}],
  [{},{},{},{},{},{},{},{e:1},{e:1},{s:1},{n:1,s:1},{},{n:1},{},{},{w:0,e:1},{w:1,s:1},{},{},{}],
  [{},{},{},{},{},{},{},{},{},{s:1},{n:1,e:1},{e:1,w:1},{e:1,w:1},{e:1,w:1},{e:1,w:1},{w:1,s:1},{n:1,s:1},{},{},{}],
  [{},{},{},{},{},{},{},{},{},{s:1},{},{},{},{},{},{n:1,s:1},{n:1,s:1},{},{},{}],
  [{},{},{},{},{},{},{},{},{},{s:1},{s:1,e:1},{e:1},{e:1},{s:1,},{},{s:1,n:1},{n:1,e:1},{e:1,w:1},{s:1,w:1},{}],
  [{},{},{},{},{},{},{},{},{},{e:1},{n:1},{},{s:1,e:1},{w:1,n:1},{},{s:1,n:1},{s:1,e:1,w:1},{e:1,w:1},{w:1,n:1},{}],
  [{},{},{},{},{},{},{},{},{},{},{},{},{s:1,n:1},{},{},{s:1,n:1},{s:1,n:1},{},{},{}],
  [{},{},{},{},{},{},{},{s:1,e:1,n:0,w:0},{w:1,e:1},{w:1,e:1},{w:1,e:1},{w:1,e:1},{w:1,s:0},{s:1,e:1},{w:1,e:1},{w:1,n:1},{s:1,e:1,n:1},{e:1,w:1},{w:1,s:1,n:0},{}],
  [{},{},{},{},{},{},{},{e:1,w:1},{e:1},{e:1,s:1,},{w:1,e:1},{w:1,e:1},{w:1,e:1},{w:1,e:1,n:1},{w:1,e:1},{w:1,e:1},{w:1,n:1},{},{n:1,s:0},{}],
  [{},{},{},{},{},{},{},{},{},{s:1},{},{},{},{},{},{},{},{},{},{}],
  [{},{},{},{},{},{},{},{},{},{e:1,s:0},{s:1,w:1},{},{},{},{},{},{},{},{},{}],
  [{},{},{},{},{},{},{},{},{},{s:1,e:1},{w:1,n:1},{},{},{},{},{},{},{},{},{}],
  [{},{},{},{},{},{},{},{},{},{s:1,n:1},{},{},{},{},{},{},{},{},{},{}],
  [{},{},{},{},{},{},{},{},{},{s:1,n:1},{s:1},{},{},{},{},{},{},{},{},{}],
  [{},{},{},{},{},{},{},{},{},{e:1},{s:1,n:1,w:1},{},{},{},{},{},{},{},{},{}],
  [{},{},{},{},{},{},{},{},{},{},{s:1,n:1},{},{},{},{},{},{},{},{},{}],
  [{},{},{},{},{},{},{},{},{},{},{s:0,e:1,n:1},{w:1},{},{},{},{},{},{},{},{}],
  [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
];

const playerImg = new Image();
playerImg.src = "assets/RK_Maze_Cursor.png";

let player = { x: 8, y: 3 };

function resize() {
  const size = canvas.parentElement.clientWidth;
  canvas.width = size;
  canvas.height = size;
  cellSize = size / GRID;
}
// function drawGrid() {
//   ctx.strokeStyle = "rgba(191, 0, 0, 0.3)";
//   for (let i = 0; i <= GRID; i++) {
//     ctx.beginPath();
//     ctx.moveTo(i * cellSize, 0);
//     ctx.lineTo(i * cellSize, canvas.height);
//     ctx.stroke();

//     ctx.beginPath();
//     ctx.moveTo(0, i * cellSize);
//     ctx.lineTo(canvas.width, i * cellSize);
//     ctx.stroke();
//   }
// }

function drawPlayer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    playerImg,
    player.x * cellSize + cellSize * 0.1,
    player.y * cellSize + cellSize * 0.1,
    cellSize * 0.8,
    cellSize * 0.8
  );
}

// function drawPlayer() {
//   ctx.drawImage(
//     playerImg,
//     player.x * cellSize + cellSize * 0.1,
//     player.y * cellSize + cellSize * 0.1,
//     cellSize * 0.8,
//     cellSize * 0.8
//   );
// }
// function drawConnections() {
//   ctx.strokeStyle = "rgba(0, 150, 255, 0.6)";
//   ctx.lineWidth = 4;

 

//   mazeMap.forEach((row, y) => {
//     row.forEach((cell, x) => {
//       const cx = x * cellSize + cellSize / 2;
//       const cy = y * cellSize + cellSize / 2;

//       if (cell.e) {
//         ctx.beginPath();
//         ctx.moveTo(cx, cy);
//         ctx.lineTo(cx + cellSize / 2, cy);
//         ctx.stroke();
//       }
//       if (cell.s) {
//         ctx.beginPath();
//         ctx.moveTo(cx, cy);
//         ctx.lineTo(cx, cy + cellSize / 2);
//         ctx.stroke();
//       }
//     });
//   });
// }
// function drawGoal() {
//    const goal = { x: 11, y: 18 };

//   ctx.fillStyle = "rgba(23, 159, 23, 0.35)";
//   ctx.beginPath();
//   ctx.arc(
//     goal.x * cellSize + cellSize / 2,
//     goal.y * cellSize + cellSize / 2,
//     cellSize * 0.3,
//     0,
//     Math.PI * 2
//   );
//   ctx.fill();
// }

function move(dir) {
    if (gameWon) return;
  if (canMove(dir)) {
    if (dir === "n") player.y--;
    if (dir === "s") player.y++;
    if (dir === "w") player.x--;
    if (dir === "e") player.x++;
    draw();
  }
  checkWin();

}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // TEMP DEBUG GRID
  // drawGrid();
// drawConnections();
  // PLAYER
  drawPlayer();
  drawGoal();
}


function canMove(dir) {
  return mazeMap[player.y]?.[player.x]?.[dir];
}

// window.addEventListener("keydown", e => {
//   if (e.key === "ArrowUp" && canMove("n")) player.y--;
//   if (e.key === "ArrowDown" && canMove("s")) player.y++;
//   if (e.key === "ArrowLeft" && canMove("w")) player.x--;
//   if (e.key === "ArrowRight" && canMove("e")) player.x++;

//   draw();
// });
// window.addEventListener("load", () => {
//     resize();
//   draw();
// });

// window.addEventListener("resize", () => {
//     resize();
//  draw();

 
 
// });

window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (["arrowup","arrowdown","arrowleft","arrowright"," "].includes(key)) {
    e.preventDefault();
  }

  if (key === "arrowup" || key === "w") move("n");
  else if (key === "arrowdown" || key === "s") move("s");
  else if (key === "arrowleft" || key === "a") move("w");
  else if (key === "arrowright" || key === "d") move("e");
});


let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}, { passive: true });

canvas.addEventListener("touchend", (e) => {
  const touch = e.changedTouches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;

  const threshold = 20; // swipe sensitivity

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > threshold) move("e");
    else if (dx < -threshold) move("w");
  } else {
    if (dy > threshold) move("s");
    else if (dy < -threshold) move("n");
  }
});


window.addEventListener("load", () => {
  resize();
  draw();
});

window.addEventListener("resize", () => {
  resize();
  draw();
});

function handleSwipe(dx, dy) {
  const threshold = 20; // minimum swipe distance

  if (Math.abs(dx) > Math.abs(dy)) {
    // horizontal swipe
    if (dx > threshold && canMove("e")) player.x++;
    if (dx < -threshold && canMove("w")) player.x--;
  } else {
    // vertical swipe
    if (dy > threshold && canMove("s")) player.y++;
    if (dy < -threshold && canMove("n")) player.y--;
  }

  draw();
}

/* ===== WIN CONFIG ===== */
const goal = { x: 11, y: 18 }; // change goal cell
let gameWon = false;
/* ====================== */

function checkWin() {
  if (player.x === goal.x && player.y === goal.y && !gameWon) {
    gameWon = true;
    showWinPopup();
  }
}
function showWinPopup() {
  const popup = document.getElementById("winPopup");
  popup.classList.add("show");
  launchConfetti();
}

function launchConfetti() {
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, i * 250);
  }
}