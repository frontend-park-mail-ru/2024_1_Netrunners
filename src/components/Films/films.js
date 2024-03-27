import {timeConvert} from '../../utils/timeConvert.js';
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
  try {
    const response = await filmsApi.getAll();
    if (!response.ok) {
      throw new Error(`ошибка при выполнении запроса ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data.films)) {
      throw new Error('ответ не содержит массив фильмов');
    }

    const filmsWithHours = data.films.map((film) => ({
      ...film,
      duration: timeConvert.timeIntoText(film.duration),
    }));

    document.querySelector('main').innerHTML = template({filmsWithHours});
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}
