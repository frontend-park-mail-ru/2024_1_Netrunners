import {menu} from '../index.js';

/**
 * Обновляет отображение элементов меню
 * в зависимости от статуса аутентификации пользователя.
 * @function
 * @param {number} responseStatus - Статус ответа от сервера.
 * @return {void}
 */
export function updateMenuDisplay(responseStatus) {
  const showLoggedIn = responseStatus === 200;
  menu.state.menuElements.logout.style.display = showLoggedIn ? 'block':'none';
  menu.state.menuElements.profile.style.display = showLoggedIn ? 'block':'none';
  menu.state.menuElements.login.style.display = showLoggedIn ? 'none':'block';
  menu.state.menuElements.signup.style.display = showLoggedIn ? 'none':'block';
}
