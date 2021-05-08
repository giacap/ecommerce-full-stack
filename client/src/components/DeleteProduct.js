import React,{useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import {getProducts, setProductsFilter} from '../actions'
import { getCurrentUser } from '../actions';


function DeleteProduct () {

    const dispatch = useDispatch()
    const getProductsReducer = useSelector( (state) => state.getProductsReducer)

    useEffect( () => {
        dispatch(getProducts()) 
    }, [])

    useEffect( () => {
        dispatch(getCurrentUser())
    }, [])

    const deleteProduct = async (e) => {
        const response = await fetch ('/deleteproduct', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({productID: e.target.id})
        })
        const data = await response.json()
        console.log(data)
        if(data.success){
            dispatch(getProducts())
        }
    }


    return (

        <div>

            <div className='mt-4'>
                <div className="container products-container">
                    <div className="row">

                    
                    {getProductsReducer.loading ? (
                        <h4>loading</h4>
                    ) : (
                        getProductsReducer.products[0] ? (
                            getProductsReducer.products.map( (product) => {
                                return <div className="col-md text-center p-4" key={product._id}>
                                    <img className='product-img' src={'/' + product.image} alt='product-img' ></img>
                                    <h5 className='m-0 mt-2 product-text' >{product.name}</h5>
                                    <p className='product-text'>{product.description}</p>
                                    <p className='product-text' >Price: {product.price}€</p>
                                    <button onClick={deleteProduct} className='bg-dark text-light p-2 border-0' id={product._id}>DELETE</button>
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

        </div>
    )
}



export default DeleteProduct