import store from '../../index.js';
import {fetchRequest, IP} from '../../api/fetch.js';
import {toFilmDataWithDuration} from "../../utils/transformers/filmDataWithDuration.js";
/**
 * Экшен типа "USER_INFO_REQUEST".
 * @constant
 * @type {string}
 */
export const FILMS_ALL_REQUEST = 'FILMS_ALL_REQUEST';
/**
 * Экшен типа "USER_INFO_SUCCESS".
 * @constant
 * @type {string}
 */
export const FILMS_ALL_SUCCESS = 'FILMS_ALL_SUCCESS';
/**
 * Экшен типа "USER_INFO_ERROR".
 * @constant
 * @type {string}
 */
export const FILMS_ALL_ERROR = 'FILMS_ALL_ERROR';

/**
 * Генераторы экшенов для работы с информацией о пользователе.
 */
export const FILMS_REDUCER = 'FILMS_REDUCER';
/**
 * Генерирует экшен для запроса информации о пользователе.
 * @function
 * @returns {Object} Экшен с типом "USER_INFO_REQUEST".
 */
export const $filmsAllRequest = () => ({ type: FILMS_ALL_REQUEST, reducerName: FILMS_REDUCER });
/**
 * Генерирует экшен для успешного получения информации о пользователе.
 * @function
 * @param {Object} info - Информация о пользователе.
 * @returns {Object} Экшен с типом "USER_INFO_SUCCESS".
 */
export const $filmsAllSuccess = (films) => ({ type: FILMS_ALL_SUCCESS, payload: films, reducerName: FILMS_REDUCER });
/**
 * Генерирует экшен для обработки ошибки при получении информации о пользователе.
 * @function
 * @param {Object} error - Объект ошибки.
 * @returns {Object} Экшен с типом "USER_INFO_ERROR".
 */
export const $filmsAllError = (error) => ({ type: FILMS_ALL_ERROR, payload: { isError: true, error: error }, reducerName: FILMS_REDUCER });
/**
 * Отправляет запрос на получение информации о пользователе.
 * @function
 * @returns {void}
 */
export const $sentFilmsAllRequest = () => {
    store.dispatch($filmsAllRequest());
    try {
        const url = IP + '/films/all';
        const response = fetchRequest(url, 'GET');

        const filmsData = response.json();
        store.dispatch($filmsAllSuccess(filmsData.films));
        if (!filmsData || !filmsData.films || !Array.isArray(filmsData.films)) {
            throw new Error('Ошибка: ответ не содержит массив фильмов');
        }

        //return toFilmDataWithDuration(filmsData.films);
    } catch (error) {
        store.dispatch($filmsAllError(error));
        console.error('Произошла ошибка:', error.message);
    }

};
