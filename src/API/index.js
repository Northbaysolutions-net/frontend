import axios from 'axios';
import {
  LOGIN_ENDPOINT,
  SIGNUP_ENDPOINT,
  PRODUCT_ENDPOINT,
  PRODUCTS_BY_CATEGORY_ENDPOINT,
  PRODUCTS_SEARCH_ENDPOINT,
} from './constants';

const API = {
  signup: (request) => {
    return axios
      .post(SIGNUP_ENDPOINT, request)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject({
          message: 'ERROR - Unable to sign up',
          error,
        });
      });
  },
  login: (request) => {
    return axios
      .post(LOGIN_ENDPOINT, request)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject({
          message: 'ERROR - Unable to log in',
          error,
        });
      });
  },
  getProductById: (productId) => {
    return axios
      .get(`${PRODUCT_ENDPOINT}/${productId}`)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject({
          message: 'ERROR - Unable to fetch product',
          error,
        });
      });
  },
  getAllProducts: (data) => {
    let endpoint = PRODUCT_ENDPOINT;
    if (data.page) {
      endpoint = `${endpoint}?page=${data.page}`;
    } else {
      endpoint = `${endpoint}?page=1`;
    }
    if (data.gender) {
      endpoint = `${endpoint}&gender=${gender}`;
    }
    if (data.size) {
      endpoint = `${endpoint}&size=${size}`;
    }
    if (data.color) {
      endpoint = `${endpoint}&color=${color}`;
    }
    if (data.sort) {
      endpoint = `${endpoint}&sort=${sort}`;
    }

    return axios
      .get(endpoint)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  getProductsByCategory: (data) => {
    let endpoint = `${PRODUCTS_BY_CATEGORY_ENDPOINT}/${data.categoryId}`;
    if (data.page) {
      endpoint = `${endpoint}?page=${data.page}`;
    } else {
      endpoint = `${endpoint}?page=1`;
    }
    if (data.gender) {
      endpoint = `${endpoint}&gender=${gender}`;
    }
    if (data.size) {
      endpoint = `${endpoint}&size=${size}`;
    }
    if (data.color) {
      endpoint = `${endpoint}&color=${color}`;
    }
    if (data.sort) {
      endpoint = `${endpoint}&sort=${sort}`;
    }

    return axios
      .get(endpoint)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  initialLandingView: () => {
    return axios.get(INITIAL_LANDING_VIEW_ENDPOINT)
    .then((response) => {
      return Promise.resolve(response)
      .catch((error) => {
        return Promise.reject(error);
      });
    });
  },
  searchProducts: (searchString) => {
    return axios
      .get(`${PRODUCTS_SEARCH_ENDPOINT}?byName=${searchString}`)
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
};

export default API;
