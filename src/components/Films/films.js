import * as filmsApi from '../../api/films.js';

/**
 * Рендерит страницу фильмов, получает данные о фильмах с сервера,
 * преобразует данные и отображает список фильмов на странице.
 * @async
 * @function
 * @return {void}
 */
export async function renderFilms() {
  const template = Handlebars.templates['Films.hbs'];
  const filmsWithHours = await filmsApi.getAll();
  document.querySelector('main').innerHTML = template({filmsWithHours});
}
