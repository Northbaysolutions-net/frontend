const initialState = 
{
    customer_id : 0,
    token : "",
    status : false,
    customer : {}
}

const reducer = (state = initialState, action ) =>
{
    let newState = {...state};
    if(action.type==='SIGN_IN_ASYNC')
    {
        newState.customer_id = action.value.customer_id
        newState.token = action.value.token
        newState.customer = action.value.customer

    }

    if(action.type==='TOKEN_STATUS_REQUEST')
    {
        newState.status = false;
    }
    
    if(action.type==='TOKEN_STATUS_SUCCESS')
    {
        newState.status = action.value.status;
    }

    return newState;

}


export default reducer;