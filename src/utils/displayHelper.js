import {goToPage, menu} from '../index.js';

export function createInput(type, text, name) {
  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.placeholder = text;

  return input;
}

export function updateMenuDisplay(responseStatus) {
  const showLoggedIn = responseStatus === 200;
  menu.state.menuElements.logout.style.display = showLoggedIn ? 'block':'none';
  menu.state.menuElements.profile.style.display = showLoggedIn ? 'block':'none';
  menu.state.menuElements.login.style.display = showLoggedIn ? 'none':'block';
  menu.state.menuElements.signup.style.display = showLoggedIn ? 'none':'block';
}
