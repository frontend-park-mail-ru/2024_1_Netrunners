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
  const isAuthenticated = await authApi.check();
  if (isAuthenticated) {
    // Здесь должен появиться профиль
  } else {
    goToPage(menu.state.menuElements.login);
  }
}
