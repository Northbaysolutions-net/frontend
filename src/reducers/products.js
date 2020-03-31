import {
    FETCH_SINGLE_PRODUCT,
    CHANGE_CURRENCY,
    RECEIVE_PRODUCTS, RECEIVE_SINGLE_PRODUCT_REQUEST, RECEIVE_SINGLE_PRODUCT_SUCCESS,RECEIVE_SINGLE_PRODUCT_FAILURE } from "../constants/ActionTypes";


const initialState = {
    products: [],
    symbol: '$',
    product_details: [],
    singleProduct:null,
    count:null
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_PRODUCTS:
            return { ...state,
                products: action.products.rows, count:action.products.count };
        
        
        case FETCH_SINGLE_PRODUCT:
            if (state.products.findIndex(product => product.id === action.productId) !== -1) {
                const singleItem = state.products.reduce((itemAcc, product) => {
                    return product
                }, [])
                return { ...state,
                    product_details: singleItem };}

        
        case CHANGE_CURRENCY:
            return { ...state,
                symbol: action.symbol };

        case RECEIVE_SINGLE_PRODUCT_REQUEST:
            return{...state};

        case RECEIVE_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,singleProduct:action.payload
            }
            
        case RECEIVE_SINGLE_PRODUCT_FAILURE:
            return {
                ...state
            }
            
        default:
            return state;
    }
};
export default productReducer;