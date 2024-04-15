import {fetchRequest, IP} from '../../api/fetch.js';
//import {fixFilmData} from '../utils/transformers/filmDataWithDuration.js';
import store from '../../index.js';

export const CHANGE_USERNAME_ACTION = 'chUsername';
export const CHANGE_PASSWORD_ACTION = 'chPassword';
export const CHANGE_AVATAR_ACTION = 'chAvatar';

export const ACTOR_REQUEST = 'ACTOR_REQUEST';
/**
 * Экшен типа "USER_INFO_SUCCESS".
 * @constant
 * @type {string}
 */
export const ACTOR_SUCCESS = 'ACTOR_SUCCESS';
/**
 * Экшен типа "USER_INFO_ERROR".
 * @constant
 * @type {string}
 */
export const ACTOR_ERROR = 'ACTOR_ERROR';

export const ACTOR_REDUCER = 'ACTOR_REDUCER';
/**
 * Генерирует экшен для запроса информации о пользователе.
 * @function
 * @returns {Object} Экшен с типом "USER_INFO_REQUEST".
 */
export const $actorRequest = () => ({ type: ACTOR_REQUEST, reducerName: ACTOR_REDUCER });
/**
 * Генерирует экшен для успешного получения информации о пользователе.
 * @function
 * @param {Object} info - Информация о пользователе.
 * @returns {Object} Экшен с типом "USER_INFO_SUCCESS".
 */
export const $actorSuccess = (info) => ({ type: ACTOR_SUCCESS, payload: info, reducerName: ACTOR_REDUCER });
/**
 * Генерирует экшен для обработки ошибки при получении информации о пользователе.
 * @function
 * @param {Object} error - Объект ошибки.
 * @returns {Object} Экшен с типом "USER_INFO_ERROR".
 */
export const $actorError = (error) => ({ type: ACTOR_ERROR, payload: { isError: true, error: error }, reducerName: ACTOR_REDUCER });


/**
 * Запрос на получение данных о пользователе
 * @function
 * @param {string} uuid - Идентификатор пользователя.
 * @return {Promise} promise - Объект запроса
 */
export async function $getActorData(uuid) {
    try {
        console.log('getActorData', uuid);
        store.dispatch($actorRequest());
        console.log('getActorData', uuid);
        const response = await fetchRequest(`${IP}/actors/${uuid}/data`, 'GET');
        console.log('getActorData', response);
        const data = await response.json();
        console.log('getActorData', data);

        if (!data || typeof data !== 'object') {
            throw new Error('Ошибка: полученные данные не являются объектом');
        }
        //return fixUserData(data.user);
        console.log('перед саксес');
        store.dispatch($actorSuccess(data));
    } catch (error) {
        console.error('Произошла ошибка: ', error.message);
        console.log('перед ерор');
        store.dispatch($actorError());
    }
}
