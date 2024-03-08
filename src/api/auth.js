import { fetchRequest } from './fetch.js';

const localIP = 'http://127.0.0.1:8081/';
const globalIP = 'http://94.139.247.246:8081/'

export function check() {
    const url = localIP + 'auth/check';
    return fetchRequest(url, 'POST');
}

export function login(user) {
    const url = localIP + 'auth/login';
    return fetchRequest(url, 'POST', user);
}

export function signup(user) {
    const url = localIP + 'auth/signup';
    return fetchRequest(url, 'POST', user);
}

export function logout() {
    const url = localIP + 'auth/logout';
    return fetchRequest(url, 'POST');
}
