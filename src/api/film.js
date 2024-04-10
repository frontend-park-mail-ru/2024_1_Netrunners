import {fetchRequest, IP} from './fetch.js';

export async function getFilmData(filmId) {
  try {
    const response = await fetchRequest(`${IP}films/${filmId}/data`, 'GET');
    const filmData = await response.json();
    if (!filmData || typeof filmData !== 'object') {
      throw new Error('Ошибка: полученные данные не являются объектом');
    }
    return filmData.film;
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}

export async function getActors(filmId) {
  try {
    const response = await fetchRequest(`${IP}films/${filmId}/actors`, 'GET');
    const filmActors = await response.json();
    if (!filmActors || typeof filmActors !== 'object') {
      throw new Error('Ошибка: полученные данные не являются объектом');
    }
    return filmActors.actors;
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}
