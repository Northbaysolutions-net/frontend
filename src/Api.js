import axios from 'axios';
import {
  API_GET_CATEGORIES,
  API_CONFIGURATIONS,
  API_GET_ALL_PRODUCTS,
  API_GET_PRODUCT_BY_ID,
  API_GET_PRODUCTS_BY_CATEGORY,
  API_UPDATE_USER_INFORMATION,
  API_GET_USER_INFORMATION,
  API_PLACE_ORDER
} from './constants';

class Api {

  getAllCategories() {
    return axios
      .get(API_GET_CATEGORIES)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject({
          error: 'Error Fetching Categories',
          status: error.response.status
        });
      });
  }

  getConfigurations() {
    return axios
      .get(API_CONFIGURATIONS)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject({
          error: 'Error Fetching Configurations',
          status: error.response.status
        });
      });
  }

  getAllProducts(payload) {
    if (!payload.search) {
      payload.search = '';
    }
    console.log(payload);
    return axios
      .get(
        `${API_GET_ALL_PRODUCTS}?page=${payload.page}&sort=${payload.sort}&search=${payload.search}`
      )
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject({
          error: error,
          status: error.response.status
        });
      });
  }

  getProductById(payload) {
    return axios
      .get(`${API_GET_PRODUCT_BY_ID}/${payload.id}`)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject({
          error: 'Error Fetching Product Details',
          status: error.response.status
        });
      });
  }

  getProductsByCategory(payload) {
    return axios
      .get(
        `${API_GET_PRODUCTS_BY_CATEGORY}/${payload.category_id}?page=${payload.page}&sort=${payload.sort}&`
      )
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject({
          error: 'Error Fetching Products by Category',
          status: error.response.status
        });
      });
  }

  updateUserInformation(payload) {
    let config = {
      headers: {
        Authorization: `Bearer ${payload.token}`
      }
    };
    return axios
      .put(API_UPDATE_USER_INFORMATION, payload.object, config)
      .then(response => {
        console.log(response);
        return Promise.resolve(response);
      })
      .catch(error => {
        console.log(error.response);
        return Promise.reject({
          error: 'Error Updating User Information',
          status: error.response.status
        });
      });
  }

  placeOrder(payload) {
    let config = {
      headers: {
        Authorization: `Bearer ${payload.token}`
      }
    };
    return axios
      .post(API_PLACE_ORDER, payload.object, config)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject({
          error: 'Error Placing Order',
          status: error.response.status
        });
      });
  }

  getUserInformation(payload) {
    let config = {
      headers: {
        Authorization: `Bearer ${payload.token}`
      }
    };
    return axios
      .get(`${API_GET_USER_INFORMATION}/${payload.name}`, config)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject({
          error: 'Error Fetching User Information',
          status: error.response.status
        });
      });
  }
}

export default new Api();
