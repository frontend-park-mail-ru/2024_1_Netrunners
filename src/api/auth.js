import {fetchRequest, LOCAL_IP} from './fetch.js';

export function check() {
  const url = LOCAL_IP + 'auth/check';
  return fetchRequest(url, 'POST');
}

export function login(user) {
  const url = LOCAL_IP + 'auth/login';
  return fetchRequest(url, 'POST', user);
}

export function signup(user) {
  const url = LOCAL_IP + 'auth/signup';
  return fetchRequest(url, 'POST', user);
}

export function logout() {
  const url = LOCAL_IP + 'auth/logout';
  return fetchRequest(url, 'POST');
}
