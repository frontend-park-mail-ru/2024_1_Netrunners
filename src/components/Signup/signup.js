import {validators} from '../../utils/validate.js';
import * as authApi from '../../api/auth.js';
import {createInput, updateMenuDisplay} from '../../utils/displayHelper.js';
import {goToPage, menu} from '../../index.js';

export function renderSignup() {
  const form = document.createElement('form');
  form.classList.add('form-section');

  const emailInput = createInput('email', 'Почта', 'email');
  const usernameInput = createInput('string', 'Логин', 'username');
  const passwordInput = createInput('password', 'Пароль', 'password');
  const passConfInput = createInput('password', 'Подтвердить пароль', 'passConf');

  const submitBtn = document.createElement('input');
  submitBtn.classList.add('submit-button');
  submitBtn.type = 'submit';
  submitBtn.value = 'Зарегистрироваться!';

  form.appendChild(emailInput);
  form.appendChild(usernameInput);
  form.appendChild(passwordInput);
  form.appendChild(passConfInput);
  form.appendChild(submitBtn);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const login = emailInput.value.trim();
    const password = passwordInput.value;
    const passConf = passConfInput.value;
    const username = usernameInput.value;
    const user = {password, login, username};

    if (!validators.username(username)) {
      alert('Имя пользователя слишком короткое');
      throw new Error('Имя пользователя слишком короткое');
    }
    if (!validators.login(login)) {
      alert('Поле почта введено некорректно');
      throw new Error('Почта введена некорректно');
    }
    if (!validators.password(password, passConf)) {
      alert('Пароли не совпадают');
      throw new Error('Пароли не совпадают');
    }

    authApi.signup(user)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
          }
        })
        .then((response) => {
          updateMenuDisplay(response.status);
          if (response.status === 200) {
            goToPage(menu.state.menuElements.films);
          } else if (response.status === 400) {
            throw new Error('Неверная почта или пароль при регистрации');
          }
        })
        .catch(function(error) {
          console.error('Произошла ошибка:', error.message);
        });
  });

  return form;
}
