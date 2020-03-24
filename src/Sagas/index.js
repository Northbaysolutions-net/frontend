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

export function* signUpSaga(payload){
  try {
    const { data } = yield call(Services.signUp, payload.payload);
    yield put({ type: types.SIGNUP_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.SIGNUP_REQUEST_FAILURE, payload: error });
  }
}

export function* getAllItemsSaga(payload){
  try {
    const { data } = yield call(Services.getAllItems, payload.payload);
    yield put({ type: types.GET_ITEMS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_ITEMS_FAILURE, payload: error });
  }
}

export function* getItemSaga(payload){
  try {
    const { data } = yield call(Services.getItem, payload.payload);
    yield put({ type: types.GET_ITEM_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: types.GET_ITEM_DETAIL_FAILURE, payload: error });
  }
}

export function* rootSaga() {
  yield all([
    yield takeEvery(types.LOGIN_REQUEST, loginSaga),
    yield takeEvery(types.SIGNUP_REQUEST, signUpSaga),
    yield takeEvery(types.GET_ITEMS_REQUEST, getAllItemsSaga),
    yield takeEvery(types.GET_ITEM_DETAIL_REQUEST,getItemSaga)
  ]);
}
