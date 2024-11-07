// * [상담하기, 사용문의하기], [데모 체험하기] 버튼 클릭 시 스크롤 이동
// 헤더 높이 가져오기
// 헤더 높이 가져오기
const header = document.querySelector("header");
const headerHeight = header.offsetHeight;

// 공통된 스크롤 함수 정의
function smoothScrollWithOffset(buttonSelector, targetSelector, offset) {
	document.querySelectorAll(buttonSelector).forEach((button) => {
		button.addEventListener("click", function (e) {
			e.preventDefault(); // 기본 앵커 동작 막기

			// 버튼의 href 속성으로 이동할 요소 결정 (직접 지정된 경우 `targetSelector` 사용)
			const targetId = targetSelector || this.getAttribute("href");
			const targetElement = document.querySelector(targetId);

			if (targetElement) {
				const offsetTop =
					targetElement.getBoundingClientRect().top + window.scrollY - offset;

				window.scrollTo({
					top: offsetTop,
					behavior: "smooth", // 부드러운 스크롤
				});
			}
		});
	});
}

// 버튼들에 스크롤 기능 추가
smoothScrollWithOffset(
	".nav-btn-consult, .banner-btn-consult",
	"#contact",
	headerHeight
);
smoothScrollWithOffset(".nav-btn-demo", ".section-4", headerHeight);

// * section-2 image slider container
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

// * section-6 tables toggle
document.querySelectorAll(".table-toggle-btn").forEach((btn) => {
	btn.addEventListener("click", () => {
		const table = btn.nextElementSibling; // 클릭한 버튼 바로 다음의 요소를 선택
		const arrow = btn.querySelector(".arrow"); // 화살표 선택
		const isTable1 = table.classList.contains("table1");
		// const isTable2 = table.classList.contains("table2");

		// 테이블의 표시 상태를 토글
		if (table.style.maxHeight) {
			table.style.maxHeight = null; // 최대 높이를 초기화
			table.style.opacity = 0; // opacity를 0으로 설정
			arrow.style.transform = "rotate(0deg)"; // 화살표 원래 방향으로
			table.style.marginTop = 0;

			if (isTable1) {
				table.parentElement.style.paddingBottom = "0";
			}
			// if (isTable2) {
			// 	table.parentElement.style.paddingBottom = "0";
			// }
		} else {
			table.style.maxHeight = table.scrollHeight + "px"; // 콘텐츠의 높이로 설정
			table.style.opacity = 1; // opacity를 1로 설정
			arrow.style.transform = "rotate(180deg)"; // 화살표 아래로
			table.style.marginTop = "3rem";

			if (isTable1) {
				table.parentElement.style.paddingBottom = "3rem";
			}
			// if (isTable2) {
			// 	table.parentElement.style.paddingBottom = "5.375rem";
			// }
		}
	});
});

// * section-7 carousel
const carousel = document.querySelector(".infinite-carousel");
const carouselItems = document.querySelectorAll(".infinite-carousel-item");
const prevButton = document.getElementById("carousel-prev");
const nextButton = document.getElementById("carousel-next");
const gap = 60; /* item 마다의 간격 */

const TOTAL_ITEMS = 6;
const currentIndexElement = document.getElementById("carousel-count"); // currentIndex 값을 표시할 HTML 요소

let currentIndex = 1; // 1번 요소부터 시작

const itemWidths = Array.from(carouselItems).map((item) => item.offsetWidth);

const getItemWidths = () => {
	return Array.from(carouselItems).map((item) => item.offsetWidth);
};

// 이동하는 위치 계산 함수
const updatePosition = () => {
	const itemWidths = getItemWidths(); // 실시간 너비 계산
	let totalWidth = 0;
	for (let i = 0; i < currentIndex; i++) {
		totalWidth += itemWidths[i] + gap; /* gap 여백 추가 */
	}

	carouselItems.forEach((item, index) => {
		if (index === currentIndex) {
			item.style.opacity = "1"; // currentIndex 아이템은 opacity 1
		} else {
			item.style.opacity = "0.5"; // 나머지 아이템은 opacity 0.5
		}
	});

	carousel.style.transform = `translateX(-${totalWidth}px)`;
};

// currentIndex를 화면에 업데이트하는 함수
const updateCurrentIndexDisplay = () => {
	// Transition을 잠시 비활성화
	currentIndexElement.style.transition = "none";
	currentIndexElement.textContent = `${currentIndex} / ${TOTAL_ITEMS}`;
};

updatePosition();

// transition이 끝난 후 이벤트
carousel.addEventListener("transitionend", () => {
	// 마지막 슬라이드에서 첫 번째 슬라이드로 부드럽게 이동
	if (currentIndex === carouselItems.length - 1) {
		carousel.style.transition = "none";
		currentIndex = 1;
		updatePosition();

		setTimeout(() => {
			carousel.style.transition = "all 0.7s ease";
		});
	}
	// 첫 번째 슬라이드에서 마지막 슬라이드로 부드럽게 이동
	else if (currentIndex === 0) {
		carousel.style.transition = "none";
		currentIndex = carouselItems.length - 2;
		updatePosition();

		setTimeout(() => {
			carousel.style.transition = "all 0.7s ease";
		});
	}

	updateCurrentIndexDisplay();
});

// next 버튼 클릭 이벤트
nextButton.addEventListener("click", () => {
	if (currentIndex < carouselItems.length - 1) {
		updateCurrentIndexDisplay();
		currentIndex++;
		updatePosition();
	}
});

// prev 버튼 클릭 이벤트
prevButton.addEventListener("click", () => {
	if (currentIndex > 0) {
		updateCurrentIndexDisplay();
		currentIndex--;
		updatePosition();
	}
});

// * section-10
const brandCarousel = document.querySelector(".brand-carousel");

// 복제
const clone = brandCarousel.cloneNode(true);

// 복제본 추가
document.querySelector(".brand-carousel-container").appendChild(clone);

// 원본, 복제본 위치 지정
document.querySelector(".brand-carousel-container").offsetWidth + "px";

// 클래스 할당
brandCarousel.classList.add("original");
clone.classList.add("clone");
