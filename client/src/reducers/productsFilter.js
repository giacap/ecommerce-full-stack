const productsFilterReducer = (state = '', action) => {
    switch(action.type){
        case 'SET_PRODUCTS_FILTER':
            return action.payload
        
        default:
            return state
    }
}


export default productsFilterReducer