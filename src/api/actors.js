const actorData = {
  actorName: 'Мэттью Макконахи',
  actorNameEnglish: 'Matthew McConaughey',
  actorCareer: 'Актер, продюсер, режиссер, сценарист',
  actorHeight: '1.82 м',
  actorBirthDate: '4 ноября, 1969г. (54 года)',
  actorBirthPlace: 'Увалд, Техас, США',
  actorGenres: 'Комедия, драма, криминал',
  actorSpouse: 'Камила Алвес, трое детей',
  actorTotalMovies: '239, 1987 - 2024',
  actorPhoto: 'https://rustars.tv/wp-content/uploads/2017/07/stanislav-yarushin14.jpg',
};

/**
 * Запрос на получение данных об актере
 * @function
 * @param {int} actorId - Идентификатор актёра.
 * @return {Promise} promise - Объект запроса
 */
export function getActorData(actorId) {
  return new Promise(function(resolve) {
    resolve(actorData);
  });
}
