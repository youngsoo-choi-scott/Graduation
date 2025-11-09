document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector(".right .grid");
  const gap = 8;
  const minSquareSize = 32;
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
      if (Math.random() > 0.6) continue; // 약 40% 확률로만 생성
      
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

  window.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;

    squares().forEach((square) => {
      const rect = square.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(touchX - centerX, touchY - centerY);

      if (distance < radius) {
        square.classList.add("hover");
        square.style.animationPlayState = 'running';
      } else {
        square.classList.remove("hover");
        square.style.animationPlayState = 'running';
      }
    });
  });

  window.addEventListener("touchend", () => {
    squares().forEach((square) => {
      square.classList.remove("hover");
      square.style.animationPlayState = 'running';
    });
  });

  window.addEventListener("resize", () => {
    createSquares();
  });
});




document.addEventListener("DOMContentLoaded", function () {
  // DOM 요소 가져오기
  const filterSelect = document.getElementById("filterSelect");
  const allLists = document.querySelectorAll(".designer-list ul"); // 모든 ul
  const allDesignerItems = document.querySelectorAll(".designer-list li"); // 모든 li

  // select 태그 변경 이벤트 핸들링
  filterSelect.addEventListener("change", function () {
    const selectedMajor = filterSelect.value;

    // 모든 ul을 순회하며 각 ul 내부의 li를 필터링
    allLists.forEach((list) => {
      const listItems = list.querySelectorAll("li"); // 해당 ul의 모든 li 가져오기

      // 각 li를 확인하며 조건에 따라 표시/숨김 처리
      let hasVisibleItems = false; // 해당 ul이 비어 있는지 여부 확인
      listItems.forEach((item) => {
        if (selectedMajor === "all" || item.dataset.major === selectedMajor) {
          item.style.display = ""; // 보여주기
          hasVisibleItems = true; // 하나라도 표시되면 true
        } else {
          item.style.display = "none"; // 숨기기
        }
      });

      // ul 전체를 숨길지 결정
      if (hasVisibleItems) {
        list.style.display = ""; // ul을 보여줌
      } else {
        list.style.display = "none"; // ul 자체를 숨김
      }
    });
  });
});
