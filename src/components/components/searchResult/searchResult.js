import templateSearchActorResult from "./searchResultTemplates/searchActorResult.hbs";
import templateSearchFilmResult from "./searchResultTemplates/searchFilmResult.hbs";
import templateSearchSerialResult from "./searchResultTemplates/searchSerialResult.hbs";
import templateSearchResultBLock from "./searchResultBlock.hbs";
import { pagesListElement } from "../pagesList/pagesList";
import Router from "../../../utils/router";
import * as searchApi from "../../../api/search.js";

const initialState = {
  page: 1,
  findBy: "films",
  string: "",
};

/**
 * Рендерит блок с результатом поиска на указанном родительском элементе.
 * @param {HTMLElement} parent - Родительский элемент, на котором будет отображен результат поиска.
 * @param {Object} params - Объект с параметрами поиска.
 * @param {number} params.page - Номер страницы.
 * @param {string} params.findby - Поле, по которому производится поиск.
 * @param {string} params.string - Строка для поиска.
 */
export async function renderSearchResult(parent, params) {
  if (!params) {
    params = initialState;
  }

  const [searchResult] = await Promise.all([searchApi.searchRequest(params)]);

  if (!searchResult.films && !searchResult.actors) {
    parent.innerText = "Ничего не найдено";
    return;
  }

  parent.innerHTML = templateSearchResultBLock();

  switch (params.findBy) {
    case "films":
      renderSearchList(
        parent.firstChild,
        searchResult.films,
        templateSearchFilmResult,
      );
      break;
    case "actors":
      renderSearchList(
        parent.firstChild,
        searchResult.actors,
        templateSearchActorResult,
      );
      break;
    case "serials":
      renderSearchList(
        parent.firstChild,
        searchResult.serials,
        templateSearchSerialResult,
      );
      break;
  }

  //TODO ждет реализации поля кол-ва запросов на беке
  //parent.lastChild.innerHTML = pagesListElement(params.page, searchResult[count]);

  const pagesBlock = parent.querySelector(".pages-block");
  pagesBlock.innerHTML = pagesListElement(params.page, 1);
  const pageButtons = pagesBlock.querySelectorAll(
    ".pages-list__simple-button:not([class*=''])",
  );
  const leftPageButtons = pagesBlock.querySelectorAll(
    ".pages-list__simple-button.left",
  );
  const rightPageButtons = pagesBlock.querySelectorAll(
    ".pages-list__simple-button.right",
  );
  const pageRelativelyIndex = [-2, -1, 0, 1, 2];

  pageButtons.forEach((button, index) => {
    if (button.innerText == params.page) {
      button.classList.add("active");
    }
    const newParams = Object.assign({}, params);
    if (params.page - 3 <= 0) {
      newParams.page = 1 + index;
    }
    //to-do else if(params.page +2 >= searchResult.count){
    else if (params.page + 2 >= 5) {
      newParams.page = searchResult.count - 4 + index;
    } else {
      newParams.page = newParams.page + pageRelativelyIndex[index];
    }
    button.addEventListener("click", () => {
      renderSearchResult(parent, newParams);
    });
  });

  if (params.page === 1) {
    leftPageButtons.forEach((button) => {
      button.classList.add("inactive");
    });
  } else {
    leftPageButtons[0].addEventListener("click", () => {
      const newParams = Object.assign({}, params);
      newParams.page = 1;
      renderSearchResult(parent, newParams);
    });

    leftPageButtons[1].addEventListener("click", () => {
      const newParams = Object.assign({}, params);
      newParams.page = newParams.page - 1;
      renderSearchResult(parent, newParams);
    });
  }

  //TODO ждет реализации поля кол-ва запросов на беке
  //if (params.page === searchResult.count){

  if (params.page === 1) {
    rightPageButtons.forEach((button) => {
      button.classList.add("inactive");
    });
  } else {
    rightPageButtons[0].addEventListener("click", () => {
      const newParams = Object.assign({}, params);
      newParams.page = newParams.page + 1;
      renderSearchResult(parent, newParams);
    });
    rightPageButtons[1].addEventListener("click", () => {
      const newParams = Object.assign({}, params);
      newParams.page = searchResult[count];
      renderSearchResult(parent, newParams);
    });
  }
}

/**
 * Рендерит список элементов на указанном родительском элементе с использованием заданного шаблона.
 * @param {HTMLElement} parent - Родительский элемент, на котором будет отображен список.
 * @param {Array} items - Элементы для отображения в списке.
 * @param {Function} itemTemplate - Функция-шаблон для формирования HTML элемента списка на основе данных элементов.
 */
export function renderSearchList(parent, items, itemTemplate) {
  items.forEach((element) => {
    const filmElement = itemTemplate(element);
    parent.insertAdjacentHTML("beforeend", filmElement);
  });
  const searchItems = parent.querySelectorAll(".search-item-block");
  let goToFunction;
  if (items[0].hasOwnProperty("isSerial")) {
    goToFunction = Router.goToFilmPage;
  } else {
    goToFunction = Router.goToActorPage;
  }
  searchItems.forEach((element) => {
    element.addEventListener("click", () => {
      goToFunction(element.dataset.elementId, element.dataset.elementTitle);
    });
  });
}
