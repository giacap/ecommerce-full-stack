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
                                return <div className="col-md text-center p-4 mb-4" key={product._id}>
                                    <img className='product-img' src={'/' + product.image} alt='product-img' ></img>
                                    <p className='m-0 mt-2 product-text' >{product.name}</p>
                                    <p className='product-text'>{product.description}</p>
                                    <p className='product-text' >Price: {product.price}€</p>
                                    <br />
                                    <form method='POST' action='/updateproduct'>
                                        <input type='hidden' name='id' value={product._id}/>
                                        <input type='text' name='name' placeholder='product name'/>
                                        <textarea type='text' name='description' placeholder='product description'/>
                                        <div>
                                            <label>Price:</label>
                                            <input type='number' name='price' min='1'/>
                                        </div>
                                        <button className='bg-dark text-light p-2 border-0' id={product._id} type='submit'>UPDATE</button>
                                    </form>
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