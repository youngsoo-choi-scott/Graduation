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





document.getElementById("category").addEventListener("change", function() {
  const selectedCategory = this.value;
  const items = document.querySelectorAll(".designer-list ul li");

  items.forEach((item) => {
    if (selectedCategory === "all" || item.classList.contains(selectedCategory)) {
      item.classList.remove("hidden");  // 보이기
    } else {
      item.classList.add("hidden");    // 숨기기
    }
  });
});





// 정렬 이벤트 리스너 추가
document.querySelector('select[style="padding-left: 10px;"]').addEventListener("change", function () {
  const sortOrder = this.value; // 1은 오름차순, 2는 내림차순
  const ul = document.querySelector(".designer-list ul");
  const items = Array.from(ul.children);

  // 정렬 실행
  items.sort(function (a, b) {
    const nameA = a.querySelector("span").innerText.toLowerCase(); // 첫 번째 span (한글 이름)
    const nameB = b.querySelector("span").innerText.toLowerCase();
    if (sortOrder === "1") {
      return nameA > nameB ? 1 : -1; // 오름차순
    } else {
      return nameA < nameB ? 1 : -1; // 내림차순
    }
  });

  // 정렬된 순서로 ul에 다시 추가
  items.forEach((item) => ul.appendChild(item));
});




// 실시간 검색 기능
document.querySelector(".list-filter-search input").addEventListener("input", function () {
  const searchInput = this.value.toLowerCase(); // 검색창에 입력된 텍스트 (소문자로 변환)
  const items = document.querySelectorAll(".designer-list ul li"); // 모든 디자이너 항목

  items.forEach((item) => {
    const name = item.querySelector("p span:first-child").innerText.toLowerCase(); // 한글 이름
    const englishName = item.querySelector("p span:last-child").innerText.toLowerCase(); // 영문 이름

    // 입력된 텍스트가 이름이나 영문 이름에 포함되었는지 여부 확인
    if (name.includes(searchInput) || englishName.includes(searchInput)) {
      item.style.display = "block"; // 관련 결과는 보이기
    } else {
      item.style.display = "none"; // 나머지는 숨기기
    }
  });
});




// 검색 입력 필드가 비는 경우 모든 항목 표시
if (name.includes(searchInput) || englishName.includes(searchInput)) {
  item.style.display = "block"; // 모든 항목 표시
} else {
  item.style.display = "none"; // 숨기기
}





// border-right 업데이트 함수
function updateBorders() {
  const items = Array.from(document.querySelectorAll(".designer-list ul li")); // 모든 li 요소를 배열로 가져옴
  let visibleIndex = 0; // 화면상에서 보이는 요소의 순서
  
  // 모든 요소를 순회하며 보이는 요소에 대해서만 처리
  items.forEach((item) => {
    if (item.style.display !== "none") {
      item.style.borderRight = "1px solid #f25100"; // 초기화
      if ((visibleIndex + 1) % 4 === 0) {
        item.style.borderRight = "none"; // 네 번째 항목에서만 테두리 제거
      }
      visibleIndex++; // 보여지는 요소만 카운트
    } else {
      item.style.borderRight = ""; // 숨겨진 항목의 스타일을 초기화
    }
  });
}

// 필터링 이벤트 리스너
document.querySelector("#category").addEventListener("change", function () {
  const selectedCategory = this.value; // 선택된 카테고리 값
  const items = document.querySelectorAll(".designer-list ul li");

  items.forEach((item) => {
    if (selectedCategory === "all" || item.classList.contains(selectedCategory)) {
      item.style.display = "block"; // 관련 요소 보이기
    } else {
      item.style.display = "none"; // 숨기기
    }
  });

  updateBorders(); // 필터링 이후 border 업데이트
});

// 정렬 이벤트 리스너
document.querySelector('select[style="padding-left: 10px;"]').addEventListener("change", function () {
  const sortOrder = this.value;
  const ul = document.querySelector(".designer-list ul");
  const items = Array.from(ul.children);

  // 오름차순/내림차순 정렬
  items.sort(function (a, b) {
    const nameA = a.querySelector("p span:first-child").innerText.toLowerCase();
    const nameB = b.querySelector("p span:first-child").innerText.toLowerCase();
    return sortOrder === "1" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  items.forEach((item) => ul.appendChild(item)); // 정렬된 요소 새로 그리기

  updateBorders(); // 정렬 이후 border 업데이트
});

// 실시간 검색 이벤트 리스너
document.querySelector(".list-filter-search input").addEventListener("input", function () {
  const searchInput = this.value.toLowerCase();
  const items = document.querySelectorAll(".designer-list ul li");

  items.forEach((item) => {
    const name = item.querySelector("p span:first-child").innerText.toLowerCase();
    const englishName = item.querySelector("p span:last-child").innerText.toLowerCase();
    
    if (name.includes(searchInput) || englishName.includes(searchInput)) {
      item.style.display = "block"; // 검색어와 일치하는 항목 보이기
    } else {
      item.style.display = "none"; // 검색어와 일치하지 않는 항목 숨기기
    }
  });

  updateBorders(); // 검색 필터링 이후 border 업데이트
});

// 페이지 로드 시 초기 호출
document.addEventListener("DOMContentLoaded", updateBorders);
