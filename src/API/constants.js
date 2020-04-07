const host = 'http://127.0.0.1:5000';

export const LOGIN_ENDPOINT = `${host}/auth/login`;
export const SIGNUP_ENDPOINT = `${host}/auth/signup`;
export const PRODUCT_ENDPOINT = `${host}/products/get`;
export const PRODUCTS_SEARCH_ENDPOINT = `${host}/products/search`;
export const PRODUCTS_BY_CATEGORY_ENDPOINT = `${PRODUCT_ENDPOINT}/category`;
export const PRODUCT_IMAGE_ENDPOINT = 'http://127.0.0.1:4000';
