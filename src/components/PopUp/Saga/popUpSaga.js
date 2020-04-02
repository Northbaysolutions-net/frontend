import { put , takeLatest} from 'redux-saga/effects'

function* setShowModelTrueAsync(actions){
    try {
    yield put({type:'SET_SHOWMODEL_TRUE'})
    }
    catch(error)
    {
        alert('sorry for the inconvenience, we are facing some sort of Problem');
        console.log(error);
    }
}

function* setShowModelFalseAsync(actions){
    try {
    yield put({type:'SET_SHOWMODEL_FALSE'})
    }
    catch(error)
    {
        alert('sorry for the inconvenience, we are facing some sort of Problem');
        console.log(error);
    }
}


export function* PopupSaga()
{
    yield takeLatest('setShowModelFalse', setShowModelFalseAsync)
    yield takeLatest('setShowModelTrue', setShowModelTrueAsync)
}

export default PopupSaga;
