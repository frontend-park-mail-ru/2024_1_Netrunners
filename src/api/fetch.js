export const IP = 'http://127.0.0.1:8081/';


/**
 * @function
 * @param {string} url - URL запроса
 * @param {string} method - метод запроса
 * @param {Object} body - тело запроса (при наличии)
 * @param {Object} headers - Заголовки запроса (при наличии)
 * @return {Promise} promise - Объект запроса
 */
export const fetchRequest = async (url, method = 'GET', body = null, headers = {}) => {
  try {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials: 'include',
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
};
