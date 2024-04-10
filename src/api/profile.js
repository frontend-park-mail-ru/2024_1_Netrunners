import {fetchRequest, IP} from './fetch.js';

export const CHANGE_USERNAME_ACTION = 'chUsername';
export const CHANGE_PASSWORD_ACTION = 'chPassword';
export const CHANGE_AVATAR_ACTION = 'chAvatar';

/**
 * Запрос на получение данных о пользователе
 * @function
 * @param {string} uuid - Идентификатор пользователя.
 * @return {Promise} promise - Объект запроса
 */
export async function getProfileData(uuid) {
  const response = await fetchRequest(`${IP}profile/${uuid}/data`, 'GET');
  const data = await response.json();
  if (!data || typeof data !== 'object') {
    throw new Error('Ошибка: полученные данные не являются объектом');
  }
  return data;
}

export async function editProfile(uuid, editData) {
  try {
    const response = await fetchRequest(`${IP}profile/${uuid}/edit`, 'POST', editData);
    const responseData = await response.json();

    return responseData.status === 200;
  } catch (error) {
    console.error('Произошла ошибка: ', error.message);
  }
}

