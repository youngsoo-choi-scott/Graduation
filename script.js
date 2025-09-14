document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector(".right .grid");
  const gap = 5;
  const minSquareSize = 30;
  const radius = 100;

  function createSquares() {
    grid.innerHTML = "";

    const gridWidth = grid.clientWidth;
    const gridHeight = grid.clientHeight;

    const cols = Math.floor((gridWidth + gap) / (minSquareSize + gap));
    const rows = Math.floor((gridHeight + gap) / (minSquareSize + gap));
    const totalSquares = cols * rows;

    const durationBase = 10;       // 기본 애니메이션 시간 (초)
    const durationVariance = 4;    // ±4초 변동폭

    for (let i = 0; i < totalSquares; i++) {
      const square = document.createElement("div");
      square.classList.add("square");

      // 애니메이션 딜레이를 0~12초 사이 임의로 설정 (완전 랜덤 효과)
      const delay = Math.random() * 12;

      // 애니메이션 시간도 약간씩 다르게 설정해서 자연스러운 움직임 연출
      const duration = durationBase + (Math.random() * durationVariance * 2 - durationVariance);

      square.style.animationDelay = `${delay.toFixed(2)}s`;
      square.style.animationDuration = `${duration.toFixed(2)}s`;

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
        // 애니메이션 멈춤 제거, 계속 실행 상태 유지
        square.style.animationPlayState = 'running';
      } else {
        square.classList.remove("hover");
        square.style.animationPlayState = 'running';
      }
    });
  });

  window.addEventListener("resize", () => {
    createSquares();
  });
});
