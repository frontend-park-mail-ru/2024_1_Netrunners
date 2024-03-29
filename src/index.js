import {Menu} from './components/Menu/Menu.js';
import * as authApi from './api/auth.js';
import {renderFilms} from './components/Films/films.js';
import {renderLogin} from './components/Login/login.js';
import {renderSignup} from './components/Signup/signup.js';
import {renderProfile} from './components/Profile/profile.js';
import {renderLogout} from './components/Logout/logout.js';


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
export function renderMenu() {
  menu.render();
  menuElement.addEventListener('click', (e) => {
    const {target} = e;

    if (target.tagName.toLowerCase() === 'a') {
      e.preventDefault();
      goToPage(target);
    }
  });
  authApi.check()
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
      })
      .then((response) => {
        const isAuthorized = response.status === 200;
        menu.renderAuth(isAuthorized);
      })
      .catch(function(error) {
        console.error('Произошла ошибка:', error.message);
      });
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
  pageElement.innerHTML = '';

  menu.state.activeMenuLink?.classList.remove('active');
  menuLinkElement.classList.add('active');
  menu.state.activeMenuLink = menuLinkElement;

  const section = menuLinkElement.dataset.section;
  const category = getCategory(section);

  if (config[category] && config[category][section]) {
    config[category][section].render();
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

renderMenu();
goToPage(menu.state.menuElements.films);
