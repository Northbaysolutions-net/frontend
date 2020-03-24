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
    console.log("**************************");
    var token = localStorage.getItem("token");
    return axios
      .get(`${URL}/items${payload.itemParams.params}`, {
        headers: { authorization: token }
      })
      .then(res => {
        console.log(res.data);
        return {
          data: res.data
        };
      })
      .catch(error => {
        throw error.response.data;
      });
  },

  getItem: payload => {
    console.log("##########################");
    var token = localStorage.getItem("token");
    console.log(payload);
    return axios
      .get(`${URL}/items/${payload.params}`, {
        headers: { authorization: token }
      })
      .then(res => {
        console.log(res.data);
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
