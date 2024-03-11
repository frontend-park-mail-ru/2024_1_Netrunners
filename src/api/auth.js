import {fetchRequest, IP} from './fetch.js';

export function check() {
  const url = IP + 'auth/check';
  return fetchRequest(url, 'POST');
}

export function login(user) {
  const url = IP + 'auth/login';
  return fetchRequest(url, 'POST', user);
}

export function signup(user) {
  const url = IP + 'auth/signup';
  return fetchRequest(url, 'POST', user);
}

export function logout() {
  const url = IP + 'auth/logout';
  return fetchRequest(url, 'POST');
}
