import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    DECREMENT_QTY, AUTHENTICATE } from "../constants/ActionTypes";


export default function cartReducer(state = {
    cart: [], loginToken:'', authenticate:false
}, action) {
    switch (action.type) {
    
        case ADD_TO_CART:
            const productId = action.product.product_id
            if (state.cart.findIndex(product => 
                product.product_id === productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product.product_id === productId) {
                        cartAcc.push({ ...product, qty: product.qty+1, sum: ((parseInt(product.discounted_price)*(product.qty+1))) }) // Increment qty
                    } else {
                        cartAcc.push({...product, sum:(parseInt(product.discounted_price)*1)})
                    }

                    return cartAcc
                }, [])

                return { ...state, cart }
            }

            return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: (parseFloat(action.product.discounted_price))*action.qty }] }

        case DECREMENT_QTY:
            
            if (state.cart.findIndex(product => product.product_id === action.productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product.product_id === action.productId && product.qty > 1) {
                        //console.log('price: '+product.price+'Qty: '+product.qty)
                        cartAcc.push({ ...product, qty: product.qty-1, sum: (product.discounted_price)*(product.qty-1) }) // Decrement qty
                    } else {
                        cartAcc.push(product)
                    }

                    return cartAcc
                }, [])

                return { ...state, cart }
            }

            return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: action.product.price*action.qty }] }

        case REMOVE_FROM_CART:
            return {
                cart: state.cart.filter(item => item.product_id !== action.product_id.product_id)
            }

        case AUTHENTICATE:
            return {
                ...state,loginToken:action.payload,authenticate:true
            }

        default:
    }
    return state;
}
