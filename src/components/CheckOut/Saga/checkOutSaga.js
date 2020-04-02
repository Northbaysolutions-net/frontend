import { put , call, takeLatest} from 'redux-saga/effects'
import APIs from '../../../APIs/index'


const api = new APIs();

function* postOrderAsync(actions){
    try {
    const response = yield call(api.postOrder, actions.value);
    yield put({type:response.type, value : response.payload})
    }
    catch(error)
    {
        alert('Encounter some issue while placing order.');
        console.log(error);
    }
}


export function* CheckOutSaga()
{
    yield takeLatest('postOrder', postOrderAsync)
}

export default CheckOutSaga;