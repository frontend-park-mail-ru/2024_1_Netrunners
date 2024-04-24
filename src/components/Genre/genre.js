import { FilmsAllRequest } from "../../../use-cases/filmsAll.js";
import template from "./genre.hbs";
import store from "../../index.js";
import { FILMS_REDUCER } from "../../../flux/actions/filmsAll.js";
import Router from "../../utils/router.js";

/**
 * Отображает страницу фильмов определенного жанра.
 * @param {string} genreNameRu Название жанра.
 */
export async function renderGenrePage(genreNameRu) {
  let filmsData;
  await FilmsAllRequest();
  store.subscribe(FILMS_REDUCER, () => {
    filmsData = store.getState().films.films;
  });
  await FilmsAllRequest();

  const genrePageData = { filmsData, genreNameRu };
  document.querySelector("main").innerHTML = template(genrePageData);

  const filmCards = document.querySelectorAll("[data-film-id]");

  filmCards.forEach((filmCard) => {
    filmCard.addEventListener("click", () => {
      Router.goToFilmPage(filmCard.dataset.filmId, filmCard.dataset.filmTitle);
    });
  });
}
