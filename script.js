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

// * section-3 sticky slider
// DOM 요소
const cards = document.querySelectorAll(".guide-slide__card");

// 스크롤 이벤트 처리
window.addEventListener("scroll", () => {
	// 각 카드에 대해 처리
	cards.forEach((card, index) => {
		// 각 카드의 top 위치 계산
		const cardTop = card.getBoundingClientRect().top;
		const cardHeight = card.getBoundingClientRect().height;

		// 현재 창의 높이
		const windowHeight = window.innerHeight;

		// 각 카드가 스크롤에 따라 겹칠 때 opacity를 조정
		if (cardTop < windowHeight && cardTop > -cardHeight) {
			// 현재 보이는 카드 opacity는 1
			card.style.opacity = 1;

			// 그 전 카드들에 대해 opacity를 점차적으로 줄여서 0으로 만듦
			for (let i = 0; i < index; i++) {
				const currentTop = cards[i].getBoundingClientRect().top;
				const currentBottom = cards[i].getBoundingClientRect().bottom;
				const nextCardTop = cards[i + 1].getBoundingClientRect().top;

				// 이전 카드가 50% 진입하면 opacity가 점차 줄어듦
				if (nextCardTop < currentBottom * 0.9) {
					// opacity를 점차적으로 줄여 0으로 만듦
					const opacity = Math.max(
						0,
						1 - (currentBottom - nextCardTop) / cardHeight
					);
					cards[i].style.opacity = opacity;
				}
			}
		}
	});
});

// * section-6 tables toggle
document.querySelectorAll(".table-toggle-btn").forEach((btn) => {
	const table = btn.nextElementSibling; // 클릭한 버튼 바로 다음의 요소를 선택
	const arrow = btn.querySelector(".arrow"); // 화살표 선택
	const isTable1 = table.classList.contains("table1");

	// table1은 처음에 열린 상태로 설정
	if (isTable1) {
		arrow.classList.add("initial"); // table1의 화살표를 반대로 설정
	}

	btn.addEventListener("click", () => {
		// 테이블의 표시 상태를 토글
		if (table.classList.contains("open")) {
			table.classList.remove("open"); // 'open' 클래스 제거
			arrow.style.transform = "rotate(0deg)"; // 화살표 원래 방향으로
			table.style.marginTop = 0;
		} else {
			table.classList.add("open"); // 'open' 클래스 추가
			arrow.style.transform = "rotate(180deg)"; // 화살표 아래로
			table.style.marginTop = "3rem";
		}
	});
});

// * section-7 carousel
const prevButton = document.getElementById("carousel-prev");
const nextButton = document.getElementById("carousel-next");
const carouselItems = document.querySelectorAll(".infinite-carousel-item");
const carousel = document.querySelector(".infinite-carousel");
const indicator = document.getElementById("carousel-count");

let currentIndex = 0;
const totalItems = carouselItems.length;

// 각 아이템의 크기와 gap을 고려하여 이동
function updateCarousel() {
	const gap = 60; // gap 설정
	let offset = 0;

	// 이동 값 계산: 각 아이템의 크기 + gap을 고려
	for (let i = 0; i < currentIndex; i++) {
		offset += carouselItems[i].offsetWidth + gap;
	}

	// carousel 이동
	carousel.style.transform = `translateX(-${offset}px)`;

	// 각 아이템의 opacity 값 업데이트
	carouselItems.forEach((item, index) => {
		if (index === currentIndex) {
			item.style.opacity = "1";
		} else {
			item.style.opacity = "0.5";
		}
	});

	// indicator 업데이트
	indicator.textContent = `${currentIndex + 1} / ${totalItems}`;
}

// next 버튼 클릭 시
nextButton.addEventListener("click", () => {
	if (currentIndex < totalItems - 1) {
		currentIndex++;
	} else {
		currentIndex = 0; // 마지막 아이템에서 처음으로 돌아감
	}
	updateCarousel();
});

// prev 버튼 클릭 시
prevButton.addEventListener("click", () => {
	if (currentIndex > 0) {
		currentIndex--;
	} else {
		currentIndex = totalItems - 1; // 첫 번째 아이템에서 마지막 아이템으로 돌아감
	}
	updateCarousel();
});

// 초기 상태 업데이트
updateCarousel();

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
