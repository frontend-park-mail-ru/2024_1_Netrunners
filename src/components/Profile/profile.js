import * as profileApi from '../../api/profile.js';
import * as filmsApi from '../../api/films.js';
import {validators} from '../../utils/validate.js';
import {profileTemplate} from './Profile.hbs.js';
import {editFormTemplate} from './editForm.hbs.js';

/**
 * Рендерит страницу актёра с данными об актёре
 * и списком фильмов, в которых он снялся.
 * @async
 * @function
 * @param {string} actorId - Идентификатор актёра.
 * @return {void}
 */
export async function renderProfile(profileId) {
  const [profileData, filmsData] = await Promise.all([
    profileApi.getProfileData(profileId),
    filmsApi.getAll(),
  ]);

  const template = Handlebars.compile(profileTemplate);
  const profilePageData = {...profileData, filmsData};
  document.querySelector('main').innerHTML = template(profilePageData);

  document.querySelector('.profile-page-buttons').addEventListener('click', (e) => {
    e.preventDefault();
    renderEditForm(profileId);
  });
}
export async function renderEditForm(profileId) {
  const formTemplate = Handlebars.compile(editFormTemplate);
  document.querySelector('.profile-info').innerHTML = formTemplate();

  const form = document.querySelector('.form-section');

  const usernameButton = document.querySelector('#sendLoginBtn');
  const avatarButton = document.querySelector('#sendImageBtn');
  const passwordButton = document.querySelector('#sendPasswordBtn');
  const exitButton = document.querySelector('#exit-editing-button');

  const usernameInput = document.querySelector('input[name="username"]');
  const passConfInput = document.querySelector('input[name="passConf"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const avatarInput = document.querySelector('input[name="avatar"]');

  usernameButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!validators.username(usernameInput.value)) {
      document.getElementById('username-errors').innerText = 'Имя пользователя слишком короткое';
      return;
    }

    await profileApi.editProfile(profileId, {action: profileApi.CHANGE_USERNAME_ACTION, newData: usernameInput.value});
  });

  avatarButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const avatarBinary = avatarInput.value;

    if (!avatarBinary) {
      document.getElementById('avatar-errors').innerText = 'Файл не выбран';
      return;
    }

    await profileApi.editProfile(profileId, {action: profileApi.CHANGE_AVATAR_ACTION, newData: avatarBinary});
  });

  passwordButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!validators.password(passwordInput.value)) {
      document.getElementById('password-errors').innerText = 'Пароль слишком короткий';
      return;
    }

    if (!validators.passwordConf(passwordInput.value, passConfInput.value)) {
      document.getElementById('password-errors').innerText = 'Пароли не совпадают';
      return;
    }

    await profileApi.editProfile(profileId, {action: profileApi.CHANGE_PASSWORD_ACTION, newData: passwordInput.value});
  });

  exitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    await renderProfile(profileId);
  });
}

