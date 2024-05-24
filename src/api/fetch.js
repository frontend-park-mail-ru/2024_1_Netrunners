export const IP = "https://netrunnerflix.ru/api";
// export const IP = "http://127.0.0.1:8081";

/**
 * @function
 * @param {string} url - URL запроса
 * @param {string} method - метод запроса
 * @param {Object} body - тело запроса (при наличии)
 * @param {Object} headers - Заголовки запроса (при наличии)
 * @param {string} contentType - Формат данных
 * @param {string} mode
 * @return {Promise} promise - Объект запроса
 */
export const fetchRequest = async (
  url,
  method = "GET",
  body = null,
  headers = {},
  contentType = null,
  mode,
) => {
  try {
    const options = {
      method: method,
      headers: {
        ...headers,
      },
      mode: mode ? mode : "cors",
      credentials: "include",
    };
    if (body instanceof FormData || contentType === "multipart/form-data") {
      options.body = body;
    } else if (body !== null) {
      options.headers["Content-type"] = contentType;
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
};
