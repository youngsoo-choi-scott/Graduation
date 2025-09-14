document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector(".right .grid");
  const gap = 5;
  const minSquareSize = 30; // 최소 사각형 크기(px)
  const radius = 60;

  function createSquares() {
    grid.innerHTML = "";

    // 그리드 영역 크기 (패딩 제외됨)
    const gridWidth = grid.clientWidth;
    const gridHeight = grid.clientHeight;

    // 열과 행 개수를 최소 크기와 간격 기준으로 계산
    const cols = Math.floor((gridWidth + gap) / (minSquareSize + gap));
    const rows = Math.floor((gridHeight + gap) / (minSquareSize + gap));
    const totalSquares = cols * rows;

    for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    const row = Math.floor(i / cols);
    const delay = row * 0.1;

    // 여기에 animation 스타일 추가
    square.style.animation = `waveColorChange 2s ease-in-out infinite`;
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
