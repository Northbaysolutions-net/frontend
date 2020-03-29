import { all } from 'redux-saga/effects';
import {
  getAllCategoriesSaga,
  getConfigurationsSaga,
  getAllProductsSaga,
  getProductsByCategorySaga,
  getUserInformationSaga,
  updateUserInformationSaga,
  placeOrderSaga
} from './sagaActions';

export function* rootSaga() {
  yield all([
    getAllCategoriesSaga(),
    getConfigurationsSaga(),
    getAllProductsSaga(),
    getProductsByCategorySaga(),
    getUserInformationSaga(),
    updateUserInformationSaga(),
    placeOrderSaga()
  ]);
}
