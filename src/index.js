import {Menu} from './components/Menu/Menu.js';
import * as authApi from './api/auth.js';
import {renderFilms} from './components/Films/films.js';
import {renderLogin} from './components/Login/login.js';
import {renderSignup} from './components/Signup/signup.js';
import {renderProfile} from './components/Profile/profile.js';
import {renderLogout} from './components/Logout/logout.js';
import {renderPlayer} from './components/Player/player.js';


const rootElement = document.getElementById('root');
const menuElement = document.createElement('nav');
const pageElement = document.createElement('main');

rootElement.appendChild(menuElement);
rootElement.appendChild(pageElement);

const config = {
  menu: {
    home: {
      href: '/home',
      text: 'Главная',
      render: renderFilms,
    },
    films: {
      href: '/films',
      text: 'Фильмы и сериалы',
      render: renderFilms,
    },
    support: {
      href: '/support',
      text: 'Поддержка',
      render: renderFilms,
    },
    subscription: {
      href: '/subscription',
      text: 'Подписки',
      render: renderFilms,
    },
  },
  authElements: {
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
  noAuthElements: {
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
  },
};

export const menu = new Menu(menuElement, config);

/**
 * Рендерит меню, добавляет обработчик событий для навигации,
 * проверяет статус аутентификации пользователя и
 * соответственно обновляет отображение меню.
 * @function
 * @return {void}
 */
export async function renderMenu() {
  menu.render();
  menuElement.addEventListener('click', (e) => {
    const {target} = e;

    if (target.tagName.toLowerCase() === 'a') {
      e.preventDefault();
      goToPage(target);
    }
  });
  const isAuthorized = await authApi.check();
  menu.renderAuth(isAuthorized);
}

/**
 * Переходит на указанную страницу, очищает содержимое элемента страницы,
 * обновляет стили активного пункта меню,
 * и отображает соответствующую секцию страницы.
 * @function
 * @param {HTMLAnchorElement} menuLinkElement
 * @return {void}
 */
export function goToPage(menuLinkElement) {
  const userID = getCookie('user_uuid');
  pageElement.innerHTML = '';

  menu.state.activeMenuLink?.classList.remove('active');
  menuLinkElement.classList.add('active');
  menu.state.activeMenuLink = menuLinkElement;

  const section = menuLinkElement.dataset.section;
  const category = getCategory(section);

  if (config[category] && config[category][section]) {
    config[category][section].render(userID);
  } else {
    console.error(`Cannot find render function for section: ${section}`);
  }
}

/**
 * Возвращает категорию элемента по его секции.
 * @param {string} section - Секция элемента.
 * @return {string|null} Категория элемента.
 */
function getCategory(section) {
  if (config.menu[section]) {
    return 'menu';
  }
  if (config.authElements[section]) {
    return 'authElements';
  }
  if (config.noAuthElements[section]) {
    return 'noAuthElements';
  }
  return null;
}

export function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)',
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

renderMenu();
goToPage(menu.state.menuElements.films);
