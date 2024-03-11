import {timeConvert} from '../../utils/timeConvert.js';
import * as filmsApi from '../../api/films.js';

export function renderFilms() {
  const filmsSection = document.getElementsByClassName('films-section');
  const template = Handlebars.templates['Films.hbs'];
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
          document.querySelector('main').innerHTML = template({filmsWithHours});
          return filmsSection[0];
        }
        console.error('Ошибка: ответ не содержит массив фильмов', data);
        throw new Error('Ошибка: ответ не содержит массив фильмов');
      })
      .catch(function(error) {
        console.error('Произошла ошибка:', error.message);
      });
}
