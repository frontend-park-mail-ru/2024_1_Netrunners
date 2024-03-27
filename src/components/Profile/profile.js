import * as authApi from '../../api/auth.js';
import {goToPage, menu} from '../../index.js';

/**
 * Рендерит страницу профиля пользователя, проверяет статус аутентификации,
 * и в зависимости от статуса отображает профиль пользователя
 * или перенаправляет на страницу входа.
 * @async
 * @function
 * @return {void}
 */
export async function renderProfile() {
  try {
    const response = await authApi.check();

    if (response.ok) {
      const responseData = await response.json();

      if (responseData.status === 200) {
        // Здесь должен появиться профиль
      } else if (responseData.status === 401) {
        goToPage(menu.state.menuElements.login);
        throw new Error('Unauthorized');
      }
    } else {
      throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
    }
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
}
