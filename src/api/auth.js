import {fetchRequest, IP} from './fetch.js';

/**
 * проверка валидности сессии
 * @function
 * @return {Promise}
 */
export function check() {
  const url = IP + 'auth/check';
  return fetchRequest(url, 'POST');
}

/**
 * отправка запроса на вход
 * @function
 * @param {Object} user - данные пользователя
 * @return {Promise}
 */
export function login(user) {
  const url = IP + 'auth/login';
  return fetchRequest(url, 'POST', user);
}

/**
 * отправка запроса на регистрацию
 * @function
 * @param {Object} user - данные пользователя
 * @return {Promise}
 */
export function signup(user) {
  const url = IP + 'auth/signup';
  return fetchRequest(url, 'POST', user);
}

/**
 * отправка запроса для удаления текущей сессии
 * @function
 * @return {Promise}
 */
export function logout() {
  const url = IP + 'auth/logout';
  return fetchRequest(url, 'POST');
}
