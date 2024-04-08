import {validators} from '../../utils/validate.js';
import * as authApi from '../../api/auth.js';
import {goToPage, menu} from '../../index.js';
import {signupTemplate} from './Signup.hbs.js';

/**
 * Рендерит страницу регистрации, обрабатывает событие отправки формы,
 * валидирует введенные данные и отправляет запрос
 * на сервер для регистрации пользователя.
 * @async
 * @function
 * @return {void}
 */
export async function renderSignup() {
  const template = Handlebars.compile(signupTemplate);
  document.querySelector('main').innerHTML = template();

  const form = document.querySelector('.form-section');
  const emailInput = document.querySelector('input[name="email"]');
  const usernameInput = document.querySelector('input[name="username"]');
  const passConfInput = document.querySelector('input[name="passConf"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const errorField = document.getElementById('signup-errors');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const login = emailInput.value.trim();
    const password = passwordInput.value;
    const passConf = passConfInput.value;
    const username = usernameInput.value;
    const user = {password, login, username};

    if (!validators.username(username)) {
      errorField.innerText = 'Имя пользователя слишком короткое';
    }

    if (!validators.login(login)) {
      errorField.innerText = 'Поле почта введено некорректно';
    }

    if (!validators.password(password)) {
      errorField.innerText = 'Пароль слишком короткий';
    }

    if (!validators.passwordConf(password, passConf)) {
      errorField.innerText = 'Пароли не совпадают';
    }

    const isAuthorized = await authApi.signup(user);
    if (isAuthorized) {
      menu.renderAuth(isAuthorized);
      goToPage(menu.state.menuElements.films);
    } else {
      errorField.innerText = 'Такой пользователь уже существует';
    }
  });
}
