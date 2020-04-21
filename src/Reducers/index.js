import * as types from "../utils/constants";

const initialState = {
  items: [],
  item: {},
  user: {},
  cart: {},
  item_result:{},
  error: {},
  register_user: {}
};

const reducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return state;
    case types.LOGIN_REQUEST_SUCCESS: {
      return { ...state, user: action.payload };
    }
    case types.LOGIN_REQUEST_FAILURE: {
      return { ...state, user: action.payload };
    }

    case types.SIGNUP_REQUEST:
      return state;
    case types.SIGNUP_REQUEST_SUCCESS: {
      return { ...state, register_user: action.payload };
    }
    case types.SIGNUP_REQUEST_FAILURE: {
      return { ...state, register_user: action.payload };
    }

    case types.GET_ITEMS_REQUEST:
      return state;
    case types.GET_ITEMS_SUCCESS: {
      return { ...state, items: action.payload };
    }
    case types.GET_ITEMS_FAILURE: {
      return { ...state, items: action.payload };
    }

    case types.GET_ITEM_DETAIL_REQUEST:
      return state;
    case types.GET_ITEM_DETAILS_SUCCESS: {
      return { ...state, item: action.payload };
    }
    case types.GET_ITEM_DETAIL_FAILURE: {
      return { ...state, item: action.payload };
    }

    case types.ADD_TO_CART_REQUEST:
      return state;
    case types.ADD_TO_CART_SUCCESS: {
      return { ...state, item_result: action.payload };
    }
    case types.ADD_TO_CART_FAILURE: {
      return { ...state, item_result: action.payload };
    }

    case types.GET_CART_REQUEST:
      return state;
    case types.GET_CART_SUCCESS: {
      return { ...state, cart: action.payload };
    }
    case types.GET_CART_FAILURE: {
      return { ...state, cart: action.payload };
    }

    case types.REMOVE_FROM_CART_REQUEST:
      return state;
    case types.REMOVE_FROM_CART_SUCCESS: {
      return { ...state, item_result: action.payload };
    }
    case types.REMOVE_FROM_CART_FAILURE: {
      return { ...state, item_result: action.payload };
    }

    case types.EMPTY_CART_REQUEST:
      return state;
    case types.EMPTY_CART_SUCCESS: {
      return { ...state, item_result: action.payload };
    }
    case types.EMPTY_CART_FAILURE: {
      return { ...state, item_result: action.payload };
    }

    case types.RESET_ITEMS:
      return { ...state, items: [], item: {} };

    default:
      return state;
  }
};

export default reducer;
