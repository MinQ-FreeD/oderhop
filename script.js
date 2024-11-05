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

// section-6 tables toggle
document.querySelectorAll(".table-toggle-btn").forEach((btn) => {
	btn.addEventListener("click", () => {
		const table = btn.nextElementSibling; // 클릭한 버튼 바로 다음의 요소를 선택
		const arrow = btn.querySelector(".arrow"); // 화살표 선택
		const isTable1 = table.classList.contains("table1");

		// 테이블의 표시 상태를 토글
		if (table.style.maxHeight) {
			table.style.maxHeight = null; // 최대 높이를 초기화
			table.style.opacity = 0; // opacity를 0으로 설정
			arrow.style.transform = "rotate(0deg)"; // 화살표 원래 방향으로
			table.style.marginTop = 0;

			if (isTable1) {
				table.parentElement.style.paddingBottom = "0";
			}
		} else {
			table.style.maxHeight = table.scrollHeight + "px"; // 콘텐츠의 높이로 설정
			table.style.opacity = 1; // opacity를 1로 설정
			arrow.style.transform = "rotate(180deg)"; // 화살표 아래로
			table.style.marginTop = "3rem";

			if (isTable1) {
				table.parentElement.style.paddingBottom = "3rem";
			}
		}
	});
});
