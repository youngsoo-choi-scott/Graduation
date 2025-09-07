// 화면을 꽉 채우기 위해 사각형 동적으로 생성
document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector(".grid");
  const squareSize = 30; // 각 정사각형 크기
  const cols = Math.floor(window.innerWidth / squareSize); // 화면 너비 기준 열 개수 계산
  const rows = Math.floor(window.innerHeight / squareSize); // 화면 높이 기준 행 개수 계산
  const totalSquares = cols * rows;

  // 내부에 정사각형 추가
  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
  }
});
