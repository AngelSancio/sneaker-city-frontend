import axios from 'axios';

import { API_BASE_URL } from '../Environment';

export const API_KEY = API_BASE_URL;

const http = axios.create({
    baseURL: API_KEY
});

export const fetchProducts = () =>
    http.get(`/products`);

export const fetchProduct = (productId) =>
    http.get(`/products/${productId}`);

export const fetchCart = () =>
    http.get(`/cart`);

export const addProductToCart = (options) =>
    http.post(`/cart/`, options);

export const updateProductInCart = (options) =>
    http.put(`/cart/`, options);

export const deleteProductFromCart = (productId) =>
    http.delete(`/cart/product/`, { data: {productId} });

export const deleteCart = () =>
    http.delete(`/cart/`);