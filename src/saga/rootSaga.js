import { all, fork } from 'redux-saga/effects';
import LogInWatcherSaga from '../components/Login/saga';
import SignUpWatcherSaga from '../components/SignUp/saga';
import SingleProductWatcherSaga from '../components/ProductView/saga';
import LandingViewWatcherSaga from '../components/LandingView/saga';

export function* rootSaga() {
  yield all([
    fork(LogInWatcherSaga),
    fork(SignUpWatcherSaga),
    fork(SingleProductWatcherSaga),
    fork(LandingViewWatcherSaga),
  ]);
}
