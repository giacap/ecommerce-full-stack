const getProductInfoReducer = (
    state = {loading: false, productInfo: {}, err: ''}, action) => {
        switch(action.type){
            case 'GET_PRODUCT_INFO_REQUEST':
                return {
                    ...state,
                    loading: true
                }

            case 'GET_PRODUCT_INFO_SUCCESS':
                return {
                    loading: false,
                    productInfo: action.payload,
                    err: ''
                }

            case 'GET_PRODUCT_INFO_FAILURE':
                return {
                    loading: false,
                    productInfo: {},
                    err: action.payload
                }

            default:
                return state
        }
    }


    export default getProductInfoReducer