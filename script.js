// section-2 image slider container
const categoryButtons = document.querySelectorAll(".category__category-btn");
const imageSlider = document.querySelector(".image-slider");
const imageSlides = document.querySelectorAll(".image-slide");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = button.dataset.target;

    // 모든 버튼 비활성화
    categoryButtons.forEach((btn) => btn.classList.remove("selected"));
    // 클릭한 버튼 활성화
    button.classList.add("selected");

    // 이미지 슬라이더 이동
    const slideWidth = imageSlides[0].clientWidth; // 이미지의 실제 너비
    const offset = -index * slideWidth; // 이동할 거리 계산
    imageSlider.style.transform = `translateX(${offset}px)`;
  });
});
