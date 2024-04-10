import {createLink} from '../../utils/createLinks.js';
import {menuTemplate} from './Menu.hbs.js';
import {getProfilePreview} from '../../api/profile.js';
import {getCookie} from '../../index.js';

/**
 * Класс, представляющий меню на веб-странице.
 * @class
 */
export class Menu {
  #parent;
  #config;

  /**
   * Создает экземпляр класса Menu.
   * @constructor
   * @param {HTMLElement} parent - Родительский элемент,
   * в котором будет отображаться меню.
   * @param {Object} config - Конфигурация меню,
   * содержащая информацию о пунктах меню.
   */
  constructor(parent, config) {
    this.#parent = parent;
    this.#config = config;

    this.state = {
      activeMenuLink: null,
      menuElements: {},
    };
  }

  /**
   * Возвращает конфигурацию меню.
   * @type {Object}
   */
  get config() {
    return this.#config;
  }

  /**
   * Рендерит меню, используя предоставленный шаблон.
   * @method
   * @return {void}
   */
  render() {
    this.renderTemplate();
  }

  /**
   * Возвращает массив пунктов меню в формате [ключ, значение].
   * @type {Array}
   */
  get items() {
    return Object.entries(this.config.menu);
  }

  /**
   * Возвращает массив элементов аутентификации.
   * @type {Array}
   */
  get authItems() {
    return Object.entries(this.config.authElements);
  }

  /**
   * Возвращает массив элементов без аутентификации.
   * @type {Array}
   */
  get noAuthItems() {
    return Object.entries(this.config.noAuthElements);
  }

  /**
   * Рендерит элементы аутентификации в зависимости от статуса авторизации.
   * @param {boolean} isAuthorized - Флаг, указывающий, авторизован ли юзер.
   */
  async renderAuth(isAuthorized) {
    const authBlock = document.getElementById('auth');
    authBlock.innerHTML = '';
    authBlock.className = '';
    if (!isAuthorized) {
      authBlock.classList.add('no-auth-elements');
      this.noAuthItems.forEach(([key, {href, text}]) => {
        const menuItem = createLink({
          href,
          text,
          key,
          classNames: 'auth-item',
        });
        authBlock.appendChild(menuItem);
      });
    } else {
      authBlock.classList.add('auth-elements');
      const avatar = document.createElement('img');
      avatar.src = await getProfilePreview(getCookie('user_uuid'));
      avatar.alt = 'Avatar';
      avatar.classList.add('avatar');
      authBlock.appendChild(avatar);

      const dropdown = document.createElement('div');
      const dropdownIcon = document.createElement('img');
      dropdownIcon.src = '../../img/icons/dropdown.svg';
      dropdownIcon.alt = 'Dropdown';
      dropdown.classList.add('dropdown');
      dropdown.appendChild(dropdownIcon);

      const dropdownContent = document.createElement('div');
      dropdownContent.classList.add('dropdown-content');

      this.authItems.forEach(([key, {href, text}]) => {
        const menuItem = createLink({
          href,
          text,
          key,
          classNames: 'auth-item',
        });
        authBlock.appendChild(menuItem);
        dropdownContent.appendChild(menuItem);
      });
      dropdown.appendChild(dropdownContent);
      authBlock.appendChild(dropdown);
    }
  }

  /**
   * Рендерит шаблон меню и вставляет его в родительский элемент.
   * @private
   * @method
   * @return {void}
   */
  renderTemplate() {
    const template = Handlebars.compile(menuTemplate);
    const items = this.items.map(([key, {href, text}], index) => {
      const className = 'menu-item';
      return {key, href, text, className};
    });
    this.#parent.innerHTML = template({items});
    this.#parent.querySelectorAll('a').forEach((element) => {
      this.state.menuElements[element.dataset.section] = element;
    });
  }
}
