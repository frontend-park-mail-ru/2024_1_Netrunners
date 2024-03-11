import {fetchRequest, IP} from './fetch.js';


/**
 * Запрос на получене массива с фильмами
 * @function
 * @return {Promise} promise - Объект запроса
 */
export function getAll() {
  const url = IP + 'films';
  return fetchRequest(url, 'GET');
}
