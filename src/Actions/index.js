import * as types from "../utils/constants";

export const loginRequest = payload => ({
  type: types.LOGIN_REQUEST,
  payload: payload
});

export const loginFailure = error => ({
  type: types.LOGIN_REQUEST_FAILURE,
  payload: error
});

export const signUpRequest = payload => ({
  type: types.SIGNUP_REQUEST,
  payload: payload
});

export const signUpFailure = error => ({
  type: types.SIGNUP_REQUEST_FAILURE,
  payload: error
});

export const getUserDetailsRequest = payload => ({
  type: types.GET_USER_DETAIL_REQUEST,
  payload: payload
});

export const getUserDetailsFailure = error => ({
  type: types.GET_USER_DETAILS_FAILURE,
  payload: error
});

export const getItemsRequest = payload => ({
  type: types.GET_ITEMS_REQUEST,
  payload: payload
});

export const getItemsFailure = error => ({
  type: types.GET_ITEMS_FAILURE,
  payload: error
});

export const getItemDetailRequest = payload => ({
  type: types.GET_ITEM_DETAIL_REQUEST,
  payload: payload
});

export const getItemDetailFailure = error => ({
  type: types.GET_ITEM_DETAIL_FAILURE,
  payload: error
});

export const resetItems = () => ({ type: types.RESET_ITEMS });

export const addToCartRequest = payload => ({
  type: types.ADD_TO_CART_REQUEST,
  payload: payload
});

export const addToCartFailure = error => ({
  type: types.ADD_TO_CART_FAILURE,
  payload: error
});

export const getCartRequest = payload => ({
  type: types.GET_CART_REQUEST,
  payload: payload
});

export const getCartFailure = error => ({
  type: types.GET_CART_FAILURE,
  payload: error
});

export const removeFromCartRequest = payload => ({
  type: types.REMOVE_FROM_CART_REQUEST,
  payload: payload
});

export const removeFromCartFailure = error => ({
  type: types.REMOVE_FROM_CART_FAILURE,
  payload: error
});

export const emptyCartRequest = payload => ({
  type: types.EMPTY_CART_REQUEST,
  payload: payload
});

export const emptyCartFailure = error => ({
  type: types.EMPTY_CART_FAILURE,
  payload: error
});
