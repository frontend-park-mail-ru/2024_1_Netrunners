import {fetchRequest, IP} from './fetch.js';
import {timeConvert} from '../utils/timeConvert.js';


/**
 * Запрос на получение массива с фильмами
 * @function
 * @return {Promise} promise - Объект запроса
 */
export async function getAll() {
  try {
    const url = IP + 'films';
    const response = await fetchRequest(url, 'GET');

    const filmsData = await response.json();
    if (!filmsData || !filmsData.films || !Array.isArray(filmsData.films)) {
      throw new Error('Ошибка: ответ не содержит массив фильмов');
    }

    return filmsData.films.map((film) => ({
      ...film,
      duration: timeConvert.timeIntoText(film.duration),
    }));
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}
