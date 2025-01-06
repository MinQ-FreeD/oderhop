import "./style.css";

// * 배포전 수정해야할 사항
// * 배포전 main.js > index.html에 style.css 주석처리
// * 배포전 main.js > style.css 추가
// * 이미지 주소 변경 > ./public/images > ./images
// * style.css에 있는 background Image 주소 또한 ./public/images > ../images (dist 구조 때문에)
// * style.css에 있는 폰트 주소 변경 필요 > ./public/fonts > ../fonts
// * 모두 세팅이 마치면 yarn deploy 실행 > 배포

// * [상담하기, 사용문의하기], [데모 체험하기] 버튼 클릭 시 스크롤 이동
const header = document.querySelector("header");
// 헤더 높이 가져오기
function getHeaderHeight() {
  return header.offsetHeight;
}

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

// 버튼들에 스크롤 기능 추가 (처음 로드 시)
smoothScrollWithOffset(
  ".nav-btn-consult, .banner-btn-consult, .test",
  "#contact",
  getHeaderHeight()
);
smoothScrollWithOffset(".nav-btn-demo", ".section-4", getHeaderHeight());

// 화면 크기 변경 시 헤더 높이 업데이트
window.addEventListener("resize", () => {
  smoothScrollWithOffset(
    ".nav-btn-consult, .banner-btn-consult",
    "#contact",
    getHeaderHeight()
  );
  smoothScrollWithOffset(".nav-btn-demo", ".section-4", getHeaderHeight());
});

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

// * section-4 QR code-imagemap

// * section-5 slide-up
document.addEventListener("DOMContentLoaded", function () {
  // 모든 .slide-up 요소 선택
  const elements = document.querySelectorAll(".slide-up");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        // console.log(entry); // entry 객체 로그
        if (entry.isIntersecting) {
          // 요소가 뷰포트에 들어왔을 때, is-visible 클래스를 추가하여 애니메이션 실행
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // 최초 한번만 실행되도록 관찰 해제
        }
      });
    },
    { threshold: 0.3 } // 요소의 50%가 화면에 들어올 때 트리거
  );

  // 각 .slide-up 요소를 관찰
  elements.forEach((element) => observer.observe(element));
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
  // gap 값 동적으로 가져오기
  const computedStyle = window.getComputedStyle(carousel);
  const gap = parseInt(computedStyle.gap, 10); // flex gap 값 가져오기
  let offset = 0;

  // 화면 크기가 모바일일 때만 처리
  if (window.innerWidth <= 768) {
    // 첫 번째 요소만 중앙에 배치하기 위해 offset 초기화 (50% - 100px)
    if (currentIndex === 0) {
      offset = window.innerWidth / 2 - 100; // 화면 50%에서 -100px 위치로 설정
    }

    // 모바일 화면일 때
    for (let i = 0; i < currentIndex; i++) {
      offset += carouselItems[i].offsetWidth + gap; // 각 아이템 크기와 gap 적용
    }

    // 중앙 정렬을 위한 offset 보정
    const carouselWidth = carousel.offsetWidth;
    const centerOffset =
      (carouselWidth - carouselItems[currentIndex].offsetWidth) / 2;

    if (currentIndex !== 0) {
      offset = offset - centerOffset;
    }
  } else {
    // 모바일이 아닌 화면에서 gap과 offset 계산
    for (let i = 0; i < currentIndex; i++) {
      offset += carouselItems[i].offsetWidth + gap; // 각 아이템 크기와 gap 적용
    }
  }

  if (currentIndex === 0) {
    carousel.style.transform = `translateX(${offset}px)`;
  } else {
    // carousel 이동
    carousel.style.transform = `translateX(-${offset}px)`;
  }

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

// * section-8 mobile swiper
const slides = document.querySelectorAll(".swiper-slide");
const indicators = document.querySelectorAll(".swiper-indicator");
let swiperCurrentIndex = 0;
const totalSlides = slides.length;

// 슬라이드 복제 (첫 번째와 마지막 요소를 복제해서 양 끝에 추가)
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

document.querySelector(".swiper").appendChild(firstClone);
document.querySelector(".swiper").insertBefore(lastClone, slides[0]);

// 업데이트된 총 슬라이드 수
const updatedSlides = document.querySelectorAll(".swiper-slide");
let isAnimating = false; // 애니메이션 중인지 확인
let autoSlideInterval;
let isMouseDown = false; // 마우스가 눌린 상태인지 확인

// 슬라이드 위치 업데이트 함수
function updateSwiper() {
  const offset = -(swiperCurrentIndex + 1) * 100;
  document.querySelector(".swiper").style.transition = isAnimating
    ? "transform 0.3s ease"
    : "none";
  document.querySelector(".swiper").style.transform = `translateX(${offset}%)`;

  // Indicator 업데이트 (루프를 고려하여 인덱스 계산)
  indicators.forEach((indicator, index) => {
    const actualIndex = swiperCurrentIndex % totalSlides;
    indicator.classList.toggle("active", index === actualIndex);
  });
}

// 인덱스를 조정하여 무한 루프 효과 적용
function adjustIndexForLoop() {
  document.querySelector(".swiper").addEventListener("transitionend", () => {
    if (swiperCurrentIndex >= totalSlides) {
      document.querySelector(".swiper").style.transition = "none";
      swiperCurrentIndex = 0;
      updateSwiper();
    } else if (swiperCurrentIndex < 0) {
      document.querySelector(".swiper").style.transition = "none";
      swiperCurrentIndex = totalSlides - 1;
      updateSwiper();
    }
  });
}

// 다음 슬라이드로 이동
function nextSlide() {
  if (isAnimating) return; // 애니메이션 중일 때는 실행 방지
  isAnimating = true;
  swiperCurrentIndex++;
  updateSwiper();
  adjustIndexForLoop();
  setTimeout(() => (isAnimating = false), 300);
}

// 인디케이터 클릭 시 이동
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    swiperCurrentIndex = index;
    updateSwiper();
  });
});

// 초기 상태 설정
swiperCurrentIndex = 0; // 첫 번째 슬라이드로 설정
updateSwiper();

// 자동 슬라이드 이동 (2.5초마다)
function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 2500);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// 슬라이드 자동 이동 시작
startAutoSlide();

// 슬라이드 자동 이동 멈추기 및 재시작
document.querySelector(".swiper").addEventListener("mousedown", () => {
  isMouseDown = true;
  stopAutoSlide(); // 마우스를 누르면 자동 슬라이드 멈춤
});

document.querySelector(".swiper").addEventListener("mouseup", () => {
  isMouseDown = false;
  if (!autoSlideInterval) startAutoSlide(); // 손을 떼면 자동 슬라이드 다시 시작
});

document.querySelector(".swiper").addEventListener("touchstart", () => {
  isMouseDown = true;
  stopAutoSlide(); // 터치를 시작하면 자동 슬라이드 멈춤
});

document.querySelector(".swiper").addEventListener("touchend", () => {
  isMouseDown = false;
  if (!autoSlideInterval) startAutoSlide(); // 손을 떼면 자동 슬라이드 다시 시작
});

// 슬라이드 누르고 있을 때 멈추고 손 떼면 자동으로 다시 슬라이드가 이동

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

// * 써베이 폼
const webAppUrl =
  "https://script.google.com/macros/s/AKfycbwrv7712Id0Rg1cEFxcaMCpdfBldeYWkvyUNDcaugfrtvXJDwRfXZQncg4OXFj40z7g/exec";

document.getElementById("surveyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    region: document.getElementById("region").value,
    industry: document.getElementById("industry").value,
    phone: document.getElementById("phone").value,
  };

  try {
    const response = await fetch(webAppUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.text();
    console.log(result);
    alert("제출이 완료되었습니다.");

    document.getElementById("surveyForm").reset();
  } catch (error) {
    console.error("Error:", error);
    alert("제출에 실패했습니다.");
  }
});

// viewport 추가
function setViewport() {
  const viewportWidth = window.screen.width < 768 ? 360 : 1920;
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  viewportMeta.setAttribute("content", `width=${viewportWidth}`);
}

window.addEventListener("resize", setViewport);
setViewport();
