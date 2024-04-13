import * as actorsApi from '../../api/actors.js';
import * as filmsApi from '../../api/films.js';
import {actorTemplate} from './actor.hbs.js';
import Router from '../../utils/router.js';

/**
 * Рендерит страницу актёра с данными об актёре
 * и списком фильмов, в которых он снялся.
 * @async
 * @function
 * @param {string} actorId - Идентификатор актёра.
 * @return {void}
 */
export async function renderActorPage(actorId) {
  const [actorData, filmsData] = await Promise.all([
    actorsApi.getActorData(actorId),
    filmsApi.getAll(),
  ]);

  const actorSection = document.createElement('section');
  actorSection.classList.add('actor-section');

  const template = Handlebars.compile(actorTemplate);
  const actorPageData = {...actorData, filmsData};

  document.querySelector('main').innerHTML = template(actorPageData);

  const filmCards = document.querySelectorAll('[data-film-id]');
  filmCards.forEach((filmCard, index) => {
    filmCard.addEventListener('click', () => {
      Router.goFilmPage(filmCard.dataset.filmId, filmsData[index].title);
    });
  });
}
