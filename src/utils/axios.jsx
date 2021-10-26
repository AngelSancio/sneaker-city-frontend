import axios from 'axios';

import { API_BASE_URL } from '../Environment';

export const API_KEY = API_BASE_URL;

const http = axios.create({
    baseURL: API_KEY
});

export const fetchProducts = () =>
    http.get(`/sneakers/products`);