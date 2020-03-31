const initialState = 
{
    size_attributes : [],
    color_attributes : [],
    gender_attributes :[]
}

const reducer = (state = initialState, action ) =>
{
    let newState = {...state};
    if(action.type==='GET_ALL_SIZE_ATTRIBUTES_ASYNC')
    {
        newState.size_attributes = action.value.data;
    }
    if(action.type==='GET_ALL_COLOR_ATTRIBUTES_ASYNC')
    {
        newState.color_attributes = action.value.data;

    }
    if(action.type==='GET_ALL_GENDER_ATTRIBUTES_ASYNC')
    {
        newState.gender_attributes = action.value.data;

    }
    return newState;
}

export default reducer;