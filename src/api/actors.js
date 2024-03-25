import {fetchRequest, IP} from './fetch.js';

const actorData = {
  actorName: 'Мэттью Макконахи',
  actorNameEnglish: 'Matthew McConaughey',
  actorCareer: 'Актер, продюсер, режиссер, сценарист',
  actorHeight: '1.82 м',
  actorBirthDate: '4 ноября, 1969г. (54 года)',
  actorBirthPlace: 'Увалд, Техас, США',
  actorGenres: 'Комедия, драма, криминал',
  actorSpouse: 'Камила Алвес, трое детей',
  actorTotalMovies: '239',
  actorPhoto: 'https://rustars.tv/wp-content/uploads/2017/07/stanislav-yarushin14.jpg',
};

/**
 * Запрос на получение данных об актере
 * @function
 * @param {string} actorId - Идентификатор актёра.
 * @return {Promise} promise - Объект запроса
 */
export async function getActorData(actorId) {
  //   const response = await fetchRequest(`${IP}actors/${actorId}/data`, 'GET');
  //   const data = await response.json();
  //   if (!data || typeof data !== 'object') {
  //     throw new Error('Ошибка: полученные данные не являются объектом');
  //   }
  //   return data;
  return new Promise(function(resolve) {
    resolve(actorData);
  });
}
