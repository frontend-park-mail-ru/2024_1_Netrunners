import templatePagesList from "./pagesList.hbs";

/**
 * Генерирует список страниц с учетом текущей страницы и максимальной страницы.
 * @param {number} currentPage - Текущая страница.
 * @param {number} maxPage - Максимальное количество страниц.
 * @return {HTMLElement} - Созданный список страниц.
 */
export function pagesListElement(currentPage, maxPage) {
  if (maxPage < 5) {
    const arrayOfPages = Array.from(
      { length: maxPage },
      (_, index) => index + 1,
    );
    return templatePagesList({ pages: arrayOfPages });
  }
  if (currentPage + 2 >= maxPage) {
    return templatePagesList({
      pages: [maxPage - 4, maxPage - 3, maxPage - 2, maxPage - 1, maxPage],
    });
  }
  if (currentPage - 3 <= 0) {
    return templatePagesList({ pages: [1, 2, 3, 4, 5] });
  }
  return templatePagesList({
    pages: [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ],
  });
}
