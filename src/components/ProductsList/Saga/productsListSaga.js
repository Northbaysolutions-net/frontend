import {takeEvery, put , call} from 'redux-saga/effects'
import APIs from '../../../APIs/index'


const api = new APIs();

function* getAllProductsAsync(actions){
    try {
    const products = yield call(api.getAllProducts, actions.value);
    let payLoad = {};
    if(actions.value)
    {
        payLoad = actions.value;
    }
    payLoad["data"] = products.payload
    yield put({type:'GET_ALL_PRODUCTS_ASYNC', value : payLoad})
    }
    catch(error)
    {
        console.log(error);
    }
}

function* getProductAsync(actions){
    try {
    const product = yield call(api.getProduct, actions.value);
    yield put({type:'GET_PRODUCT_ASYNC', value : product.payload})
    }
    catch(error)
    {
        console.log(error);
    }
}


export function* ProductListSaga()
{
    yield takeEvery('getAllProducts', getAllProductsAsync );
    yield takeEvery('getProduct', getProductAsync );
}