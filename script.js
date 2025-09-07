document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector(".grid");
  const squareSize = 30; // 사각형 크기 (px)
  const gapSize = 10; // 사각형 간의 여백 (px)
  
  // 화면 전체를 채우기 위해 정사각형 크기와 간격 계산
  const cols = Math.floor(window.innerWidth / (squareSize + gapSize));
  const rows = Math.floor(window.innerHeight / (squareSize + gapSize));
  const totalSquares = cols * rows;

  // 정사각형 추가
  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
  }
});
