document.addEventListener("DOMContentLoaded", function () {
const grid = document.querySelector(".right .grid");
const gap = 5;
const minSquareSize = 30; // 최소 사각형 크기(px)
const radius = 60;

function createSquares() {
  grid.innerHTML = "";

  const gridWidth = grid.clientWidth;
  const gridHeight = grid.clientHeight;

  const cols = Math.floor((gridWidth + gap) / (minSquareSize + gap));
  const rows = Math.floor((gridHeight + gap) / (minSquareSize + gap));
  const totalSquares = cols * rows;

  const timePerSquare = 0.15; // 한 칸당 애니메이션 소요 시간(초)
  const animationDuration = timePerSquare * totalSquares; // 전체 애니메이션 시간

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    const row = Math.floor(i / cols);
    const col = i % cols;

    // 한 칸씩 순차적으로 진행되도록 딜레이 계산
    const delay = (row * cols + col) * timePerSquare;

    square.style.animation = `waveColorChange ${animationDuration}s steps(${totalSquares}, end) infinite`;
    square.style.animationDelay = `${delay}s`;

    grid.appendChild(square);
  }
}

createSquares();

const squares = () => Array.from(grid.querySelectorAll(".square"));

window.addEventListener("mousemove", (event) => {
const mouseX = event.clientX;
const mouseY = event.clientY;
squares().forEach((square) => {
const rect = square.getBoundingClientRect();
const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;
const distance = Math.hypot(mouseX - centerX, mouseY - centerY);

if (distance < radius) {
square.classList.add("hover");
} else {
square.classList.remove("hover");
}
});
});

window.addEventListener("resize", () => {
createSquares();
});
});
