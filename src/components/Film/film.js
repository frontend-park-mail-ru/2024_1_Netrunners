import * as filmApi from "../../api/film.js";
import template from "./Film.hbs";
import Router from "../../utils/router.js";
import store, { getCookie } from "../../index.js";
import { getFilmData } from "../../../use-cases/film.js";
import { FILM_REDUCER } from "../../../flux/actions/film.js";
import { showNotification } from "../Notification/notification.js";

/**
 * Отображает страницу фильма с указанным идентификатором.
 * @param {string} filmId - Идентификатор фильма.
 * @return {void}
 */
export async function renderFilmPage(filmId) {
  const [filmActors] = await Promise.all([filmApi.getActors(filmId)]);

  store.clearSubscribes();
  const actorSection = document.createElement("section");
  actorSection.classList.add("actor-section");
  let filmData;
  await getFilmData(filmId);
  store.subscribe(FILM_REDUCER, () => {
    filmData = store.getState().film.data.film;
  });
  await getFilmData(filmId);

  document.querySelector("main").innerHTML = template({
    ...filmData,
    filmActors,
  });

  const actorCards = document.querySelectorAll("[data-actor-id]");
  actorCards.forEach((actorCard, index) => {
    actorCard.addEventListener("click", () => {
      Router.goToActorPage(actorCard.dataset.actorId, filmActors[index].name);
    });
  });

  const playerButton = document.querySelector(".accent-button");
  playerButton.addEventListener("click", () => {
    if (getCookie("user_uuid") !== undefined) {
      Router.goToPlayerPage(filmId, filmData.title, filmData.link);
    } else {
      showNotification("Для этого нужно быть авторизованным", "danger");
    }
  });

  const favouritesButton = document.querySelector("#favourites-button");
  favouritesButton.addEventListener("click", () => {
    const uuid = getCookie("user_uuid");
    if (uuid !== undefined) {
      // addToFavorite(filmId, uuid);
      console.log("Добавил");
    } else {
      showNotification("Для этого нужно быть авторизованным", "danger");
    }
  });
}
