//async actions (get all products)
export const getProductsRequest = () => {
    return {
        type: 'GET_PRODUCTS_REQUEST'
    }
}

export const getProductsSuccess = (products) => {
    return {
        type: 'GET_PRODUCTS_SUCCESS',
        payload: products
    }
}

export const getProductsFailure = (err) => {
    return {
        type: 'GET_PRODUCTS_FAILURE',
        payload: err
    }
}


//sort by ascending prices
export const lowestPriceProd = (unsortedProducts) => {
    return {
        type: 'LOWEST_PRICE_PROD',
        payload: unsortedProducts
    }
}

//sort by descending prices
export const highestPriceProd = (unsortedProducts) => {
    return {
        type: 'HIGHEST_PRICE_PROD',
        payload: unsortedProducts
    }
}

//sort by newest products
export const newestProd = (unsortedProducts) => {
    return {
        type: 'NEWEST_PROD',
        payload: unsortedProducts
    }
}







//action creator (get all products)
export const getProducts = (filter) => {
    return async (dispatch) => {
        dispatch(getProductsRequest())
        const response = await fetch ('/api/products')
        const data = await response.json()
        if(data.success){
            if(filter === 'Lowest Price'){
               const products = data.data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price) )
               dispatch(getProductsSuccess(products))
            } else if (filter === 'Highest Price'){
                const products = data.data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
                dispatch(getProductsSuccess(products))
            } else {
                const products = data.data.sort(function (a, b) {return new Date(b.createdAt) - new Date(a.createdAt)})
                dispatch(getProductsSuccess(products))
            }
        } else {
            const err = data.error
            dispatch(getProductsFailure(err))
        }
    }
}











//async actions (get selected product info)
export const getProductInfoRequest = () => {
    return {
        type: 'GET_PRODUCT_INFO_REQUEST'
    }
}

export const getProductInfoSuccess = (products) => {
    return {
        type: 'GET_PRODUCT_INFO_SUCCESS',
        payload: products
    }
}

export const getProductInfoFailure = (err) => {
    return {
        type: 'GET_PRODUCT_INFO_FAILURE',
        payload: err
    }
}



//action creator (get selected product info)
export const getProductInfo = (id) => {
    return async (dispatch) => {
        dispatch(getProductInfoRequest(id))
        const response = await fetch ('/api/productinfo/' + id)
        const data = await response.json()
        if(data.success){
            const productInfo = data.data
            dispatch(getProductInfoSuccess(productInfo))
        } else {
            const err = data.error
            dispatch(getProductInfoFailure(err))
        }
    }
}








//seach product by name
export const findProductRequest = (input) => {
    return {
        type: 'FIND_PRODUCT_REQUEST',
        payload: input,
    }
}

export const findProductSuccess = (products) => {
    return {
        type: 'FIND_PRODUCT_SUCCESS',
        payload: products
    }
}

export const findProductFailure = (err) => {
    return {
        type: 'FIND_PRODUCT_FAILURE',
        payload: err
    }
}

//action creator (get products by searching name)
{/*
export const findProductsByName = (input) => {
    return async (dispatch) => {
        dispatch(findProductRequest(input))
        const response = await fetch ('/api/searchproductbyname/' + input)
        const data = await response.json()
        if(data.success){
            const products = data.data.sort( (a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            dispatch(findProductSuccess(products))
        } else {
            const err = data.error
            dispatch(findProductFailure(err))
        }
    }
}
*/}
// test
export const findProductsByName = (input, filter) => {
    return async (dispatch) => {
        dispatch(findProductRequest(input))
        const response = await fetch ('/api/searchproductbyname/' + input)
        const data = await response.json()
        if(data.success){
            if(filter === 'Lowest Price'){
                const products = data.data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price) )
                dispatch(findProductSuccess(products))
            } else if (filter === 'Highest Price'){
                const products = data.data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
                dispatch(findProductSuccess(products))
            } else {
                const products = data.data.sort( (a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                dispatch(findProductSuccess(products))
            }
        } else {
            const err = data.error
            dispatch(findProductFailure(err))
        }
    }
}













//currentUser
export const currentUserRequest = () => {
    return {
        type: 'CURRENT_USER_REQUEST',

    }
}

export const currentUserSuccess = (currentUser) => {
    return {
        type: 'CURRENT_USER_SUCCESS',
        payload: currentUser
    }
}

export const currentUserFailure = (err) => {
    return {
        type: 'CURRENT_USER_FAILURE',
        payload: err
    }
}


//fetch current user
export const getCurrentUser = () => {
    return async (dispatch) => {
        dispatch(currentUserRequest())
        const response = await fetch ('/user')
        const data = await response.json()
        if(data.success){
            const currentUser = data.currentUser;
            dispatch(currentUserSuccess(currentUser))
        } else {
            const err = data.message
            dispatch(currentUserFailure(err))
        }
    }
}











//products filter 

export const setProductsFilter = (filter) => {
    return {
        type: 'SET_PRODUCTS_FILTER',
        payload: filter
    }
}