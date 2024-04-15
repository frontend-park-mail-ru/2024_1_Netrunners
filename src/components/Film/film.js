import * as filmApi from '../../api/film.js';
import {filmPageTemplate} from './Film.hbs.js';
import Router from '../../utils/router.js';
import store from "../../index.js";
import {getFilmData} from "../../use-cases/film.js";
import {FILM_REDUCER} from "../../flux/actions/film.js";

export async function renderFilmPage(filmId) {
  const [filmActors] = await Promise.all([
    filmApi.getActors(filmId)
  ]);
  store.clearSubscribes();
  const actorSection = document.createElement('section');
  actorSection.classList.add('actor-section');
  let filmData;
  await getFilmData(filmId);
  store.subscribe(FILM_REDUCER, () => {
    filmData = store.getState().film.data.film;
  });
  await getFilmData(filmId);

  const template = Handlebars.compile(filmPageTemplate);
  document.querySelector('main').innerHTML = template({...filmData, filmActors});

  const actorCards = document.querySelectorAll('[data-actor-id]');
  actorCards.forEach((actorCard, index) => {
    actorCard.addEventListener('click', () => {
      Router.goToActorPage(actorCard.dataset.actorId, filmActors[index].name);
    });
  });

  const playerButton = document.querySelector('.accent-button');
  playerButton.addEventListener('click', (e) => {
    e.preventDefault();
    Router.goToPlayerPage(filmId, filmData.title, filmData.link);
  });
}
