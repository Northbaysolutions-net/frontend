import { sagaFormatHandler } from '../saga/sagaActionHelpers';
import * as CONSTANTS from './Constants';

export const addItemInCart = item => ({
  type: CONSTANTS.ADD_ITEM_IN_CART,
  payload: item
});
export const showCartDlg = status => ({
  type: CONSTANTS.SHOW_CART_DLG,
  payload: status
});
export const postOrderPopup = status => ({
  type: CONSTANTS.POST_ORDER_POPUP,
  payload: status
});
export const deleteCartItem = id => ({
  type: CONSTANTS.DELETE_CART_ITEM,
  payload: id
});
export const toggleMenu = () => ({
  type: CONSTANTS.TOGGLE_MENU,
  payload: null
});
export const updateCartItemQnt = obj => ({
  type: CONSTANTS.UPDATE_CART_ITEM_QUANTITY,
  payload: obj
});
export const setCheckedOutItems = items => ({
  type: CONSTANTS.SET_CHECKEDOUT_ITEMS,
  payload: items
});
export const setLoggedInUser = user => ({
  type: CONSTANTS.SET_LOGGED_IN_USER,
  payload: user
});
export const logout = () => ({
  type: CONSTANTS.LOGOUT
});
export const setLoginToken = token => ({
  type: CONSTANTS.SET_LOGIN_TOKEN,
  payload: token
});
export const increasePageNumber = page => ({
  type: CONSTANTS.INCREASE_PAGE_NUMBER,
  payload: page
});
export const decreasePageNumber = page => ({
  type: CONSTANTS.DECREASE_PAGE_NUMBER,
  payload: page
});
export const resetPageNumber = () => ({
  type: CONSTANTS.RESET_PAGE_NUMBER
});
export const resetStoreAfterOrder = () => ({
  type: CONSTANTS.RESET_STORE_AFTER_ORDER
});

export const getAllCategories = sagaFormatHandler('GET_ALL_CATEGORIES');
export const getConfigurations = sagaFormatHandler('GET_CONFIGURATIONS');
export const getAllProducts = sagaFormatHandler('GET_ALL_PRODUCTS');
export const getProductById = sagaFormatHandler('GET_PRODUCT_BY_ID');
export const getProductsByCategory = sagaFormatHandler(
  'GET_PRODUCTS_BY_CATEGORY'
);
export const getUserInformation = sagaFormatHandler('GET_USER_INFORMATION');
export const updateUserInformation = sagaFormatHandler(
  'UPDATE_USER_INFORMATION'
);
export const placeOrder = sagaFormatHandler('PLACE_ORDER');
