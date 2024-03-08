import { fetchRequest } from './fetch.js';

const localIP = 'http://127.0.0.1:8081/';
const globalIP = 'http://94.139.247.246:8081/'

export function getAll() {
    const url = localIP + 'films';
    return fetchRequest(url, 'GET');
}