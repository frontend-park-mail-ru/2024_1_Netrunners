import * as filmsApi from '../../api/films.js';
import * as actorsApi from '../../api/actors.js';
import {timeConvert} from '../../utils/timeConvert.js';

/**
 * Рендерит страницу актёра с данными об актёре
 * и списком фильмов, в которых он снялся.
 * @async
 * @function
 * @param {int} actorId - Идентификатор актёра.
 * @return {void}
 */
export async function renderActorPage(actorId) {
  try {
    const actorPageData = await actorsApi.getActorData(actorId);
    const actorSection = document.createElement('section');
    actorSection.classList.add('actor-section');
    const template = Handlebars.templates['actor.hbs'];
    const response = await filmsApi.getAll();
    if (!response.ok) {
      throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
    }
    const data = await response.json();
    if (!data || !data.films || !Array.isArray(data.films)) {
      console.error('Ошибка: ответ не содержит массив фильмов', data);
      throw new Error('Ошибка: ответ не содержит массив фильмов');
    }
    const filmsWithHours = data.films.map((film) => ({
      ...film,
      duration: timeConvert.timeIntoText(film.duration),
    }));
    Object.assign(actorPageData, {filmsWithHours});
    document.querySelector('main').innerHTML = template(actorPageData);
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}
