import template from "./genre.hbs";
import Router from "../../utils/router.js";
import { getFilmsOfGenre } from "../../api/films.js";

/**
 * Отображает страницу фильмов определенного жанра.
 * @param {string} genreNameRu Название жанра.
 */
export async function renderGenrePage(genreNameRu) {
  const filmsData = await getFilmsOfGenre(genreNameRu);

  const genrePageData = { filmsData, genreNameRu };
  document.querySelector("main").innerHTML = template(genrePageData);

  const filmCards = document.querySelectorAll("[data-film-id]");

  filmCards.forEach((filmCard) => {
    filmCard.addEventListener("click", () => {
      Router.goToFilmPage(filmCard.dataset.filmId, filmCard.dataset.filmTitle);
    });
  });
}
