import { call, take, put } from 'redux-saga/effects';
import {
  GET_ALL_CATEGORIES_REQUEST,
  GET_CONFIGURATIONS_REQUEST,
  GET_ALL_PRODUCTS_REQUEST,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCTS_BY_CATEGORY_REQUEST,
  GET_USER_INFORMATION_REQUEST,
  UPDATE_USER_INFORMATION_REQUEST,
  PLACE_ORDER_REQUEST
} from '../Redux/Constants';

import {
  getAllCategories,
  getConfigurations,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getUserInformation,
  updateUserInformation,
  placeOrder
} from '../Redux/Actions';
import Api from '../Api';

export function* getAllCategoriesSaga() {
  while (true) {
    try {
      const { payload } = yield take(GET_ALL_CATEGORIES_REQUEST);
      const data = yield call(Api.getAllCategories, payload);
      yield put(getAllCategories.success(data));
    } catch (error) {
      yield put(getAllCategories.failure(error));
    }
  }
}

export function* getConfigurationsSaga() {
  while (true) {
    try {
      const { payload } = yield take(GET_CONFIGURATIONS_REQUEST);
      const data = yield call(Api.getConfigurations, payload);
      yield put(getConfigurations.success(data));
    } catch (error) {
      yield put(getConfigurations.failure(error));
    }
  }
}

export function* getAllProductsSaga() {
  while (true) {
    try {
      const { payload } = yield take(GET_ALL_PRODUCTS_REQUEST);
      const data = yield call(Api.getAllProducts, payload);
      yield put(getAllProducts.success(data));
    } catch (error) {
      yield put(getAllProducts.failure(error));
    }
  }
}

export function* getProductByIdSaga() {
  while (true) {
    try {
      const { payload } = yield take(GET_PRODUCT_BY_ID_REQUEST);
      const data = yield call(Api.getProductById, payload);
      yield put(getProductById.success(data));
    } catch (error) {
      yield put(getProductById.failure(error));
    }
  }
}

export function* getProductsByCategorySaga() {
  while (true) {
    try {
      const { payload } = yield take(GET_PRODUCTS_BY_CATEGORY_REQUEST);
      const data = yield call(Api.getProductsByCategory, payload);
      yield put(getProductsByCategory.success(data));
    } catch (error) {
      yield put(getProductsByCategory.failure(error));
    }
  }
}

export function* getUserInformationSaga() {
  while (true) {
    try {
      const { payload } = yield take(GET_USER_INFORMATION_REQUEST);
      const data = yield call(Api.getUserInformation, payload);
      yield put(getUserInformation.success(data));
    } catch (error) {
      yield put(getUserInformation.failure(error));
    }
  }
}

export function* updateUserInformationSaga() {
  while (true) {
    try {
      const { payload } = yield take(UPDATE_USER_INFORMATION_REQUEST);
      const data = yield call(Api.updateUserInformation, payload);
      yield put(updateUserInformation.success(data));
    } catch (error) {
      yield put(updateUserInformation.failure(error));
    }
  }
}

export function* placeOrderSaga() {
  while (true) {
    try {
      const { payload } = yield take(PLACE_ORDER_REQUEST);
      const data = yield call(Api.placeOrder, payload);
      yield put(placeOrder.success(data));
    } catch (error) {
      yield put(placeOrder.failure(error));
    }
  }
}
