import axios from "axios";
const URL = process.env.REACT_APP_URL;

const Services = {
  login: payload => {
    return axios
      .post(`${URL}/login`, payload)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("currentUser", JSON.stringify(res.data.data));
        localStorage.setItem("Authenticated", true);
        return {
          data: res.data
        };
      })
      .catch(error => {
        throw error.response.data;
      });
  },

  signUp: payload => {
    return axios
      .post(`${URL}/signup`, payload)
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        throw error.response.data;
      });
  },

  getAllItems: payload => {
    var token = localStorage.getItem("token");
    console.log(payload);
    return axios
      .get(`${URL}/allItems${payload.params}`, {
        headers: { authorization: token }
      })
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        throw error.response.data;
      });
  },

  getItem: payload => {
    var token = localStorage.getItem("token");
    console.log(token);
    return axios
      .get(`${URL}/items/${payload}`, {
        headers: { authorization: token }
      })
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        throw error.response.data;
      });
  },

  addToCart: payload => {
    var token = localStorage.getItem("token");
    return axios
      .post(`${URL}/carts/addToCart`, payload, {
        headers: { authorization: token }
      })
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        throw error.response.data;
      });
  },

  getCart: payload => {
    console.log("get cart service");
    var token = localStorage.getItem("token");
    return axios
      .get(`${URL}/carts/${payload}`, {
        headers: { authorization: token }
      })
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        throw error.response.data;
      });
  },

  removeFromCart: payload => {
    var token = localStorage.getItem("token");
    console.log(token);
    return axios
      .delete(`${URL}/carts/deleteCartsItem`, {
        headers: { authorization: token },
        data: {
          payload: payload
        }
      })
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        throw error.response.data;
      });
  },

  emptyCart: payload => {
    var token = localStorage.getItem("token");
    console.log(token);
    return axios
      .delete(`${URL}/carts/emptyCart`, {
        headers: { authorization: token },
        data: {
          cart_id: payload
        }
      })
      .then(res => {
        return {
          data: res.data
        };
      })
      .catch(error => {
        throw error.response.data;
      });
  }
};

export default Services;
