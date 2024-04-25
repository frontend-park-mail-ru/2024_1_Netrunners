import { fetchRequest, IP } from "./fetch.js";
import {
  fixUserData,
  toFilmDataWithDuration,
} from "../utils/transformers/filmDataWithDuration.js";

export const CHANGE_USERNAME_ACTION = "chUsername";
export const CHANGE_PASSWORD_ACTION = "chPassword";
export const CHANGE_AVATAR_ACTION = "chAvatar";

/**
 * Запрос на получение данных о пользователе
 * @function
 * @param {string} uuid - Идентификатор пользователя.
 * @return {Promise} promise - Объект запроса
 */
export async function getProfileData(uuid) {
  try {
    const response = await fetchRequest(`${IP}/profile/${uuid}/data`, "GET");
    const data = await response.json();

    if (!data || typeof data !== "object") {
      throw new Error("Ошибка: полученные данные не являются объектом");
    }

    return fixUserData(data.user);
  } catch (error) {
    console.error("Произошла ошибка: ", error.message);
  }
}

/**
 * Отправляет запрос на изменение профиля пользователя.
 * @param {string} uuid - Идентификатор пользователя.
 * @param {object} editData - Данные для изменения профиля.
 * @return {Promise<boolean>} - Возвращает true в случае успешного изменения профиля, иначе false.
 */
export async function editProfile(uuid, editData) {
  try {
    const response = await fetchRequest(
      `${IP}/profile/${uuid}/edit`,
      "POST",
      editData,
      {},
      "multipart/form-data",
    );
    const responseData = await response.json();

    return responseData.status === 200;
  } catch (error) {
    console.error("Произошла ошибка: ", error.message);
  }
}

/**
 * Получает превью аватара пользователя по его идентификатору.
 * @param {string} uuid - Идентификатор пользователя.
 * @return {Promise<string>} - Возвращает URL изображения аватара пользователя.
 */
export async function getProfilePreview(uuid) {
  try {
    const response = await fetchRequest(`${IP}/profile/${uuid}/preview`, "GET");
    const data = await response.json();
    data.user.Avatar = `data:image/png;base64,${data.user.Avatar}`;
    if (!data || typeof data !== "object") {
      throw new Error("Ошибка: полученные данные не являются объектом");
    }

    return data.user.Avatar;
  } catch (error) {
    console.error("Произошла ошибка: ", error.message);
  }
}

/**
 * Получает список актеров фильма по его идентификатору.
 * @param {string} filmId - Идентификатор фильма.
 * @param {string} uuid - Идентификатор пользователя.
 * @return {Promise<boolean>} - Возвращает true в случае успешного добавления фильма в избранное
 */
export async function addToFavorite(filmId, uuid) {
  try {
    const response = await fetchRequest(
      `${IP}/profile/${uuid}/favourites/add`,
      "GET",
    );
    const responseData = await response.json();

    return responseData.status === 200;
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}

/**
 * Запрос на получение массива с фильмами
 * @function
 * @param {string} uuid - Идентификатор пользователя.
 * @return {Promise} - Объект запроса
 */
export async function getFavouritesFilms(uuid) {
  try {
    const url = IP + `/profile/${uuid}/favourites/all`;
    const response = await fetchRequest(url, "GET");

    const filmsData = await response.json();
    if (!filmsData || !filmsData.films || !Array.isArray(filmsData.films)) {
      throw new Error("Ошибка: ответ не содержит массив фильмов");
    }

    return toFilmDataWithDuration(filmsData.films);
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}
