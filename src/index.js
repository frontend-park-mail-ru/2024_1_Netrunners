import {Menu} from './components/Menu/Menu.js';
import {updateMenuDisplay} from './utils/displayHelper.js';
import * as authApi from './api/auth.js';
import {renderFilms} from './components/Films/films.js';
import {renderLogin} from './components/Login/login.js';
import {renderSignup} from './components/Signup/signup.js';
import {renderProfile} from './components/Profile/profile.js';
import {renderLogout} from './components/Logout/logout.js';


const rootElement = document.getElementById('root');
const menuElement = document.createElement('aside');
const pageElement = document.createElement('main');


rootElement.appendChild(menuElement);
rootElement.appendChild(pageElement);

const config = {
  menu: {
    films: {
      href: '/films',
      text: 'Фильмы',
      render: renderFilms,
    },
    login: {
      href: '/login',
      text: 'Авторизоваться',
      render: renderLogin,
    },
    signup: {
      href: '/signup',
      text: 'Регистрация',
      render: renderSignup,
    },
    profile: {
      href: '/profile',
      text: 'Профиль',
      render: renderProfile,
    },
    logout: {
      href: '/logout',
      text: 'Выйти',
      render: renderLogout,
    },
  },
};

export const menu = new Menu(menuElement, config);

export function renderMenu() {
  menu.render();
  menuElement.addEventListener('click', (e) => {
    const {target} = e;

    if (target.tagName.toLowerCase() === 'a' || target instanceof HTMLAnchorElement) {
      e.preventDefault();
      goToPage(target);
    }
  });
  authApi.check()
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
        }
      })
      .then((response) => {
        updateMenuDisplay(response.status);
      })
      .catch(function (error) {
        console.error('Произошла ошибка:', error.message);
      });
}

export function goToPage(menuLinkElement) {
  pageElement.innerHTML = '';

  menu.state.activeMenuLink?.classList.remove('active');
  menuLinkElement.classList.add('active');
  menu.state.activeMenuLink = menuLinkElement;

  const element = config.menu[menuLinkElement.dataset.section].render();

  pageElement.appendChild(element);
}

renderMenu();
goToPage(menu.state.menuElements.films);
