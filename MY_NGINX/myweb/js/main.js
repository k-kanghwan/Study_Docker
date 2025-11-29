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
function setButtonActive(button) {
  if (!button) return;
  button.classList.add("slide-button--active");
  button.classList.remove("slide-button--inactive");
}

function setButtonInactive(button) {
  if (!button) return;
  button.classList.add("slide-button--inactive");
  button.classList.remove("slide-button--active");
}

const SCROLL_STEP = 260;

function updateArrowState(list, prevButton, nextButton) {
  if (!list || !prevButton || !nextButton) return;

  const maxScrollLeft = Math.max(list.scrollWidth - list.clientWidth, 0);

  if (maxScrollLeft <= 0) {
    setButtonInactive(prevButton);
    setButtonInactive(nextButton);
    prevButton.classList.remove("slide-prev-hover");
    nextButton.classList.remove("slide-next-hover");
    return;
  }

  if (list.scrollLeft <= 0) {
    setButtonInactive(prevButton);
    prevButton.classList.remove("slide-prev-hover");
  } else {
    setButtonActive(prevButton);
    prevButton.classList.add("slide-prev-hover");
  }

  if (list.scrollLeft >= maxScrollLeft - 1) {
    setButtonInactive(nextButton);
    nextButton.classList.remove("slide-next-hover");
  } else {
    setButtonActive(nextButton);
    nextButton.classList.add("slide-next-hover");
  }
}

function scrollList(list, delta) {
  if (!list) return;
  list.scrollBy({ left: delta, behavior: "smooth" });
}

function transformNext(e) {
  const slideNext = e.currentTarget;
  const classList = slideNext.parentElement.parentElement.nextElementSibling;

  scrollList(classList, SCROLL_STEP);
}

function transformPrev(e) {
  const slidePrev = e.currentTarget;
  const classList = slidePrev.parentElement.parentElement.nextElementSibling;

  scrollList(classList, SCROLL_STEP * -1);
}

function initializeSliders() {
  const sliderSections = document.querySelectorAll(".roadmap-container");

  sliderSections.forEach((section) => {
    const slidePrev = section.querySelector(".slide-prev");
    const slideNext = section.querySelector(".slide-next");
    const classList = section.querySelector(".class-list");

    if (!slidePrev || !slideNext || !classList) {
      return;
    }

    const arrowContainer = slidePrev.parentElement;

    if (classList.scrollWidth <= classList.clientWidth) {
      arrowContainer.remove();
      return;
    }

    setButtonInactive(slidePrev);
    slidePrev.classList.add("slide-prev-hover");
    slidePrev.addEventListener("click", transformPrev);

    slideNext.classList.add("slide-next-hover");
    slideNext.addEventListener("click", transformNext);

    updateArrowState(classList, slidePrev, slideNext);

    classList.addEventListener("scroll", () => {
      updateArrowState(classList, slidePrev, slideNext);
    });
  });
}

initializeSliders();
