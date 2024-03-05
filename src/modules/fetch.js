export const fetchRequest = (url, method = 'GET', body = null, headers = {}) => {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    if (body !== null) {
        options.body = JSON.stringify(body);
    }

    return fetch(url, options);
};