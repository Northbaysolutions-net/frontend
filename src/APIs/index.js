import axios from 'axios';
import { URL } from '../constants';
import { signIn, allProducts, products, allCategories , order} from '../store/actions/index';

class API {
  getSignIn = object => {
    let url =
      URL +
      'customer/sign_in?email=' +
      object.email +
      '&password=' +
      object.password;
    return axios.get(url).then(res => {
      return {
        type: signIn,
        payload: {
          customer_id: res.data.customer_id,
          token: res.data.token,
          customer: res.data.customer
        }
      };
    });
  };

  getAllProducts = object => {
    let url = URL + 'product';
    if (object) {
      url = url + '?';
      if (object.category_id !== undefined && object.category_id !== 0)
        url = url + 'category=' + object.category_id + '&';
      if (object.size !== undefined && object.size !== 0)
        url = url + 'size=' + object.size + '&';
      if (object.gender !== undefined && object.gender !== 0)
        url = url + 'gender=' + object.gender + '&';
      if (object.color !== undefined && object.color !== 0)
        url = url + 'color=' + object.color + '&';
      if (object.search !== undefined && object.search !== '')
        url = url + 'search=' + object.search + '&';
      if (object.pageNo !== undefined)
        url = url + 'pageNo=' + object.pageNo + '&';
      if (object.order !== undefined) url = url + 'order=' + object.order + '&';
    }

    return axios.get(url).then(res => {
      return {
        type: allProducts,
        payload: { data: res.data }
      };
    });
  };

  getProduct = object => {
    let url = URL + 'product/' + object.id;
    return axios.get(url).then(res => {
      return {
        type: products,
        payload: { data: res.data }
      };
    });
  };

  getAllAttributes = object => {
    let url = URL + 'attribute_value?name=' + object.name;
    return axios.get(url).then(res => {
      return {
        payload: { data: res.data }
      };
    });
  };

  getAllCategories = () => {
    let url = URL + 'Category';
    return axios.get(url).then(res => {
      return {
        type: allCategories,
        payload: { data: res.data }
      };
    });
  };

  postSignUp = object => {
    let url = URL + 'customer/sign_up';
    return axios
      .post(url, {
        name: object.name,
        password: object.password,
        email: object.email
      })
      .then(res => {
        return {
          type: signIn,
          payload: {
            customer_id: res.data.customer_id,
            token: res.data.token,
            customer: res.data.customer
          }
        };
      });
  };

  getTokenStatus = object => {
    let url = URL + 'check_auth';
    let token = `Bearer ${object.token}`;
    return axios
      .post(
        url,
        { customer_id: object.customer_id },
        {
          headers: { authorization: token }
        }
      )
      .then(res => {
        return {
          payload: { status: res.data.success }
        };
      });
  };

  postOrder = object => {
    let url = URL + 'order';

    return axios
      .post(url, {
        customer_address: object.customer_address,
        products: JSON.stringify(object.products),
        totalAmmount: object.totalAmmount,
        customer_id: object.customer_id
      })
      .then(res => {
        return {
          type: order,
          payload: { order_id: res.data.order_id }
        };
      });
  };
}

export default API;
