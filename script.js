document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector(".grid");
  const squareSize = 40; // 기본 사각형 크기
  const radius = 100; // 마우스 반경 (hover 효과 범위)

  // 계산하여 화면에 맞는 사각형 갯수 구하기
  const cols = Math.floor(window.innerWidth / squareSize);
  const rows = Math.floor(window.innerHeight / squareSize);
  const totalSquares = cols * rows;

  // 그리드 사각형을 생성
  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    // 내부에 content 요소 추가
    const content = document.createElement("div");
    content.classList.add("content");
    square.appendChild(content);

    grid.appendChild(square);
  }

  // 마우스 움직임 감지
  window.addEventListener("mousemove", (event) => {
    const squares = document.querySelectorAll(".square");
    const mouseX = event.clientX; // 마우스 X 좌표
    const mouseY = event.clientY; // 마우스 Y 좌표

    squares.forEach((square) => {
      // 각 사각형의 중심 좌표 계산
      const rect = square.getBoundingClientRect();
      const squareCenterX = rect.left + rect.width / 2;
      const squareCenterY = rect.top + rect.height / 2;

      // 마우스와 각 사각형의 중심 사이의 거리 계산
      const distance = Math.sqrt(
        Math.pow(mouseX - squareCenterX, 2) + Math.pow(mouseY - squareCenterY, 2)
      );

      // 반경 내에 들어오면 hover 클래스 추가
      if (distance < radius) {
        square.classList.add("hover");
      } else {
        square.classList.remove("hover");
      }
    });
  });
});
