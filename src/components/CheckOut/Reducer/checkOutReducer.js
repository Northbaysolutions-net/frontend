const initialState = 
{
    order_id : 0
}

const reducer = (state = initialState, action ) =>
{
    let newState = {...state};
    if(action.type==='SET_ORDET_ID')
    {
        newState.order_id = action.value.order_id;
    }
    return newState;
}

export default reducer;