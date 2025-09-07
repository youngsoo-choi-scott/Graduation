document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector(".grid");
  const squareSize = 40;
  const radius = 120; // 반경 크기

  const cols = Math.floor(window.innerWidth / squareSize);
  const rows = Math.floor(window.innerHeight / squareSize);
  const totalSquares = cols * rows;

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    const content = document.createElement("div");
    content.classList.add("content");
    square.appendChild(content);

    grid.appendChild(square);
  }

  // 디버깅용 반경 표시
  const debugCircle = document.createElement("div");
  debugCircle.style.position = "absolute";
  debugCircle.style.border = "2px dashed red";
  debugCircle.style.borderRadius = "50%";
  debugCircle.style.pointerEvents = "none";
  debugCircle.style.zIndex = "1000";
  debugCircle.style.width = `${radius * 2}px`;
  debugCircle.style.height = `${radius * 2}px`;
  document.body.appendChild(debugCircle);

  // 마우스 움직임 감지
  window.addEventListener("mousemove", (event) => {
    const squares = document.querySelectorAll(".square");
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    debugCircle.style.left = `${mouseX - radius}px`;
    debugCircle.style.top = `${mouseY - radius}px`;

    squares.forEach((square) => {
      const rect = square.getBoundingClientRect();
      const squareCenterX = rect.left + rect.width / 2;
      const squareCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(mouseX - squareCenterX, 2) +
        Math.pow(mouseY - squareCenterY, 2)
      );

      if (distance < radius) {
        square.classList.add("hover");
      } else {
        square.classList.remove("hover");
      }
    });
  });
});
