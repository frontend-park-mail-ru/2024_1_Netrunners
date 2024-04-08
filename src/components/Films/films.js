import * as filmsApi from '../../api/films.js';
import {filmsTemplate} from './Films.hbs.js';


/**
 * Рендерит страницу фильмов, получает данные о фильмах с сервера,
 * преобразует данные и отображает список фильмов на странице.
 * @async
 * @function
 * @return {void}
 */
export async function renderFilms() {
  const template = Handlebars.compile(filmsTemplate);
  const filmsWithHours = await filmsApi.getAll();
  document.querySelector('main').innerHTML = template({filmsWithHours});
}
