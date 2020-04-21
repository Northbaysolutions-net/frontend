import { takeEvery, all, put, call } from "redux-saga/effects";
import * as types from "../utils/constants";
import Services from "../Services";

export function* loginSaga(payload) {
  try {
    const { data } = yield call(Services.login, payload.payload);
    yield put({ type: types.LOGIN_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.LOGIN_REQUEST_FAILURE, payload: error });
  }
}

export function* signUpSaga(payload) {
  try {
    const { data } = yield call(Services.signUp, payload.payload);
    yield put({ type: types.SIGNUP_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.SIGNUP_REQUEST_FAILURE, payload: error });
  }
}

export function* getAllItemsSaga(payload) {
  try {
    const { data } = yield call(Services.getAllItems, payload.payload);
    yield put({ type: types.GET_ITEMS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_ITEMS_FAILURE, payload: error });
  }
}

export function* getItemSaga(payload) {
  try {
    const { data } = yield call(Services.getItem, payload.payload);
    yield put({ type: types.GET_ITEM_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_ITEM_DETAIL_FAILURE, payload: error });
  }
}

export function* addToCartSaga(payload) {
  try {
    const { data } = yield call(Services.addToCart, payload.payload);
    yield put({ type: types.ADD_TO_CART_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.ADD_TO_CART_FAILURE, payload: error });
  }
}

export function* getCartSaga(payload) {
  try {
    const { data } = yield call(Services.getCart, payload.payload);
    yield put({ type: types.GET_CART_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_CART_FAILURE, payload: error });
  }
}

export function* removeFromCartSaga(payload) {
  try {
    const { data } = yield call(Services.removeFromCart, payload.payload);
    yield put({ type: types.REMOVE_FROM_CART_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.REMOVE_FROM_CART_FAILURE, payload: error });
  }
}

export function* emptyCartSaga(payload) {
  try {
    const { data } = yield call(Services.emptyCart, payload.payload);
    yield put({ type: types.EMPTY_CART_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.EMPTY_CART_FAILURE, payload: error });
  }
}

export function* rootSaga() {
  yield all([
    yield takeEvery(types.LOGIN_REQUEST, loginSaga),
    yield takeEvery(types.SIGNUP_REQUEST, signUpSaga),
    yield takeEvery(types.GET_ITEMS_REQUEST, getAllItemsSaga),
    yield takeEvery(types.GET_ITEM_DETAIL_REQUEST, getItemSaga),
    yield takeEvery(types.ADD_TO_CART_REQUEST, addToCartSaga),
    yield takeEvery(types.GET_CART_REQUEST, getCartSaga),
    yield takeEvery(types.REMOVE_FROM_CART_REQUEST, removeFromCartSaga),
    yield takeEvery(types.EMPTY_CART_REQUEST, emptyCartSaga)
  ]);
}
