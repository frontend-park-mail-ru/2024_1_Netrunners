import * as authApi from '../../api/auth.js';
import {goToPage, menu} from '../../index.js';

/**
 * Отправляет запрос на сервер для выхода из аккаунта,
 * обновляет отображение меню и перенаправляет
 * на страницу фильмов при успешном выходе.
 * @async
 * @function
 * @return {void}
 */
export async function renderLogout() {
  const isAuthorized = await authApi.logout();
  menu.renderAuth(!isAuthorized);

  if (isAuthorized) {
    goToPage(menu.state.menuElements.films);
  }
}
