const carouselPhotos = document.getElementsByClassName("carousel__photo");
const totalCarouselPhotos = carouselPhotos.length;
let slide = 0;
let isMoving = true;

function setInitialClasses() {
  // Targets the previous, current, and forward items
  // This assumes there are at least three items.
  carouselPhotos[totalCarouselPhotos - 1].classList.add("back");
  carouselPhotos[0].classList.add("active");
  carouselPhotos[1].classList.add("forward");
}

// Event listeners
function setEventListeners() {
  const forward = document.getElementById("carousel__button--forward");
  const back = document.getElementById("carousel__button--back");
  forward.addEventListener("click", moveForward);
  back.addEventListener("click", moveBackward);
}

// Forward navigation handler
function moveForward() {
  // Check if moving
  if (!isMoving) {
    // If it's the last slide, reset to 0, else +1
    if (slide === totalCarouselPhotos - 1) {
      slide = 0;
    } else {
      slide++;
    }
    // Move carousel to updated slide
    moveCarouselTo(slide, "forward");
  }
}

// Backward navigation handler
function moveBackward() {
  if (!isMoving) {
    if (slide === totalCarouselPhotos[0]) {
      slide = totalCarouselPhotos - 1;
    } else {
      slide--;
    }
    moveCarouselTo(slide, "backward");
  }
}

// Disable navigation (for when the carousel is moving)
function disableNavigation() {
  // Set 'moving' to true for the duration of the slide transition (500ms)
  isMoving = true;
  setTimeout(function () {
    isMoving = false;
  }, 500);
}

function moveCarouselTo(slide, direction) {
  // Default settings for middle slides
  let oldBack;
  let oldForward;
  let newBack = slide - 1;
  let newForward = slide + 1;

  if (direction === "backward") {
    oldBack = slide;
    oldForward = slide + 2;
  }

  if (direction === "forward") {
    oldBack = slide - 2;
    oldForward = slide;
  }

  // Check if slide is the first or the last or in between and update surrounding slides
  if (slide === 0) {
    newBack = totalCarouselPhotos - 1;
    newForward = totalCarouselPhotos[1];
  } else if (slide === totalCarouselPhotos - 1) {
    newBack = totalCarouselPhotos - 2;
    newForward = totalCarouselPhotos[0];
  } else {
    newBack = slide - 1;
    newForward = slide + 1;
  }

  // re-assign classes accordingly
  carouselPhotos[newBack].classList.add("back");
  carouselPhotos[slide].classList.add("active");
  carouselPhotos[newForward].classList.add("forward");
  carouselPhotos[oldBack].classList.remove("back");
  carouselPhotos[oldForward].classList.remove("forward");
}

function initCarousel() {
  setInitialClasses();
  setEventListeners();
  isMoving = false;
}

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  initCarousel();
});
