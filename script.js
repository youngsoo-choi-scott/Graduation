document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector(".right .grid"); // 오른쪽 영역에서 그리드 사용
  const squareSize = 32; // 사각형 크기
  const radius = 60; // 마우스 반경

  // 화면에 맞춰 그리드 사각형 생성
  const cols = Math.floor(grid.offsetWidth / squareSize);
  const rows = Math.floor(grid.offsetHeight / squareSize);
  const totalSquares = cols * rows;

  // 그리드 칸 생성
  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    const content = document.createElement("div");
    content.classList.add("content");
    square.appendChild(content);

    grid.appendChild(square);
  }

  // 디버그용 반경 원 (현재 투명하게 숨김)
  const debugCircle = document.createElement("div");
  debugCircle.style.position = "absolute";
  debugCircle.style.border = "2px dashed red";
  debugCircle.style.borderRadius = "50%";
  debugCircle.style.pointerEvents = "none";
  debugCircle.style.zIndex = "1000";
  debugCircle.style.width = `${radius * 2}px`;
  debugCircle.style.height = `${radius * 2}px`;
  debugCircle.style.opacity = "0"; // 눈에 보이지 않음
  document.body.appendChild(debugCircle);

  // 생성된 모든 사각형을 배열로 참조
  const squares = Array.from(grid.querySelectorAll(".square"));

  // 자동 하이라이트 옵션
  const AUTO_HIGHLIGHT_COUNT = 1;      // 동시에 하이라이트할 사각형 수
  const AUTO_HIGHLIGHT_INTERVAL = 900; // 주기 (ms)
  const HOVER_DURATION = 500;           // 하이라이트 지속 시간 (ms)

  // 사용자 애니메이션 제어 변수
  let autoHighlightActive = true;
  let autoHighlightTimer = null;

  // motion-reduce 설정을 존중 (무조건 애니메이션 안 함)
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    autoHighlightActive = false;
  }

  // 랜덤 인덱스 집합 얻기 함수
  function getRandomIndices(count) {
    const indices = new Set();
    while (indices.size < count && indices.size < squares.length) {
      const idx = Math.floor(Math.random() * squares.length);
      indices.add(idx);
    }
    return Array.from(indices);
  }

  // 자동 하이라이트 실행 함수
  function runAutoHighlight() {
    if (!autoHighlightActive) return;
    const indices = getRandomIndices(AUTO_HIGHLIGHT_COUNT);
    indices.forEach((idx) => {
      const sq = squares[idx];
      sq.classList.add("hover");
      setTimeout(() => {
        sq.classList.remove("hover");
      }, HOVER_DURATION);
    });
  }

  // 최초 실행 및 주기적 실행 타이머 시작
  if (autoHighlightActive) {
    runAutoHighlight(); // 로드 직후 한번 실행
    autoHighlightTimer = setInterval(runAutoHighlight, AUTO_HIGHLIGHT_INTERVAL);
  }

  // 마우스/터치 초기 상호작용 시 자동 하이라이트 종료 함수
  function stopAutoHighlight() {
    if (!autoHighlightActive) return;
    autoHighlightActive = false;
    if (autoHighlightTimer) {
      clearInterval(autoHighlightTimer);
      autoHighlightTimer = null;
    }
  }

  window.addEventListener("mousemove", () => stopAutoHighlight(), { once: true });
  window.addEventListener("touchstart", () => stopAutoHighlight(), { once: true });

  // 사용자가 마우스 이동했을 때 사각형 hover 활성화 여부 제어 (기존 로직 유지)
  window.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // 디버그 원 위치 업데이트(옵션)
    debugCircle.style.left = `${mouseX - radius}px`;
    debugCircle.style.top = `${mouseY - radius}px`;

    squares.forEach((square) => {
      const rect = square.getBoundingClientRect();
      const squareCenterX = rect.left + rect.width / 2;
      const squareCenterY = rect.top + rect.height / 2;

      const distance = Math.hypot(mouseX - squareCenterX, mouseY - squareCenterY);

      if (distance < radius) {
        square.classList.add("hover");
      } else {
        // 자동 하이라이트가 멈춘 경우에만 hover 제거 (자동 중일 땐 중복 제거 방지)
        if (!autoHighlightActive) {
          square.classList.remove("hover");
        }
      }
    });
  });
});
