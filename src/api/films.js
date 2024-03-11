import {fetchRequest, IP} from './fetch.js';

export function getAll() {
  const url = IP + 'films';
  return fetchRequest(url, 'GET');
}
