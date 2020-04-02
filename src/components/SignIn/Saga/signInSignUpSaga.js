import {put , call, takeLatest} from 'redux-saga/effects'
import APIs from '../../../APIs/index'


const api = new APIs();

function* signInAsync(actions){

    try {
    const authreturn = yield call(api.getSignIn, actions.value);
    yield put({type:authreturn.type, value : authreturn.payload});
    alert("Logged In, Happy shopping");
    }
    catch(error)
    {
        console.log(error);
        alert('Ecounter some issue, Kindly try again');
    }
}

function* signUpAsync(actions){

    try {
    const authreturn = yield call(api.postSignUp, actions.value);
    yield put({type:authreturn.type, value : authreturn.payload})
    alert("Logged In, Happy shopping");
    }
    catch(error)
    {
        alert('Ecounter some issue, Kindly try again');
        console.log(error);
    }
}

function* getTokenStatusAsync(actions){
    try{
        yield put({type:'TOKEN_STATUS_REQUEST'})
        const authreturn = yield call(api.getTokenStatus, actions.value);
        return(dispatch => {
            return put({type:'TOKEN_STATUS_SUCCESS', value : authreturn.payload})
        });
    }
    catch{
        yield put({type:'SIGN_IN_ASYNC_SUCCESS', value : {success : false}})
    }
}

export function* SignInSignUpSaga()
{
    yield takeLatest('signIn', signInAsync )
    yield takeLatest('signUp', signUpAsync )
    yield takeLatest('getTokenStatus', getTokenStatusAsync )
    
}

export default SignInSignUpSaga;