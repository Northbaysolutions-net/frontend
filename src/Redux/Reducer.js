import * as CONSTANTS from './Constants';

// If multiple components need access to some data, in that case we store such data in redux.
const initialState = {
  cartItems: [],
  showCartDialog: false,
  showMenu: true,
  checkedOutItems: [],
  loggedInUser: null,
  categories: [],
  token: null,
  filterValues: [],
  products: [],
  pageNumber: 1,
  totalPages: 1,
  currentProduct: {},
  totalProducts: null,
  currentUser: null,
  successfulOrderPlacing: false,
  postOrderPopup: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_ITEM_IN_CART: {
      let index = state.cartItems.findIndex(
        item => item.product_id === action.payload.product_id
      );
      if (index !== -1) {
        let cloneCartItems = [...state.cartItems];
        cloneCartItems[index] = {
          ...cloneCartItems[index],
          quantity: state.cartItems[index].quantity + action.payload.quantity
        };
        return { ...state, cartItems: cloneCartItems };
      }
      return { ...state, cartItems: state.cartItems.concat(action.payload) };
    }

    case CONSTANTS.RESET_PAGE_NUMBER: {
      return { ...state, pageNumber: 1 };
    }

    case CONSTANTS.SHOW_CART_DLG:
      return { ...state, showCartDialog: action.payload };

    case CONSTANTS.DELETE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product_id !== action.payload)
      };

    case CONSTANTS.TOGGLE_MENU: {
      return { ...state, showMenu: !state.showMenu };
    }

    case CONSTANTS.SET_LOGGED_IN_USER: {
      return { ...state, loggedInUser: action.payload.name };
    }

    case CONSTANTS.LOGOUT: {
      return {
        ...state,
        loggedInUser: null
      };
    }

    case CONSTANTS.SET_CHECKEDOUT_ITEMS: {
      return { ...state, checkedOutItems: action.payload, cartItems: [] };
    }

    case CONSTANTS.UPDATE_CART_ITEM_QUANTITY: {
      let index = state.cartItems.findIndex(
        item => item.product_id === action.payload.id
      );
      if (index !== -1) {
        let cloneCartItems = [...state.cartItems];
        cloneCartItems[index] = {
          ...cloneCartItems[index],
          quantity: action.payload.quantity
        };
        return { ...state, cartItems: cloneCartItems };
      }
      return { ...state };
    }

    case CONSTANTS.RESET_STORE_AFTER_ORDER: {
      return {
        ...state,
        cartItems: [],
        checkedOutItems: [],
        pageNumber: 1,
        totalPages: 1,
        successfulOrderPlacing: false
      };
    }

    case CONSTANTS.INCREASE_PAGE_NUMBER: {
      if (action.payload.fastPagination) {
        return { ...state, pageNumber: Number(state.totalPages) };
      }
      return { ...state, pageNumber: Number(action.payload.page) + 1 };
    }

    case CONSTANTS.SET_LOGIN_TOKEN: {
      return { ...state, token: action.payload };
    }

    case CONSTANTS.DECREASE_PAGE_NUMBER: {
      if (action.payload.fastPagination) {
        return { ...state, pageNumber: 1 };
      }
      return { ...state, pageNumber: Number(action.payload.page) - 1 };
    }

    case CONSTANTS.POST_ORDER_POPUP: {
      return { ...state, postOrderPopup: action.payload };
    }

    // API Call Reducer Actions
    case CONSTANTS.GET_CONFIGURATIONS_REQUEST: {
      return { ...state };
    }
    case CONSTANTS.GET_CONFIGURATIONS_SUCCESS: {
      return { ...state, filterValues: action.payload.data };
    }
    case CONSTANTS.GET_CONFIGURATIONS_FAILURE: {
      return { ...state };
    }

    case CONSTANTS.GET_ALL_PRODUCTS_REQUEST: {
      return { ...state };
    }
    case CONSTANTS.GET_ALL_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: action.payload.data.data,
        totalPages: action.payload.data.pages,
        totalProducts: action.payload.data.total
      };
    }
    case CONSTANTS.GET_ALL_PRODUCTS_FAILURE: {
      return { ...state };
    }

    case CONSTANTS.GET_PRODUCTS_BY_CATEGORY_REQUEST: {
      return { ...state };
    }
    case CONSTANTS.GET_PRODUCTS_BY_CATEGORY_SUCCESS: {
      let products = action.payload.data.docs;
      products = products.map(element => {
        return element.product;
      });
      return {
        ...state,
        products: products,
        totalPages: action.payload.data.pages,
        totalProducts: action.payload.data.total
      };
    }
    case CONSTANTS.GET_PRODUCTS_BY_CATEGORY_FAILURE: {
      return { ...state };
    }

    case CONSTANTS.GET_USER_INFORMATION_REQUEST: {
      return { ...state };
    }
    case CONSTANTS.GET_USER_INFORMATION_SUCCESS: {
      return { ...state, currentUser: action.payload.data.user };
    }
    case CONSTANTS.GET_USER_INFORMATION_FAILURE: {
      return { ...state };
    }

    case CONSTANTS.UPDATE_USER_INFORMATION_REQUEST: {
      return { ...state };
    }
    case CONSTANTS.UPDATE_USER_INFORMATION_SUCCESS: {
      return { ...state };
    }
    case CONSTANTS.UPDATE_USER_INFORMATION_FAILURE: {
      return { ...state };
    }

    case CONSTANTS.PLACE_ORDER_REQUEST: {
      return { ...state };
    }
    case CONSTANTS.PLACE_ORDER_SUCCESS: {
      return { ...state, successfulOrderPlacing: true, postOrderPopup: true };
    }
    case CONSTANTS.PLACE_ORDER_FAILURE: {
      return { ...state, successfulOrderPlacing: false, postOrderPopup: true };
    }

    case CONSTANTS.GET_ALL_CATEGORIES_REQUEST: {
      return { ...state };
    }
    case CONSTANTS.GET_ALL_CATEGORIES_SUCCESS: {
      const dataForTheMenu = [
        {
          name: 'Product categories',
          id: 1,
          children: action.payload.data.map((x, i) => {
            return {
              name: x.name,
              id: 2 + i,
              category_id: x.category_id,
              url: '/?category=' + x.name,
              icon: x.name
            };
          })
        }
      ];
      return { ...state, categories: dataForTheMenu };
    }
    case CONSTANTS.GET_ALL_CATEGORIES_FAILURE:
      return { ...state, categories: [] };

    default:
      return state;
  }
};

export default rootReducer;
