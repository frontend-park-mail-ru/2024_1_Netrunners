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
   * Рендерит шаблон меню и вставляет его в родительский элемент.
   * @private
   * @method
   * @return {void}
   */
  renderTemplate() {
    const template = Handlebars.templates['Menu.hbs'];
    const items = this.items.map(([key, {href, text}], index) => {
      let className = 'menu-item';
      if (!index) {
        className += ' active';
      }
      return {key, href, text, className};
    });
    this.#parent.innerHTML = template({items});
    this.#parent.querySelectorAll('a').forEach((element) => {
      this.state.menuElements[element.dataset.section] = element;
    });
  }
}
