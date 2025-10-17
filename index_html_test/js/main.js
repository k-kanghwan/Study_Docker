const backToTop = document.getElementById("backtotop");

const checkScroll = () => {
  let scrollY = window.scrollY;

  if (scrollY !== 0) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
};

const moveBackToTop = () => {
  if (window.scrollY > 0) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

window.addEventListener("scroll", checkScroll);

backToTop.addEventListener("click", moveBackToTop);

/* ---------------------------------------------------- */
function transformNext(e) {
  const slideNext = e.target; // 클릭한 슬라이드 다음 버튼
  const slidePrev = slideNext.previousElementSibling; // 슬라이드 이전 버튼

  const classList = slideNext.parentElement.parentElement.nextElementSibling; // ul 태그 선택
  let activeLi = classList.getAttribute("data-position");
  const liList = classList.getElementsByTagName("li");

  if (Number(activeLi) < 0) {
    activeLi = Number(activeLi) + 260;

    slidePrev.style.color = "#0433bf";
    slidePrev.classList.add("slide-prev-hover");
    slidePrev.addEventListener("click", transformPrev);

    if (Number(activeLi) === 0) {
      slideNext.style.color = "#ccc";
      slideNext.classList.remove("slide-next-hover");
      slideNext.removeEventListener("click", transformNext);
    }
  }

  classList.style.transition = "transform 0.5s";
  classList.style.transform = "translateX(" + activeLi + "px)";
  classList.setAttribute("data-position", activeLi);
}

function transformPrev(e) {
  const slidePrev = e.target; // 클릭한 슬라이드 이전 버튼
  const slideNext = slidePrev.nextElementSibling; // 슬라이드 다음 버튼

  // ul 태그 선택
  const classList = slidePrev.parentElement.parentElement.nextElementSibling;
  let activeLi = classList.getAttribute("data-position");
  const liList = classList.getElementsByTagName("li");

  if (classList.clientWidth < liList.length * 260 + Number(activeLi)) {
    activeLi = Number(activeLi) - 260;

    if (classList.clientWidth > liList.length * 260 + Number(activeLi)) {
      slidePrev.style.color = "#ccc";
      slidePrev.classList.remove("slide-prev-hover");
      slidePrev.removeEventListener("click", transformPrev);
    }

    slideNext.style.color = "#0433bf";
    slideNext.classList.add("slide-next-hover");
    slideNext.addEventListener("click", transformNext);
  }

  classList.style.transition = "transform 0.5s";
  classList.style.transform = "translateX(" + activeLi + "px)";
  classList.setAttribute("data-position", activeLi);
}

const slidePrevList = document.getElementsByClassName("slide-prev");

for (let i = 0; i < slidePrevList.length; i++) {
  // ul 태그 선택
  let classList =
    // error Uncaught TypeError: Cannot read properties of undefined (reading 'parentElement')
    slidePrevList[i].parentElement.parentElement.nextElementSibling;
  let liList = classList.getElementsByTagName("li");

  if (classList.clientWidth < liList.length * 260) {
    // 슬라이드 이전 버튼 활성화
    slidePrevList[i].classList.add("slide-prev-hover");
    slidePrevList[i].addEventListener("click", transformPrev);
  } else {
    const arrowContainer = slidePrevList[i].parentElement;
    arrowContainer.removeChild(slidePrevList[i].nextElementSibling);
    arrowContainer.removeChild(slidePrevList[i]);
  }
}

/*----------------------------------------------------- */

let touchstartX;
let currentClassList;
let currentImg;
let currentActiveLi;
let nowActiveLi;
let mouseStart;

function processTouchMove(event) {
  event.preventDefault(); // 해당 요소의 고유의 동작을 중단

  let currentX = event.clientX;
  // console.log("touchstartX: " + touchstartX);
  // console.log("currentX: " + currentX);
  nowActiveLi =
    Number(currentActiveLi) + Number(currentX) - Number(touchstartX);

  currentClassList.style.transition = "transform 0.5s linear";
  currentClassList.style.transform =
    "translateX(" + String(nowActiveLi) + "px)";
}

function processTouchStart(event) {
  mouseStart = true;

  event.preventDefault(); // 해당 요소의 고유의 동작을 중단
  touchstartX = event.clientX || event.touches[0].screenX;
  currentImg = event.target;

  currentImg.addEventListener("mousemove", processTouchMove);
  currentImg.addEventListener("mouseup", processTouchEnd);

  currentImg.addEventListener("touchmove", processTouchMove);
  currentImg.addEventListener("touchend", processTouchEnd);

  currentClassList = currentImg.parentElement.parentElement;
  currentActiveLi = currentClassList.getAttribute("data-position");
}

function processTouchEnd(event) {
  event.preventDefault(); // 해당 요소의 고유의 동작을 중단

  if (mouseStart === true) {
    currentImg.removeEventListener("mousemove", processTouchMove);
    currentImg.removeEventListener("mouseup", processTouchEnd);

    currentImg.removeEventListener("touchmove", processTouchMove);
    currentImg.removeEventListener("touchend", processTouchEnd);

    // 맨 처음 카드가 맨 앞에 배치되도록 초기 상태로 이동
    currentClassList.style.transition = "transform 0.5s ease";
    currentClassList.style.transform = "translateX(0px)";
    currentClassList.setAttribute("data-position", 0);

    let eachSlidePrev =
      currentClassList.previousElementSibling.children[1].children[0];
    let eachSlideNext =
      currentClassList.previousElementSibling.children[1].children[1];
    let eachLiList = currentClassList.getElementsByTagName("li");
    if (currentClassList.clientWidth < eachLiList.length * 260) {
      // 슬라이드 이전 버튼 활성화
      eachSlidePrev.classList.add("slide-prev-hover");
      eachSlidePrev.style.color = "#0433bf";
      eachSlidePrev.addEventListener("click", transformPrev);

      // 슬라이드 다음 버튼 활성화
      eachSlideNext.classList.add("slide-next-hover");
      eachSlideNext.style.color = "#0433bf";
      eachSlideNext.addEventListener("click", transformNext);
    }
  }
  mouseStart = false;
}

window.addEventListener("dragend", processTouchEnd);
window.addEventListener("mouseup", processTouchEnd);

const classImgLists = document.querySelectorAll("ul li img");
for (let i = 0; i < classImgLists.length; i++) {
  classImgLists[i].addEventListener("mousedown", processTouchStart);
  classImgLists[i].addEventListener("touchstart", processTouchStart);
}
