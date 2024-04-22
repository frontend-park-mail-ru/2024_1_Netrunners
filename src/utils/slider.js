export const addSliderHandler = () => {
  const arrowBtns = document.querySelectorAll(
    ".films-section__films-container button",
  );

  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filmsContainer = btn.closest(".films-section__films-container");
      const carousel = filmsContainer.querySelector(".films-section__carousel");

      const firstCardWidth = carousel.querySelector(
        ".films-section__film-card",
      ).offsetWidth;
      const moveDirection = btn.id === "left" ? -1 : 1;

      carousel.scrollLeft += firstCardWidth * 4 * moveDirection;
    });
  });
};
