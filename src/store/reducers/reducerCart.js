const initialState = 
{
    cart : []
}

const reducer = (state = initialState, action ) =>
{
    let newState = {...state};

    if(action.type==='ADDCART')
    {
        newState.cart = state.cart.concat({product_id : action.value.product_id, name : action.value.name,
         size : action.value.size, price : action.value.price})

    }

    return newState;

}

export default reducer;