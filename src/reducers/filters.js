import * as types from '../constants/ActionTypes'


const filtersReducerDefaultState = {
    brand: [],
    value: { min: 250, max: 950 },
    sortBy: "price asc",
    config:[],
    attributes:[],
    size:[],
    search:'',
    page:0,
    gender:[]
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    // console.log('Action Result');
    // console.log(action);
    switch (action.type) {
        case types.FILTER_BRAND:
            {
               let index = state.brand.indexOf(action.brand.category);

            if (index===-1)
            {
                return {
                    ...state,
                    brand: [action.brand.category], page:0                };

            }
            else {
                let arr=state.brand
                
                arr.splice(index,1)
                return {
                    ...state,
                    brand: arr, page:0 
                };
            }

        }
        case types.FILTER_COLOR:
          
            let index = state.attributes.indexOf(action.color.color);

            if (index===-1)
            {
                return {
                    ...state,
                    attributes: [action.color.color], page:0 
                };

            }
            else {
                let arr=state.attributes
                
                arr.splice(index,1)
                return {
                    ...state,
                    attributes: arr, page:0 
                };
            }
        

          
        case types.FILTER_SIZE:
            {
            let index = state.size.indexOf(action.value.size);

            if (index===-1)
            {
                return {
                    ...state,
                    size: [action.value.size], page:0 
                };

            }
            else {
                let arr=state.size
                
                arr.splice(index,1)
                return {
                    ...state,
                    size: arr, page:0 
                };
            }
        }
        case types.FILTER_GENDER:
            {
            let index = state.gender.indexOf(action.gender.gender);

            if (index===-1)
            {
                return {
                    ...state,
                    gender: [action.gender.gender], page:0 
                };

            }
            else {
                let arr=state.gender
                
                arr.splice(index,1)
                return {
                    ...state,
                    gender: arr, page:0 
                };
            }
        }
        case types.SORT_BY:
            return {
                ...state,
                sortBy: action.sort_by.sortBy, page:0 
            };

         case types.CATEGORIES:
             return {
                 ...state,config:action.value, page:0 

             }
        case types.FILTER_SEARCH:
            return {
                    ...state,search:action.search.search, page:0 
   
                }
                
        case types.FILTER_PAGE:
                    return {
                            ...state,page:action.page.page
           
                        }         
        
             

        default:
            return state;
    }
}

export default filtersReducer;