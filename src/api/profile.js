import {fetchRequest, IP} from './fetch.js';
import {timeConvert} from '../utils/timeConvert.js';

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
  try {
    const response = await fetchRequest(`${IP}profile/${uuid}/data`, 'GET');
    const data = await response.json();
    if (!data || typeof data !== 'object') {
      throw new Error('Ошибка: полученные данные не являются объектом');
    }
    data.user.registeredAt = timeConvert.dateIntoYear(data.user.registeredAt);
    return data.user;
  } catch (error) {
    console.error('Произошла ошибка: ', error.message);
  }
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

export async function getProfilePreview(uuid) {
  try {
    const response = await fetchRequest(`${IP}profile/${uuid}/preview`, 'GET');
    const data = await response.json();

    if (!data || typeof data !== 'object') {
      throw new Error('Ошибка: полученные данные не являются объектом');
    }

    return data.user.Avatar;
  } catch (error) {
    console.error('Произошла ошибка: ', error.message);
  }
}

