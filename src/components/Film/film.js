import * as filmApi from "../../api/film.js";
import template from "./Film.hbs";
import Router from "../../utils/router.js";

export async function renderFilmPage(filmId) {
  const [filmData, filmActors] = await Promise.all([
    filmApi.getFilmData(filmId),
    filmApi.getActors(filmId),
  ]);

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
  playerButton.addEventListener("click", (e) => {
    e.preventDefault();
    Router.goToPlayerPage(filmId, filmData.title, filmData.link);
  });
}
