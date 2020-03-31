import {takeEvery, put , call} from 'redux-saga/effects'
import APIs from '../../../APIs/index'


const api = new APIs();

function* getAllAttributesAsync(actions){
    try {
    const response = yield call(api.getAllAttributes, actions.value);
    if(actions.value.name === "size")
        yield put({type:'GET_ALL_SIZE_ATTRIBUTES_ASYNC', value : response.payload})
    if(actions.value.name === "color")
        yield put({type:'GET_ALL_COLOR_ATTRIBUTES_ASYNC', value : response.payload})
    if(actions.value.name === "gender")
        yield put({type:'GET_ALL_GENDER_ATTRIBUTES_ASYNC', value : response.payload})
    }
    catch(error)
    {
        console.log(error);
    }
}


export function* SubBarSaga()
{
    yield takeEvery('getAllAttributes', getAllAttributesAsync )
}

export default SubBarSaga;