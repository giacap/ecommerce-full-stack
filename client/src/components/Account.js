import React, {useEffect, useState} from 'react'
import { getCurrentUser, getProductInfo } from '../actions';
import { useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

function Account () {

    const dispatch = useDispatch()
    const currentUserReducer = useSelector( (state) => state.currentUserReducer)

    useEffect(() => {
        dispatch(getCurrentUser())       
    }, [])

    return (

        <>




            <div className='d-flex justify-content-center mt-5 mb-3 cart-container'>
                    {currentUserReducer.loading ? (
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    ):(
                        <>
                            {currentUserReducer.currentUser ? (
                                <>
                                    <div className='d-flex flex-column cart-inner-container-1'>
                                        <h5 className='m-0 mb-3'>YOUR ORDERS</h5>

                                        <div className='d-flex flex-column-reverse'>
                                        {currentUserReducer.currentUser.orders.map( (order) => {
                                            return  <div className='d-flex align-items-center pt-4 pb-4 border-top cart-product'>
                                                        <img src={ '/' + order.image} alt='product_img' className='cart-product-img'></img>
                                                        <div className='ml-3 cart-product-inner'>
                                                            <h6 className='mb-0'>{order.name}</h6>
                                                            <p>{order.price}€</p>
                                                            <div className='d-flex align-items-center justify-content-start mb-2'>
                                                                <p className='m-0 mr-3'>Qty: {order.qty}</p>
                                                            </div>
                                                            <div className='d-flex align-items-center justify-content-start mb-2'>
                                                                <p className='m-0 mr-3'>Order Date: {new Date(order.date).toDateString()}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                        })}
                                        </div>
                                    </div>
                                    
                                </>
                            ) : (
                                ''
                            )}
                        </>
                    )}
            </div>

        </>
    )
}


export default Account