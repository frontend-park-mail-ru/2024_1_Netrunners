import {validators} from '../../utils/validate.js';
import * as authApi from '../../api/auth.js';
import {updateMenuDisplay} from '../../utils/displayHelper.js';
import {goToPage, menu} from '../../index.js';

/**
 * Рендерит страницу регистрации, обрабатывает событие отправки формы,
 * валидирует введенные данные и отправляет запрос
 * на сервер для регистрации пользователя.
 * @function
 * @return {void}
 */
export function renderSignup() {
  const template = Handlebars.templates['Signup.hbs'];
  document.querySelector('main').innerHTML = template();
  const form = document.getElementsByClassName('form-section')[0];
  const emailInput = document.getElementsByName('email')[0];
  const usernameInput = document.getElementsByName('username')[0];
  const passConfInput = document.getElementsByName('passConf')[0];
  const passwordInput = document.getElementsByName('password')[0];

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const login = emailInput.value.trim();
    const password = passwordInput.value;
    const passConf = passConfInput.value;
    const username = usernameInput.value;
    const user = {password, login, username};

    if (!validators.username(username)) {
      const errorField = document.getElementById('signup-errors');
      errorField.innerText = 'Имя пользователя слишком короткое';
      throw new Error('Имя пользователя слишком короткое');
    }

    if (!validators.login(login)) {
      const errorField = document.getElementById('signup-errors');
      errorField.innerText = 'Поле почта введено некорректно';
      throw new Error('Почта введена некорректно');
    }

    if (!validators.password(password)) {
      const errorField = document.getElementById('signup-errors');
      errorField.innerText = 'Пароль слишком короткий';
      throw new Error('Пароль слишком короткий');
    }

    if (!validators.passwordConf(password, passConf)) {
      const errorField = document.getElementById('signup-errors');
      errorField.innerText = 'Пароли не совпадают';
      throw new Error('Пароли не совпадают');
    }

    authApi.signup(user)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
        })
        .then((response) => {
          updateMenuDisplay(response.status);
          if (response.status === 400) {
            const errorField = document.getElementById('signup-errors');
            errorField.innerText = 'Такой пользователь уже существует';
            throw new Error('Такой пользователь уже существует');
          }
          goToPage(menu.state.menuElements.films);
        })
        .catch(function(error) {
          console.error('Произошла ошибка:', error.message);
        });
  });
}
