import * as filmsApi from '../../api/films.js';

/**
 * Рендерит страницу фильмов, получает данные о фильмах с сервера,
 * преобразует данные и отображает список фильмов на странице.
 * @async
 * @function
 * @return {void}
 */
export async function renderFilms() {
  let [filmData, topFourFilms, filmsGenres] = await Promise.all([
    filmsApi.getAll(),
    filmsApi.getTopFour(),
    filmsApi.getGenres()
  ]);
  topFourFilms[0].active = "data-active";

  Handlebars.registerHelper('stars', function(averageScore) {
    averageScore = 3.5;
    const maxStars = 5;
    const roundedScore = Math.round(averageScore);
    const remainder = averageScore - roundedScore;

    let starsHTML = '';
    for (let i = 0; i < maxStars; i++) {
      if (i < roundedScore) {
        starsHTML += '<img class="star" src="../../img/icons/star-full.svg" alt="">';
      } else if (i === roundedScore && remainder > 0) {
        starsHTML += '<img class="star" src="../../img/icons/star-half.svg" alt="">';
      } else {
        starsHTML += '<img class="star" src="../../img/icons/star-none.svg" alt="">';
      }
    }
    return new Handlebars.SafeString(starsHTML);
  });

  const template = Handlebars.templates['Films.hbs'];
  document.querySelector('main').innerHTML = template({ filmData, topFourFilms, filmsGenres });

  const buttons  = document.querySelectorAll("[data-carousel-button]");
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : -1;
      const slides = button
          .closest("[data-carousel]")
          .querySelector("[data-slides]")

      const activeSlide = slides.querySelector("[data-active]");
      let newIndex = [...slides.children].indexOf(activeSlide) + offset;
      if (newIndex < 0) newIndex = slides.children.length - 1;
      if (newIndex >= slides.children.length) newIndex = 0;

      slides.children[newIndex].dataset.active = true;
      delete activeSlide.dataset.active;
    })

  })
}