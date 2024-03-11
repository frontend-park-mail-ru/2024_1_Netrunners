export const IP = 'http://127.0.0.1:8081/';

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
