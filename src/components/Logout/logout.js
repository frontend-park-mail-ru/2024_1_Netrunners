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
  try {
    const response = await authApi.logout();
    if (!response.ok) {
      throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
    }

    const responseData = await response.json();
    const isAuthorized = responseData.status !== 200;
    menu.renderAuth(isAuthorized);

    if (responseData.status === 200) {
      goToPage(menu.state.menuElements.films);
    }
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}
