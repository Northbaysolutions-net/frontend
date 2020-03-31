const initialState = 
{
    products : [],
    totalRecords : 0,
    totalPages : 0,
    category_id : 0,
    size : 0,
    gender : 0,
    color : 0,
    search : '',
    pageNo : 1,
    order :'asc',
    product: []

}

const reducer = (state = initialState, action ) =>
{
    let newState = {...state};

    if(action.type==='GET_ALL_PRODUCTS_ASYNC')
    {
        newState.products = action.value.data.data.products
        newState.totalPages = action.value.data.data.totalRecords
        newState.totalPages = action.value.data.data.totalPages
        if(action.value.category_id)
            newState.category_id = action.value.category_id
        if(action.value.size)
            newState.size = action.value.size
        if(action.value.color)
            newState.color = action.value.color
        if(action.value.gender)
            newState.gender = action.value.gender
        if(action.value.search)
            newState.search = action.value.search
        if(action.value.pageNo)
            newState.pageNo = action.value.pageNo
        if(action.value.order)
            newState.order = action.value.order
    }

    if(action.type==='GET_PRODUCT_ASYNC')
    {
        newState.product = action.value.data[0]    
    }

    return newState;


}

export default reducer;