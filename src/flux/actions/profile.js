import {fetchRequest, IP} from '../../api/fetch.js';
//import {fixFilmData} from '../utils/transformers/filmDataWithDuration.js';
import store from '../../index.js';

export const CHANGE_USERNAME_ACTION = 'chUsername';
export const CHANGE_PASSWORD_ACTION = 'chPassword';
export const CHANGE_AVATAR_ACTION = 'chAvatar';

export const PROFILE_REQUEST = 'PROFILE_REQUEST_REQUEST';
/**
 * Экшен типа "USER_INFO_SUCCESS".
 * @constant
 * @type {string}
 */
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
/**
 * Экшен типа "USER_INFO_ERROR".
 * @constant
 * @type {string}
 */
export const PROFILE_ERROR = 'PROFILE_ERROR';

export const PROFILE_REDUCER = 'PROFILE_REDUCER';
/**
 * Генерирует экшен для запроса информации о пользователе.
 * @function
 * @returns {Object} Экшен с типом "USER_INFO_REQUEST".
 */
export const $profileRequest = () => ({ type: PROFILE_REQUEST, reducerName: PROFILE_REDUCER });
/**
 * Генерирует экшен для успешного получения информации о пользователе.
 * @function
 * @param {Object} info - Информация о пользователе.
 * @returns {Object} Экшен с типом "USER_INFO_SUCCESS".
 */
export const $profileSuccess = (info) => ({ type: PROFILE_SUCCESS, payload: info, reducerName: PROFILE_REDUCER });
/**
 * Генерирует экшен для обработки ошибки при получении информации о пользователе.
 * @function
 * @param {Object} error - Объект ошибки.
 * @returns {Object} Экшен с типом "USER_INFO_ERROR".
 */
export const $profileError = (error) => ({ type: PROFILE_ERROR, payload: { isError: true, error: error }, reducerName: PROFILE_REDUCER });


/**
 * Запрос на получение данных о пользователе
 * @function
 * @param {string} uuid - Идентификатор пользователя.
 * @return {Promise} promise - Объект запроса
 */
export async function getProfileData(uuid) {
  try {
    store.dispatch($profileRequest());
    const response = await fetchRequest(`${IP}/profile/${uuid}/data`, 'GET');
    const data = await response.json();

    if (!data || typeof data !== 'object') {
      throw new Error('Ошибка: полученные данные не являются объектом');
    }
    //return fixUserData(data.user);
    store.dispatch($profileSuccess());
  } catch (error) {
    console.error('Произошла ошибка: ', error.message);
    store.dispatch($profileError());
  }
}
