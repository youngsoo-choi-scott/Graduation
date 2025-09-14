document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector(".right .grid");
  const squareSize = 32; // 기준 크기 (참고 용)

  // 화면 크기 기준 컬럼, 행 계산 (가로, 세로)
  // grid-template-columns이 유동적이므로, 사각형 크기는 그리드 컨테이너 크기에 따름

  // 페이지 로드 시 그리드 사각형 요소 생성
  function createSquares() {
    // 기존 사각형 모두 제거(필요 시)
    grid.innerHTML = "";

    // 그리드 컨테이너 크기
    const gridWidth = grid.clientWidth;
    const gridHeight = grid.clientHeight;

    // 패딩과 간격 고려하여 사각형 개수 계산
    const gap = 5;
    const padding = 15 * 2; // 양쪽 패딩 합
    // 최대한 꽉 차도록 사각형 개수 산출

    // 임의로 가로 최소 32px로 계산 (optional)
    // 여기서는 그리드가 auto-fill로 처리하므로 대략적인 개수만 산출하고 생성
    const cols = Math.floor(gridWidth / (squareSize + gap));
    const rows = Math.floor(gridHeight / (squareSize + gap));
    const totalSquares = cols * rows;

    for (let i = 0; i < totalSquares; i++) {
      const square = document.createElement("div");
      square.classList.add("square");
      grid.appendChild(square);
    }
  }

  createSquares();

  const squares = Array.from(grid.querySelectorAll(".square"));
  const radius = 60;

  // 마우스 이동에 따른 hover 처리
  window.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    squares.forEach((square) => {
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

  // 윈도우 리사이즈 시 그리드 재생성 (유동적 대응)
  window.addEventListener("resize", () => {
    createSquares();
  });
});
