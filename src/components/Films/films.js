import * as filmsApi from '../../api/films.js';
import {filmsTemplate} from './Films.hbs.js';
import {renderStarsRating} from '../renderStarsRating.js';
import {renderSlider} from '../Slider/renderSlider.js';

/**
 * Рендерит страницу фильмов, получает данные о фильмах с сервера,
 * преобразует данные и отображает список фильмов на странице.
 * @async
 * @function
 * @return {void}
 */
export async function renderFilms() {
  try {
    const [filmData, topFourFilms, filmsGenres] = await Promise.all([
      filmsApi.getAll(),
      filmsApi.getTopFour(),
      filmsApi.getGenres(),
    ]);

    topFourFilms[0].active = 'data-active';

    Handlebars.registerHelper('stars', function(averageScore) {
      averageScore = 4.4;
      const roundedScore = Math.floor(averageScore);
      const remainder = averageScore - roundedScore;
      const starsHTML = renderStarsRating(roundedScore, remainder);
      return new Handlebars.SafeString(starsHTML);
    });
    const template = Handlebars.compile(filmsTemplate);
    document.querySelector('main').innerHTML = template({filmData, topFourFilms, filmsGenres});

    renderSlider();
  } catch (error) {
    console.error('Error rendering films:', error);
  }
}
