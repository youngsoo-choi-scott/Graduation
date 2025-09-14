document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector(".right .grid");
  const gap = 5;
  const minSquareSize = 30;
  const timePerSquare = 0.15; // 한 칸 애니메이션 시간(초)

  function createSquares() {
    grid.innerHTML = "";

    const gridWidth = grid.clientWidth;
    const gridHeight = grid.clientHeight;

    const cols = Math.floor((gridWidth + gap) / (minSquareSize + gap));
    const rows = Math.floor((gridHeight + gap) / (minSquareSize + gap));
    const totalSquares = cols * rows;

    const totalDuration = timePerSquare * totalSquares; // 전체 애니메이션 시간 (초)

    for (let i = 0; i < totalSquares; i++) {
      const square = document.createElement("div");
      square.classList.add("square");

      const row = Math.floor(i / cols);
      const col = i % cols;

      // 순차 딜레이 계산
      const delay = (row * cols + col) * timePerSquare;

      // 카드 뒤집기 애니메이션 적용
      square.style.animation = `flipColorChange ${totalDuration}s steps(1, end) infinite`;
      square.style.animationDelay = `${delay}s`;

      grid.appendChild(square);
    }
  }

  createSquares();

  // 마우스 오버 처리 – 애니메이션 일시정지 및 변형 효과 적용
  const squares = () => Array.from(grid.querySelectorAll(".square"));
  window.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    squares().forEach((square) => {
      const rect = square.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(mouseX - centerX, mouseY - centerY);

      if (distance < 60) { // radius 값 유지
        square.classList.add("hover");
      } else {
        square.classList.remove("hover");
      }
    });
  });

  window.addEventListener("resize", createSquares);
});
