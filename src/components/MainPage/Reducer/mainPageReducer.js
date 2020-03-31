const initialState = 
{
    ProductList : true,
    ProductDetails : false,
    ProductDetailsId : 0,
    CheckOut : false
}

const reducer = (state = initialState, action ) =>
{
    let newState = {...state};
    if(action.type==='SET_PRODUCT_LIST')
    {
        newState.ProductList = true;
        newState.ProductDetails = false;
        newState.CheckOut = false;
        newState.ProductDetailsId = 0;
    }
    if(action.type==='SET_PRODUCT_DETAILS')
    {
        newState.ProductList = false;
        newState.ProductDetails = true;
        newState.CheckOut = false;
        newState.ProductDetailsId = action.value;
    }
    if(action.type==='SET_CHECKOUT')
    {
        newState.ProductList = false;
        newState.ProductDetails = false;
        newState.CheckOut = true;
        newState.ProductDetailsId = 0;
    }
    return newState;
}

export default reducer;