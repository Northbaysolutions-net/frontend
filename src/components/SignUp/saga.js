import { put, call, takeEvery } from 'redux-saga/effects';
import APIs from '../../API';
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './action-types';

function* signUpWorkerSaga(action) {
  try {
    const response = yield call(APIs.signup, action.data);
    yield put({ type: SIGNUP_SUCCESS, response });
  } catch (error) {
    yield put({ type: SIGNUP_FAILURE, error });
  }
}

function* SignUpWatcherSaga() {
  yield takeEvery(SIGNUP_REQUEST, signUpWorkerSaga);
}

export default SignUpWatcherSaga;
