import { put, call, takeEvery } from 'redux-saga/effects';
import APIs from '../../API';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './action-types';

function* logInWorkerSaga(action) {
  try {
    const response = yield call(APIs.login, action.data);
    yield put({ type: LOGIN_SUCCESS, data: response.data });
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, error });
  }
}

function* LogInWatcherSaga() {
  yield takeEvery(LOGIN_REQUEST, logInWorkerSaga);
}

export default LogInWatcherSaga;
