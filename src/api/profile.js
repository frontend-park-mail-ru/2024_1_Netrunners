import {fetchRequest, IP} from './fetch.js';

const profileData = {
  name: "Мэттью Макконахи",
  email: "ahmed@yandex.ru",
  signup_at: "2011-04-11T10:20:30",
  is_admin: false,
  avatar: 'https://rustars.tv/wp-content/uploads/2017/07/stanislav-yarushin14.jpg'
};

/**
 * Запрос на получение данных о пользователе
 * @function
 * @param {string} profileId - Идентификатор пользователя.
 * @return {Promise} promise - Объект запроса
 */
export async function getProfileData(actorId) {
  //   const response = await fetchRequest(`${IP}/profile/${profileId}/data`, 'GET');
  //   const data = await response.json();
  //   if (!data || typeof data !== 'object') {
  //     throw new Error('Ошибка: полученные данные не являются объектом');
  //   }
  //   return data;
  return new Promise(function(resolve) {
    resolve(profileData);
  });
}
