import * as filmsApi from "../../api/films.js";
import template from "./Films.hbs";
import { renderSlider } from "../Slider/renderSlider.js";
import Router from "../../utils/router.js";

/**
 * Рендерит страницу фильмов, получает данные о фильмах с сервера,
 * преобразует данные и отображает список фильмов на странице.
 * @async
 * @function
 * @return {void}
 */
export async function renderFilms() {
  try {
    const [filmData, topFourFilms, filmsGenres] = await Promise.all([
      filmsApi.getAll(),
      filmsApi.getTopFour(),
      filmsApi.getGenres(),
    ]);

    topFourFilms[0].active = "data-active";

    document.querySelector("main").innerHTML = template({
      filmData,
      topFourFilms,
      filmsGenres,
    });
    renderSlider();

    const filmCards = document.querySelectorAll("[data-film-id]");
    filmCards.forEach((filmCard) => {
      filmCard.addEventListener("click", () => {
        Router.goToFilmPage(
          filmCard.dataset.filmId,
          filmCard.dataset.filmTitle,
        );
      });
    });
  } catch (error) {
    console.error("Error rendering films:", error);
  }
}
