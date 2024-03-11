import * as authApi from '../../api/auth.js';
import {goToPage, menu} from '../../index.js';
import {updateMenuDisplay} from '../../utils/displayHelper.js';

/**
 * Отправляет запрос на сервер для выхода из аккаунта,
 * обновляет отображение меню и перенаправляет
 * на страницу фильмов при успешном выходе.
 * @function
 * @return {void}
 */
export function renderLogout() {
  authApi.logout()
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
      })
      .then((response) => {
        updateMenuDisplay(!response.status);
        if (response.status === 200) {
          goToPage(menu.state.menuElements.films);
        }
      })
      .catch(function(error) {
        console.error('Произошла ошибка:', error.message);
      });
}
