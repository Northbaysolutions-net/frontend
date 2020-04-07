import { put, call, takeEvery } from 'redux-saga/effects';
import APIs from '../../API';
import {
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
} from './action-types';

function* singleProductWorkerSaga(action) {
  try {
    const response = yield call(APIs.getProductById, action.productId);
    yield put({
      type: GET_PRODUCT_BY_ID_SUCCESS,
      product: response.data.product,
    });
  } catch (error) {
    yield put({ type: GET_PRODUCT_BY_ID_FAILURE, error });
  }
}

function* SingleProductWatcherSaga() {
  yield takeEvery(GET_PRODUCT_BY_ID_REQUEST, singleProductWorkerSaga);
}

export default SingleProductWatcherSaga;
