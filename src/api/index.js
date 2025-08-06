import axios from 'axios';
import { config } from '../config';

export function retrieveShows(search = '') {
    return axios.get('/shows', { baseURL: config.apiUrl, params: { search } }).then(({data}) => data)
}
