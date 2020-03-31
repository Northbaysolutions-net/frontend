const initialState = 
{
    SignIn : true,
}

const reducer = (state = initialState, action ) =>
{
    let newState = {...state};
    if(action.type==='SET_SIGNIN_FALSE')
    {
        newState.SignIn = false;
    }
    if(action.type==='SET_SIGNIN_TRUE')
    {
        newState.SignIn = true;
    }
    return newState;
}

export default reducer;