const carousel = document.getElementById("carousel");
const leftHandle = document.getElementById("leftHandle");
const rightHandle = document.getElementById("rightHandle");

function Carousel(carousel, images, leftHandle, rightHandle, selected = 0) {
  // Place images in the carousel
  const placeImages = () => {
    const imageFrame = document.createElement("div");
    imageFrame.classList.add("img-frame");
    const imageHolder = document.createElement("div");
    imageHolder.classList.add("img-holder");
    images.forEach((image) => {
      const img = document.createElement("img");
      img.src = `./${image}`;
      imageHolder.appendChild(img);
    });
    imageFrame.appendChild(imageHolder);
    carousel.appendChild(imageFrame);
  };

  // Create progress dots
  const createProgress = () => {
    const dotHolder = document.createElement("div");
    dotHolder.classList.add("dot-holder");
    images.forEach((_, idx) => {
      const span = document.createElement("span");
      span.dataset.index = idx;
      span.classList.add("dot");
      dotHolder.appendChild(span);
    });
    carousel.appendChild(dotHolder);
    return dotHolder;
  };

  // Add event listeners to handle left/right swipes and dot selection
  const addListeners = () => {
    leftHandle.addEventListener("click", swipeLeft);
    rightHandle.addEventListener("click", swipeRight);
    dotHolder.addEventListener("click", dotSelect);
  };

  // Handle left swipe
  const swipeLeft = () => {
    selected -= 1;
    if (selected < 0) selected += images.length;
    setSelection();
  };

  // Handle right swipe
  const swipeRight = () => {
    selected += 1;
    selected %= images.length;
    setSelection();
  };

  // Handle dot selection
  const dotSelect = (event) => {
    if (!event.target.classList.contains("dot")) return;
    selected = +event.target.dataset.index;
    console.log(selected);
    setSelection();
  };

  // Set the selected image and update carousel and dots
  const setSelection = () => {
    const imageHolder = carousel.querySelector(".img-holder");
    const dot = dotHolder.querySelector(`[data-index='${selected}']`);
    imageHolder.style.transform = `translateX(${560 * -selected}px)`;
    dotHolder.querySelector(".selected")?.classList.remove("selected");
    dot.classList.add("selected");
  };

  // Create progress dots
  const dotHolder = createProgress();

  // Place images in the carousel
  placeImages();

  // Add event listeners
  addListeners();

  // Set initial selected image
  setSelection();
}

// Create a new instance of the Carousel
Carousel(
  carousel,
  [
    "./assets/1.jpeg",
    "./assets/2.jpeg",
    "./assets/3.jpeg",
    "./assets/4.jpeg",
    "./assets/5.jpeg",
    "./assets/6.jpeg",
    "./assets/7.jpeg",
    "./assets/8.jpeg",
  ],
  leftHandle,
  rightHandle
);
