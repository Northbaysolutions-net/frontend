const initialState = 
{
    ShowModel : false,
}

const reducer = (state = initialState, action ) =>
{
    let newState = {...state};
    if(action.type==='SET_SHOWMODEL_FALSE')
    {
        newState.ShowModel = false;
    }
    if(action.type==='SET_SHOWMODEL_TRUE')
    {
        newState.ShowModel = true;
    }
    return newState;
}

export default reducer;