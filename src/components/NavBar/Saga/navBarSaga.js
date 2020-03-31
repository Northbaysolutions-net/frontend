import {takeEvery, put , call} from 'redux-saga/effects'
import APIs from '../../../APIs/index'


const api = new APIs();

function* getAllCategoriesAsync(actions){
    try {
    const response = yield call(api.getAllCategories);
    yield put({type:'GET_ALL_CATEGORIES_ASYNC', value : response.payload})
    }
    catch(error)
    {
        console.log(error);
    }
}


export function* NavBarSaga()
{
    yield takeEvery('getAllCategories', getAllCategoriesAsync )
}

export default NavBarSaga;