import { put, call, takeEvery } from 'redux-saga/effects';
import APIs from '../../API';
import {
  INITIAL_LANDING_VIEW_REQUEST,
  INITIAL_LANDING_VIEW_SUCCESS,
  INITIAL_LANDING_VIEW_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_BY_CATEGORY_REQUEST,
  GET_PRODUCTS_BY_CATEGORY_SUCCESS,
  GET_PRODUCTS_BY_CATEGORY_FAILURE,
  SEARCH_PRODUCTS_REQUEST,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_FAILURE,
} from './action-types';

function* initialLandingViewSaga(action) {
  try {
    const response = yield call(APIs.initialLandingView);
    yield put({ type: INITIAL_LANDING_VIEW_SUCCESS, response });
  } catch (error) {
    yield put({ type: INITIAL_LANDING_VIEW_FAILURE, error });
  }
}

function* getAllProductsSaga(action) {
  try {
    const products = yield call(APIs.getAllProducts, action.data);
    yield put({ type: GET_PRODUCTS_SUCCESS, products });
  } catch (error) {
    yield put({ type: GET_PRODUCTS_FAILURE, error });
  }
}

function* getProductsByCategorySaga(action) {
  try {
    const products = yield call(APIs.getProductsByCategory, action.data);
    yield put({ type: GET_PRODUCTS_BY_CATEGORY_SUCCESS, products });
  } catch (error) {
    yield put({ type: GET_PRODUCTS_BY_CATEGORY_FAILURE, error });
  }
}

function* searchProductsSaga(action) {
  try {
    const products = yield call(APIs.searchProducts, action.data);
    yield put({ type: SEARCH_PRODUCTS_SUCCESS, products });
  } catch (error) {
    yield put({ type: SEARCH_PRODUCTS_FAILURE, error });
  }
}

function* LandingViewWatcherSaga() {
  yield takeEvery(INITIAL_LANDING_VIEW_REQUEST, initialLandingViewSaga);
  yield takeEvery(GET_PRODUCTS_REQUEST, getAllProductsSaga);
  yield takeEvery(GET_PRODUCTS_BY_CATEGORY_REQUEST, getProductsByCategorySaga);
  yield takeEvery(SEARCH_PRODUCTS_REQUEST, searchProductsSaga);
}

export default LandingViewWatcherSaga;
