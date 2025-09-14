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

  const delayUnit = 0.1;

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    const row = Math.floor(i / cols);
    const col = i % cols;

    const delay = (row + col) * delayUnit;

    square.style.animation = `waveColorChange 7s steps(1, end) infinite`;
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
