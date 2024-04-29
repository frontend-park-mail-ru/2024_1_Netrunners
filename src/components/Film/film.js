import * as filmApi from "../../api/film.js";
import template from "./Film.hbs";
import Router from "../../utils/router.js";
import store, { getCookie } from "../../index.js";
import { getFilmData } from "../../../use-cases/film.js";
import { FILM_REDUCER } from "../../../flux/actions/film.js";
import { showNotification } from "../Notification/notification.js";
import {
  addToFavorite,
  getFavouritesFilms,
  removeFromFavorite,
} from "../../api/profile.js";
import { IN_FAVOUTITES, NOT_IN_FAVOUTITES } from "../../img/imgConstants.js";

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
  let inFavorites;
  const profileId = getCookie("user_uuid");
  if (profileId !== undefined) {
    const filmsData = await getFavouritesFilms(profileId);
    if (filmsData) {
      filmsData.forEach((film) => {
        if (film.uuid === filmId) {
          inFavorites = true;
        }
      });
    }
  }
  document.querySelector("main").innerHTML = template({
    ...filmData,
    filmActors,
    inFavorites,
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
  favouritesButton.addEventListener("click", async () => {
    const uuid = getCookie("user_uuid");
    if (uuid !== undefined) {
      const requestData = {
        filmUuid: filmId,
        userUuid: uuid,
      };

      if (!(await addToFavorite(requestData))) {
        removeFromFavorite(requestData);
        favouritesButton.innerHTML = NOT_IN_FAVOUTITES;
      } else {
        favouritesButton.innerHTML = IN_FAVOUTITES;
      }
    } else {
      showNotification("Для этого нужно быть авторизованным", "danger");
    }
  });
}
