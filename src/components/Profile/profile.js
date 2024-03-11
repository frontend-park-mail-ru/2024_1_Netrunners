import * as authApi from '../../api/auth.js';
import {goToPage, menu} from '../../index.js';

/**
 * Рендерит страницу профиля пользователя, проверяет статус аутентификации,
 * и в зависимости от статуса отображает профиль пользователя
 * или перенаправляет на страницу входа.
 * @function
 * @return {void}
 */
export function renderProfile() {
  authApi.check()
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
      })
      .then((response) => {
        if (response.status === 200) {
          // Здесь должен появиться профиль
        } else if (response.status === 401) {
          goToPage(menu.state.menuElements.login);
          throw new Error('Unauthorized');
        }
      })
      .catch(function(error) {
        console.error('Произошла ошибка:', error.message);
      });
}
