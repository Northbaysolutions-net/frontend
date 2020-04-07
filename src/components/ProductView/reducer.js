import {
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  DISPATCH_QUANTITY,
  ADD_ITEM_TO_CART,
  ADD_ITEM_FALSE,
  DISPATCH_SIZE,
  DISPATCH_COLOR,
} from './action-types';

const initialState = {
  quantity: 1,
  size: null,
  color: null,
  product: null,
  productQty: 0,
  addItem: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        product: action.product,
        quantity: 1,
        itemLoading: false,
      };
    case GET_PRODUCT_BY_ID_FAILURE:
      return { ...state, error: action.error };
    case DISPATCH_QUANTITY:
      return { ...state, quantity: action.quantity };
    case DISPATCH_COLOR:
      return { ...state, color: action.color };
    case DISPATCH_SIZE:
      return { ...state, size: action.size };
    case ADD_ITEM_TO_CART: {
      return {
        ...state,
        product: action.product,
        productQty: state.productQty + action.product.quantity,
        size: action.product.size,
        color: action.product.color,
        addItem: true,
      };
    }
    case ADD_ITEM_FALSE:
      return { ...state, addItem: false };

    default:
      return { ...state };
  }
};

export default reducer;
