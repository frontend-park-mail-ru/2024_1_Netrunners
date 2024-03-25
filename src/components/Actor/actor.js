import * as filmsApi from '../../api/films.js';
import * as actorsApi from '../../api/actors.js';
import {timeConvert} from '../../utils/timeConvert.js';

export function renderActorPage(actorId) {
  let actorPageData;
  actorsApi.getActorData(actorId)
      .then((data) => {
        if (data) {
          actorPageData = data;
        }
      });
  const actorSection = document.createElement('section');
  actorSection.classList.add('actor-section');
  const template = Handlebars.templates['actor.hbs'];
  filmsApi.getAll()
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
      })
      .then((data) => {
        if (data && data.films && Array.isArray(data.films)) {
          const filmsWithHours = data.films.map((film) => ({
            ...film,
            duration: timeConvert.timeIntoText(film.duration),
          }));
          Object.assign(actorPageData, {filmsWithHours});
          document.querySelector('main').innerHTML = template(actorPageData);
          return;
        }
        console.error('Ошибка: ответ не содержит массив фильмов', data);
        throw new Error('Ошибка: ответ не содержит массив фильмов');
      })
      .catch(function(error) {
        console.error('Произошла ошибка:', error.message);
      });
}
