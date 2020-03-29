// Simulate authentication service
import axios from 'axios';
import { API_LOGIN, API_SIGNUP } from './constants';

const Auth = {
  _isAuthenticated: false,

  authenticate(name, pass, cb) {
    const basicAuth = 'Basic ' + btoa(name + ':' + pass);
    const config = {
      headers: {
        Authorization: basicAuth
      }
    };
    axios
      .post(API_LOGIN, {}, config)
      .then(response => {
        console.log(response);
        this._isAuthenticated = true;
        cb({
          name: { name, customer_id: response.data.customer_id },
          token: response.data.token
        });
      })
      .catch(error => {
        console.log(error);
        cb({
          name: false
        });
      });
  },

  signup(obj, cb) {
    const object = {
      name: obj.name,
      email: obj.email,
      password: obj.pass
    };
    axios
      .post(API_SIGNUP, object)
      .then(response => {
        console.log(response);
        this._isAuthenticated = true;
        cb({
          name: { name: obj.name, customer_id: response.data.customer_id },
          token: response.data.token
        });
      })
      .catch(error => {
        console.log(error.response);
        cb({
          name: false,
          message: error.response.data.message
        });
      });
  },

  signout(cb) {
    this._isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export default Auth;
