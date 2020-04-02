import {takeEvery, put , call} from 'redux-saga/effects';
import APIs from '../../../APIs/index';

import { allAttributesSize, allAttributesColor,allAttributesGender} from '../../../store/actions/index';

const api = new APIs();

function* getAllAttributesAsync(actions){
    try {
    const response = yield call(api.getAllAttributes, actions.value);
    if(actions.value.name === "size")
        yield put({type:allAttributesSize, value : response.payload})
    if(actions.value.name === "color")
        yield put({type:allAttributesColor, value : response.payload})
    if(actions.value.name === "gender")
        yield put({type:allAttributesGender, value : response.payload})
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