const canvas = document.getElementById("playerCanvas");
const ctx = canvas.getContext("2d");

const GRID = 20;
let cellSize;

// 🧩 MANUAL COLLISION MAP (EDIT THIS)
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
  [{},{},{},{},{},{},{},{},{},{},{s:1,e:1,n:1},{w:1},{},{},{},{},{},{},{},{}],
  [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
];

const playerImg = new Image();
playerImg.src = "assets/RK_Maze_Cursor.png";

let player = { x: 7, y: 3 };

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
function drawGoal() {
   const goal = { x: 11, y: 18 };

  ctx.fillStyle = "rgba(23, 159, 23, 0.35)";
  ctx.beginPath();
  ctx.arc(
    goal.x * cellSize + cellSize / 2,
    goal.y * cellSize + cellSize / 2,
    cellSize * 0.3,
    0,
    Math.PI * 2
  );
  ctx.fill();
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // TEMP DEBUG GRID
//   drawGrid();
// drawConnections();
  // PLAYER
  drawPlayer();
  drawGoal();
}


function canMove(dir) {
  return mazeMap[player.y]?.[player.x]?.[dir];
}

window.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && canMove("n")) player.y--;
  if (e.key === "ArrowDown" && canMove("s")) player.y++;
  if (e.key === "ArrowLeft" && canMove("w")) player.x--;
  if (e.key === "ArrowRight" && canMove("e")) player.x++;

  draw();
});
window.addEventListener("load", () => {
    resize();
  draw();
});

window.addEventListener("resize", () => {
    resize();
 draw();
});










// function Coordinate(x, y) {
//   this.x = x;
//   this.y = y;
// }
// function rand(max) {
//   return Math.floor(Math.random() * max);
// }
// function shuffle(arr) {
//   for (let i = arr.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [arr[i], arr[j]] = [arr[j], arr[i]];
//   }
//   return arr;
// }
// // ------------------ Maze ------------------
// function Maze(width, height) {
//   let map = [];
//   let startCoord, endCoord;
//   const dirs = ["n", "s", "e", "w"];
//   const mod = {
//     n: { x: 0, y: -1, o: "s" },
//     s: { x: 0, y: 1, o: "n" },
//     e: { x: 1, y: 0, o: "w" },
//     w: { x: -1, y: 0, o: "e" },
//   };
//   this.map = () => map;
//   this.startCoord = () => startCoord;
//   this.endCoord = () => endCoord;
//   function initMap() {
//     for (let y = 0; y < height; y++) {
//       map[y] = [];
//       for (let x = 0; x < width; x++) {
//         map[y][x] = { n: false, s: false, e: false, w: false, visited: false };
//       }
//     }
//   }
//   function defineStartEnd() {
//     startCoord = new Coordinate(0, 0);
//     endCoord = new Coordinate(width - 1, height - 1);
//   }
//   function carve() {
//     let stack = [];
//     let current = new Coordinate(0, 0);
//     map[0][0].visited = true;
//     stack.push(current);
//     while (stack.length) {
//       let { x, y } = current;
//       let neighbors = [];
//       for (let d of dirs) {
//         let nx = x + mod[d].x;
//         let ny = y + mod[d].y;
//         if (
//           nx >= 0 &&
//           ny >= 0 &&
//           nx < width &&
//           ny < height &&
//           !map[ny][nx].visited
//         ) {
//           neighbors.push({ d, nx, ny });
//         }
//       }
//       if (neighbors.length) {
//         let next = neighbors[rand(neighbors.length)];
//         map[y][x][next.d] = true;
//         map[next.ny][next.nx][mod[next.d].o] = true;
//         current = new Coordinate(next.nx, next.ny);
//         map[next.ny][next.nx].visited = true;
//         stack.push(current);
//       } else {
//         current = stack.pop();
//       }
//     }
//   }
//   initMap();
//   defineStartEnd();
//   carve();
// }

// function DrawMaze(maze, ctx, cellSize) {
//   const map = maze.map();
//   function drawCell(x, y, cell) {
//     const px = x * cellSize;
//     const py = y * cellSize;
//     ctx.lineWidth = 2;
//     if (!cell.n) {
//       ctx.beginPath();
//       ctx.moveTo(px, py);
//       ctx.lineTo(px + cellSize, py);
//       ctx.stroke();
//     }
//     if (!cell.s) {
//       ctx.beginPath();
//       ctx.moveTo(px, py + cellSize);
//       ctx.lineTo(px + cellSize, py + cellSize);
//       ctx.stroke();
//     }
//     if (!cell.e) {
//       ctx.beginPath();
//       ctx.moveTo(px + cellSize, py);
//       ctx.lineTo(px + cellSize, py + cellSize);
//       ctx.stroke();
//     }
//     if (!cell.w) {
//       ctx.beginPath();
//       ctx.moveTo(px, py);
//       ctx.lineTo(px, py + cellSize);
//       ctx.stroke();
//     }
//   }
//   this.draw = function () {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     for (let y = 0; y < map.length; y++) {
//       for (let x = 0; x < map[y].length; x++) {
//         drawCell(x, y, map[y][x]);
//       }
//     }
//     const end = maze.endCoord();
//     ctx.fillStyle = "black";
//     ctx.fillRect(
//       end.x * cellSize + cellSize / 4,
//       end.y * cellSize + cellSize / 4,
//       cellSize / 2,
//       cellSize / 2,
//     );
//   };
// }
// // ------------------ Player ------------------
// // const logoImg = new Image();
// // logoImg.src = "../assets/RK_Maze_Cursor.png";

// function Player(maze, ctx, cellSize, onWin) {
//   let pos = maze.startCoord();
//   let moves = 0;
//   const map = maze.map();
  
//   function draw() {
//     ctx.fillStyle = "yellow";
//     ctx.beginPath();
//     ctx.arc(
//       pos.x * cellSize + cellSize / 2,
//       pos.y * cellSize + cellSize / 2,
//       cellSize / 3,
//       0,
//       Math.PI * 2,
//     );
//     ctx.fill();
//   }

//   function clear() {
//     ctx.clearRect(
//       pos.x * cellSize + 2,
//       pos.y * cellSize + 2,
//       cellSize - 4,
//       cellSize - 4,
//     );
//   }
//   function move(dx, dy, dir) {
//     const cell = map[pos.y][pos.x];
//     if (!cell[dir]) return;
//     clear();
//     pos = new Coordinate(pos.x + dx, pos.y + dy);
//     moves++;
//     draw();
//     if (pos.x === maze.endCoord().x && pos.y === maze.endCoord().y) {
//       window.removeEventListener("keydown", keyHandler);
//       canvas.removeEventListener("mousedown", mouseHandler);
//       onWin(moves);
//     }
//   }
//   function keyHandler(e) {
//     switch (e.key) {
//       case "ArrowUp":
//       case "w":
//         move(0, -1, "n");
//         break;
//       case "ArrowDown":
//       case "s":
//         move(0, 1, "s");
//         break;
//       case "ArrowLeft":
//       case "a":
//         move(-1, 0, "w");
//         break;
//       case "ArrowRight":
//       case "d":
//         move(1, 0, "e");
//         break;
//     }
//   }
//   function mouseHandler(e) {
//     const rect = canvas.getBoundingClientRect();
//     const cx = pos.x * cellSize + cellSize / 2;
//     const cy = pos.y * cellSize + cellSize / 2;
//     const mx = e.clientX - rect.left;
//     const my = e.clientY - rect.top;
//     const dx = mx - cx;
//     const dy = my - cy;
//     if (Math.abs(dx) > Math.abs(dy)) {
//       dx > 0 ? move(1, 0, "e") : move(-1, 0, "w");
//     } else {
//       dy > 0 ? move(0, 1, "s") : move(0, -1, "n");
//     }
//   }
//   window.addEventListener("keydown", keyHandler);
//   canvas.addEventListener("mousedown", mouseHandler);
//   draw();
// }

// // ------------------ Game Bootstrap ------------------
// const canvas = document.getElementById("mazeCanvas");
// const ctx = canvas.getContext("2d");
// let difficulty = 10;

// function resizeCanvas() {
//   const container = document.getElementById("mazeContainer");
//   const size = Math.min(container.clientWidth, 700);
//   canvas.width = size;
//   canvas.height = size;
// }
// resizeCanvas();

// function startGame() {
//   const difficulty = 10;
//   const cellSize = canvas.width / difficulty;
//   const maze = new Maze(difficulty, difficulty);
//   const draw = new DrawMaze(maze, ctx, cellSize);
//   draw.draw();
// }
// window.makeMaze = startGame;

// // Auto-start maze on page load (iframe-safe)
// window.addEventListener("load", () => {
//   startGame();
// });
