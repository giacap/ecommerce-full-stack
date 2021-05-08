const getProductsReducer = (
    state = {loading: false, products: [], err: ''}, action) => {
        switch(action.type){
            //get all products
            case 'GET_PRODUCTS_REQUEST':
                return {
                    ...state,
                    loading: true
                }

            case 'GET_PRODUCTS_SUCCESS':
                return {
                    loading: false,
                    products: action.payload,
                    err: ''
                }

            case 'GET_PRODUCTS_FAILURE':
                return {
                    loading: false,
                    products: [],
                    err: action.payload
                }

            
            //show products by ascending price
            case 'LOWEST_PRICE_PROD':
                return {
                    ...state,
                    products: action.payload.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                }

            //show products by descending price
            case 'HIGHEST_PRICE_PROD':
                return {
                    ...state,
                    products: action.payload.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
                }

            //show products from newest to oldest
            case 'NEWEST_PROD':
                return {
                    ...state,
                    products: action.payload.sort( (a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                }



            //find products by searching name
            case 'FIND_PRODUCT_REQUEST':
                return {
                    ...state,
                    loading: true
                }

            case 'FIND_PRODUCT_SUCCESS':
                return {
                    loading: false,
                    products: action.payload,
                    err: ''
                }

            case 'FIND_PRODUCT_FAILURE':
                return {
                    loading: false,
                    products: [],
                    err: action.payload
                }

            default:
                return state
        }
    }


    export default getProductsReducer