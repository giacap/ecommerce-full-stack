import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { findProductsByName, highestPriceProd, lowestPriceProd, newestProd, setProductsFilter} from '../actions'
import {getProducts} from '../actions'


function ProductsFilter () {

    const getProductsReducer = useSelector( (state) => state.getProductsReducer)
    const dispatch = useDispatch()
    const productsFilterReducer = useSelector( (state) => state.productsFilterReducer)


    


    
    const handleFilter = (e) => {
        if(e.target.value === 'Lowest Price'){
            localStorage.setItem('productsFilter', e.target.value)
            dispatch(lowestPriceProd(getProductsReducer.products))
            dispatch(setProductsFilter(e.target.value))
        } else if (e.target.value === 'Highest Price'){
            dispatch(highestPriceProd(getProductsReducer.products))
            dispatch(setProductsFilter(e.target.value))
            localStorage.setItem('productsFilter', e.target.value)
        } else {
            localStorage.removeItem('productsFilter')
            dispatch(newestProd(getProductsReducer.products))
            dispatch(setProductsFilter(e.target.value))
        }
    }
     


    const handleSearch = (e) => {
        e.preventDefault()
        let input = document.querySelector('.search-input').value
        if(input === ''){
            dispatch(getProducts(productsFilterReducer))
        } else {
            dispatch(findProductsByName(input, productsFilterReducer))
            
        }
    }

    return (

        <div>
            <div className='d-flex align-items-center justify-content-start products-filter-form'>
                <form className='d-flex align-items-center' onSubmit={handleSearch}>
                    <input className='mr-2 search-input' placeholder='Search product'></input>
                    <button type='submit' className='search-btn d-flex align-items-center justify-content-center border-0 rounded-circle'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                    
                </form>
                <div className='ml-5 select-container'>
                    <select onChange={handleFilter} value={productsFilterReducer}> 
                        <option value='Newest'>Newest</option>
                        <option value='Lowest Price'>Lowest Price</option>
                        <option value='Highest Price'>Highest Price</option>
                    </select>
                </div>
            </div>
        </div>
    )
}


export default ProductsFilter