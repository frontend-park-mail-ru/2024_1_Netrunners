import {fetchRequest, LOCAL_IP} from './fetch.js';

export function getAll() {
  const url = LOCAL_IP + 'films';
  return fetchRequest(url, 'GET');
}
