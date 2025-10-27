// JavaScript (간단한 스크롤 이벤트 핸들러)
window.addEventListener('scroll', () => {
  const contents = document.querySelectorAll('.content.hidden');
  const windowBottom = window.innerHeight + window.scrollY;

  contents.forEach(el => {
    const elTop = el.offsetTop;
    if (windowBottom > elTop + 100) { // 100px 줘서 약간 여유있게 설정
      el.classList.add('visible');
      el.classList.remove('hidden');
    }
  });
});
