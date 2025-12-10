(function () {
  const carousel = document.querySelector(".carousel");
  const slidesEl = carousel.querySelector(".slides");
  const slides = Array.from(carousel.querySelectorAll(".slide"));
  const indicators = Array.from(carousel.querySelectorAll(".indicator"));
  let index = 0;
  const total = slides.length;
  let intervalId = null;
  const autoplay = carousel.dataset.autoplay === "true";
  const interval = parseInt(carousel.dataset.interval, 10) || 5000;

  function goTo(i) {
    index = (i + total) % total;
    slidesEl.style.transform = `translateX(-${index * 100}%)`;
    indicators.forEach((ind, idx) => {
      const selected = idx === index;
      ind.setAttribute("aria-selected", selected ? "true" : "false");
      ind.setAttribute("aria-current", selected ? "true" : "false");
    });
  }

  indicators.forEach((ind) => {
    ind.addEventListener("click", () => {
      goTo(Number(ind.dataset.index));
      resetAutoplay();
    });
  });

  function startAutoplay() {
    if (!autoplay) return;
    stopAutoplay();
    intervalId = setInterval(() => goTo(index + 1), interval);
  }
  function stopAutoplay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // pause on hover/focus for accessibility
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("focusin", stopAutoplay);
  carousel.addEventListener("focusout", startAutoplay);

  // keyboard navigation
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      goTo(index - 1);
      resetAutoplay();
    }
    if (e.key === "ArrowRight") {
      goTo(index + 1);
      resetAutoplay();
    }
  });

  // init
  goTo(0);
  startAutoplay();
})();
