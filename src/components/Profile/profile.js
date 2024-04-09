import * as profileApi from '../../api/profile.js';
import * as filmsApi from '../../api/films.js';
import {validators} from "../../utils/validate.js";
import {goToPage, menu} from "../../index.js";
import {profileTemplate} from "./Profile.hbs.js";
import {editFormTemplate} from "./editForm.hbs.js";

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
  let formTemplate = Handlebars.compile(editFormTemplate);
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
      return
    }

    let newData = usernameInput.value;
    let action = 'chUsername';

    await profileApi.editProfile(profileId, {action, newData});
  });

  avatarButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const avatarBinary = avatarInput.value;

    if (!avatarBinary) {
      document.getElementById('avatar-errors').innerText = 'Файл не выбран';
      return
    }

    let newData = avatarInput.value;
    let action = 'chAvatar';

    await profileApi.editProfile(profileId, {action, newData});
  });

  passwordButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!validators.password(passwordInput.value)) {
      document.getElementById('password-errors').innerText = 'Пароль слишком короткий';
      return
    }

    if (!validators.passwordConf(passwordInput.value, passConfInput.value)) {
      document.getElementById('password-errors').innerText = 'Пароли не совпадают';
      return
    }

    let newData = passwordInput.value;
    let action = 'chPassword';

    await profileApi.editProfile(profileId, {action, newData});
  });

  exitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    await renderProfile(profileId);
  });

}

