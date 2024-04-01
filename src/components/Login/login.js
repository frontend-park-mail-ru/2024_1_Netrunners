import {validators} from '../../utils/validate.js';
import * as authApi from '../../api/auth.js';
import {goToPage, menu} from '../../index.js';

/**
 * Рендерит страницу входа в систему, обрабатывает событие отправки формы,
 * валидирует введенные данные и отправляет запрос
 * на сервер для аутентификации пользователя.
 * @function
 * @return {void}
 */
export function renderLogin() {
  const template = Handlebars.templates['Login.hbs'];
  document.querySelector('main').innerHTML = template();

  const form = document.querySelector('.form-section');
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInput = document.querySelector('input[type="password"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const login = emailInput.value.trim();
    const password = passwordInput.value;
    const user = {login, password};

    if (!validators.login(login)) {
      const errorField = document.getElementById('login-errors');
      errorField.innerText = 'Поле почта введено некорректно';
    }

    const isAuthorized = await authApi.login(user);
    menu.renderAuth(isAuthorized);

    if (isAuthorized) {
      goToPage(menu.state.menuElements.films);
      return;
    }

    const errorField = document.getElementById('login-errors');
    errorField.innerText = 'Неверная почта или пароль';
  });
}
