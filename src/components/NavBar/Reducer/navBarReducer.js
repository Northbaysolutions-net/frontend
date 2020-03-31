const initialState = 
{
    categories : [],
}

const reducer = (state = initialState, action ) =>
{
    let newState = {...state};
    if(action.type==='GET_ALL_CATEGORIES_ASYNC')
    {
        newState.categories = action.value.data;
    }
    return newState;
}

export default reducer;