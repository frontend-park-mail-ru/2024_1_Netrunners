import * as authApi from '../../api/auth.js';
import {menu} from '../../index.js';

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
        menu.state.menuElements.films.classList.remove('active');
        window.location.reload();
      })
      .catch(function(error) {
        console.error('Произошла ошибка:', error.message);
      });
  return profileElement;
}
