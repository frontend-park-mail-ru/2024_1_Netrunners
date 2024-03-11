export const IP = 'http://94.139.247.246:8081/';


/**
 * @function
 * @param {string} url - URL запроса
 * @param {string} method - метод запроса
 * @param {Object} body - тело запроса (при наличии)
 * @param {Object} headers - Заголовки запроса (при наличии)
 * @return {Promise} promise - Объект запроса
 */
export const fetchRequest = (url, method = 'GET', body = null, headers = {})=>{
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

  return fetch(url, options);
};
