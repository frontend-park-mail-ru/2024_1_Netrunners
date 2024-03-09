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
