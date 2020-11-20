window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  const carouselPhotos = document.getElementsByClassName("carousel__photo");
  const totalCarouselPhotos = carouselPhotos.length;
  const slide = 0;
  const isMoving = true;

  function setInitialClasses() {
    // Targets the previous, current, and forward items
    // This assumes there are at least three items.
    carouselPhotos[totalCarouselPhotos - 1].classList.add("back");
    carouselPhotos[0].classList.add("active");
    carouselPhotos[1].classList.add("forward");
  }

  // Event listeners
  function setEventListeners() {
    const forward = document.getElementsByClassName(
      "carousel__button--forward"
    )[0];
    const back = document.getElementsByClassName("carousel__button--back")[0];
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
      moveCarouselTo(slide);
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
      moveCarouselTo(slide);
    }
  }

  // Disable navigation (for when the carousel is moving)
  function disableNavigation() {
    // Set 'moving' to true for the duration of the slide transition (500ms)
    moving = true;
    setTimeout(function () {
      moving = false;
    }, 500);
  }

  function moveCarouselTo(slide) {

    // Default settings for middle slides
    let oldBack = totalCarouselPhotos[slide - 1]
    let oldForward = totalCarouselPhotos[slide + 1]
    let newBack = totalCarouselPhotos[]
    let newForward;

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


  }
});
