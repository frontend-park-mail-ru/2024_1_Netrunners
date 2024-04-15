import * as actorsApi from '../../api/actors.js';
import * as filmsApi from '../../api/films.js';
import {actorTemplate} from './actor.hbs.js';
import Router from '../../utils/router.js';
import store from "../../index.js";
import {ACTOR_REDUCER} from "../../flux/actions/actor.js";
import {getActorData} from "../../use-cases/actor.js";
import {FilmsAllRequest} from "../../use-cases/filmsAll.js";
import {FILMS_REDUCER} from "../../flux/actions/filmsAll.js";

/**
 * Рендерит страницу актёра с данными об актёре
 * и списком фильмов, в которых он снялся.
 * @async
 * @function
 * @param {string} actorId - Идентификатор актёра.
 * @return {void}
 */
export async function renderActorPage(actorId) {

  store.clearSubscribes();
  const actorSection = document.createElement('section');
  actorSection.classList.add('actor-section');
  let actorData;
  let filmsData;
  store.subscribe(ACTOR_REDUCER, () => {
    actorData = store.getState().actor.info;
  });
  await getActorData(actorId);
  await FilmsAllRequest();
  store.subscribe(FILMS_REDUCER, () => {
    filmsData = store.getState().films.films;
  });
  await FilmsAllRequest();
  console.log(store.getState());

  console.log(actorData);
  const template = Handlebars.compile(actorTemplate);
  //const actorPageData = {...actorData, filmsData};
  const actorPageData = {...actorData.actor, filmsData};
  console.log(actorPageData);
  document.querySelector('main').innerHTML = template(actorPageData);

  const filmCards = document.querySelectorAll('[data-film-id]');
  filmCards.forEach((filmCard, index) => {
    filmCard.addEventListener('click', () => {
      Router.goToFilmPage(filmCard.dataset.filmId, filmsData[index].title);
    });
  });
}
