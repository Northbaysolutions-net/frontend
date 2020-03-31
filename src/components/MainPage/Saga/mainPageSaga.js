import { put , takeLatest} from 'redux-saga/effects'


function* setProductListAsync(actions){
    try {
    yield put({type:'SET_PRODUCT_LIST'})
    }
    catch(error)
    {
        alert('sorry for the inconvenience, we are facing some sort of Problem');
        console.log(error);
    }
}

function* setProductDetailsAsync(actions){
    try {
    yield put({type:'SET_PRODUCT_DETAILS', value : actions.value})
    }
    catch(error)
    {
        alert('sorry for the inconvenience, we are facing some sort of Problem');
        console.log(error);
    }
}

function* setCheckOutAsync(actions){
    try {
    yield put({type:'SET_CHECKOUT'})
    }
    catch(error)
    {
        alert('sorry for the inconvenience, we are facing some sort of Problem');
        console.log(error);
    }
}


export function* MainPageSaga()
{
    yield takeLatest('setCheckOut', setCheckOutAsync)
    yield takeLatest('setProductDetails', setProductDetailsAsync)
    yield takeLatest('setProductList', setProductListAsync)
}

export default MainPageSaga;