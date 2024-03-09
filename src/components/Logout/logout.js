import * as authApi from '../../api/auth.js';
import {goToPage, menu, renderMenu} from '../../index.js';

export function renderLogout() {
  const profileElement = document.createElement('div');

  authApi.logout()
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
        }
      })
      .then(() => {
          renderMenu();
          goToPage(menu.state.menuElements.films);
      })
      .catch(function(error) {
        console.error('Произошла ошибка:', error.message);
      });
  return profileElement;
}
