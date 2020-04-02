import {all, fork} from 'redux-saga/effects'
import {ProductListSaga} from '../../components/ProductsList/Saga/productsListSaga'
import {SignInSignUpSaga} from '../../components/SignIn/Saga/signInSignUpSaga.js'
import {SubBarSaga} from '../../components/SubBar/Saga/subBarSaga'
import {NavBarSaga} from '../../components/NavBar/Saga/navBarSaga'
import {CheckOutSaga} from '../../components/CheckOut/Saga/checkOutSaga'
import {ModelSaga} from '../../components/Model/Saga/modelSaga'
import {PopupSaga} from '../../components/PopUp/Saga/popUpSaga'
import {MainPageSaga} from '../../components/MainPage/Saga/mainPageSaga'




export default function* rootSaga()
{
    yield all([
        
        fork(SignInSignUpSaga),
        fork(ProductListSaga),
        fork(SubBarSaga),
        fork(NavBarSaga),
        fork(CheckOutSaga),
        fork(ModelSaga),
        fork(PopupSaga),
        fork(MainPageSaga)
      ]);
};
