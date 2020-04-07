import { SEARCH_PRODUCTS_FAILURE } from './action-types';

const intialState = {
  categories: [],
  attributes: [],
  attribute_values: [],
  products: [],
  error: '',
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case INITIAL_LANDING_VIEW_SUCCESS:
      return {
        ...state,
        products: action.response.products,
        categories: action.response.categories,
        attributes: action.response.attributes,
        attribute_values: action.response.attribute_values,
      };
    case INITIAL_LANDING_VIEW_FAILURE:
      return { ...state, error: action.error };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.products };
    case GET_PRODUCTS_FAILURE:
      return { ...state, error: action.error };
    case GET_PRODUCTS_BY_CATEGORY_SUCCESS:
      return { ...state, products: action.products };
    case GET_PRODUCTS_BY_CATEGORY_FAILURE:
      return { ...state, error: action.error };
    case SEARCH_PRODUCTS_SUCCESS:
      return { ...state, products: action.products };
    case SEARCH_PRODUCTS_FAILURE:
      return { ...state, error: action.error };
    default:
      return { ...state };
  }
};

export default reducer;
