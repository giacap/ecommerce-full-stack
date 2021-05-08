import getProductsReducer from './getProducts'
import {combineReducers} from 'redux'
import getProductInfoReducer from './getProductInfo'
import currentUserReducer from './currentUser'
import productsFilterReducer from './productsFilter'

const allReducers = combineReducers({
    getProductsReducer: getProductsReducer,
    getProductInfoReducer: getProductInfoReducer,
    currentUserReducer: currentUserReducer,
    productsFilterReducer: productsFilterReducer
})


export default allReducers