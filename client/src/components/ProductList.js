import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import {getProducts, setProductsFilter} from '../actions'

function ProductList () {

    let history = useHistory();
    const dispatch = useDispatch()
    const getProductsReducer = useSelector( (state) => state.getProductsReducer)
    
   
    useEffect( () => {
        if(!getProductsReducer.products[0]){
            dispatch(getProducts())
            dispatch(setProductsFilter('Newest'))
        } else {
            const filter = localStorage.getItem('productsFilter')
            if(filter){
                dispatch(setProductsFilter(filter))
            }
        }
    }, [])
    
    

    return (
        <>
            <div className='mt-4'>
                <div className="container products-container">
                    <div className="row">

                    
                    {getProductsReducer.loading ? (
                        <h4>loading</h4>
                    ) : (
                        getProductsReducer.products[0] ? (
                            getProductsReducer.products.map( (product) => {
                                return <div className="col-md text-center p-4" key={product._id}>
                                    <img className='product-img' src={'/' + product.image} alt='product-img' onClick={() => history.push(`/product/${product._id}`)}></img>
                                    <h5 className='m-0 mt-2 product-text' onClick={() => history.push(`/product/${product._id}`)}>{product.name}</h5>
                                    <p className='product-text' onClick={() => history.push(`/product/${product._id}`)}>Price: {product.price}€</p>
                                </div>
                            })
                        ) : (
                            <div className="col-md text-center p-4 no-product-div">
                                <h4>can't find products</h4>
                            </div>
                        )
                    )}
                    

                    </div>
                </div>
            </div>
        </>
    )
}


export default ProductList