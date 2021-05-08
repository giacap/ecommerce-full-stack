import React, { useEffect } from 'react'
import ProductsFilter from './ProductsFilter'
import ProductList from './ProductList'
import { useDispatch} from 'react-redux'
import {getCurrentUser, setProductsFilter} from '../actions'



function Home () {

    
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getCurrentUser())
    }, [])

    return (

        <div className='m-0 mt-4'>

            
            <ProductsFilter />

            <ProductList />      
            

        </div>
    )
}


export default Home