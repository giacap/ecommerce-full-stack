import React, {useEffect, useState} from 'react'
import product_img from '../images/product_img.svg'
import { getCurrentUser, getProductInfo } from '../actions';
import { useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import {useHistory} from 'react-router-dom'

function Cart () {

    const history = useHistory()
    const dispatch = useDispatch()
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(false)
    
    const currentUserReducer = useSelector( (state) => state.currentUserReducer)
    

    useEffect(() => {
        dispatch(getCurrentUser())       
    }, [])


    let total = 0;

    
    const addSingleItem = async (e) => {
        setLoading(true)
        const response = await fetch ('/api/editcart/addsingle', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({productID: e.target.id})
        })
        const data = await response.json();
        if(data.success){
            dispatch(getCurrentUser())
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    const removeSingleItem = async (e) => {
        setLoading(true)
        const response = await fetch ('/api/editcart/removesingle', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({productID: e.target.id})
        })
        const data = await response.json();
        if(data.success){
            dispatch(getCurrentUser())
            setLoading(false)
        } else {
            setLoading(false)
        }
    }



    const removeItem = async (e) => {
        setLoading(true)
        console.log(e.target.id)
        const response = await fetch ('/api/editcart/remove', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({productID: e.target.id})
        })
        const data = await response.json()
        console.log(data)
        if(data.success){
            dispatch(getCurrentUser())
            setLoading(false)
        } else {
            setLoading(false)
        }
    }


    const [error, setError] = useState('')

    const sendOrder = async () => {
        const response = await fetch ('/checkout', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        console.log(data)
        if(data.success){
            history.push("/");
        } else {
            setError('Cannot send order')
        }
    }



    return (
        <>
        <div className='text-danger'>{error}</div>

        <div className='d-flex justify-content-center mt-5 mb-3 cart-container'>
            {currentUserReducer.loading ? (
                 <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            ):(
                <>
                    {currentUserReducer.currentUser || loading ? (
                        <>
                            <div className='d-flex flex-column cart-inner-container-1'>
                                <h5 className='m-0 mb-3'>YOUR CART</h5>
                                <div className='d-flex flex-column-reverse'>
                                    {currentUserReducer.currentUser.cart.map( (cartEl) => {
                                        return  <div className='d-flex align-items-center pt-4 pb-4 border-top cart-product'>
                                                    <img src={ '/' + cartEl.image} alt='product_img' className='cart-product-img'></img>
                                                    <div className='ml-3 cart-product-inner'>
                                                        <h6 className='mb-0'>{cartEl.name}</h6>
                                                        <p>{cartEl.price}€</p>
                                                        <div className='d-flex align-items-center justify-content-center mb-2'>
                                                            <p className='m-0 mr-3'>Qty: {cartEl.qty}</p>
                                                            <button className='border-0 handle-qty-btn m-0 d-flex align-items-center justify-content-center bg-dark text-light' onClick={removeSingleItem} id={cartEl._id}>-</button>
                                                            <button className='border-0 handle-qty-btn m-0 d-flex align-items-center justify-content-center bg-dark text-light' onClick={addSingleItem} id={cartEl._id}>+</button>
                                                        </div>
                                                        <div>
                                                            <button className='px-2 py-1 border-0 fs-6 bg-dark text-light' onClick={removeItem} id={cartEl._id}>DELETE</button>
                                                        </div>
                                                    </div>
                                                </div>
                                    })}
                                </div>
                            </div>
                            <div className='d-flex flex-column align-items-start pl-3 border-left cart-inner-container-2 cart-sidebar'>
                                <h5 className='m-0 mb-3'>TOTAL</h5>
                                {currentUserReducer.currentUser.cart.map((item, index) => {
                                    total = total + item.price * item.qty;
                                    if(index === currentUserReducer.currentUser.cart.length - 1){
                                        return <h6>{total}€</h6>;
                                    }
                                })}
                                {/*<a href='/chekout' className='text-light bg-dark px-2 py-1 '>CHECKOUT</a>*/}
                                <button onClick={sendOrder} className='text-light bg-dark px-2 py-1 '>CHECKOUT</button>
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


        {/*
        <div className='d-flex justify-content-center mt-5 mb-3 cart-container'>

        {loading ? (
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>


        ) : (

        
            <>
                <div className='d-flex flex-column cart-inner-container-1'>

                    {currentUserReducer.currentUser ? (

                        <>

                            <h5 className='m-0 mb-3'>YOUR CART</h5>

                            {currentUserReducer.currentUser.cart.map( (cartEl) => {
                                return  <div className='d-flex align-items-center pt-4 pb-4 border-top cart-product'>
                                            <img src={ '/' + cartEl.image} alt='product_img' className='cart-product-img'></img>
                                            <div className='ml-3 cart-product-inner'>
                                                <h6 className='mb-0'>{cartEl.name}</h6>
                                                <p>{cartEl.price}€</p>
                                                <div>
                                                    <label>Qty:</label>
                                                    <input type='number' id={cartEl._id} defaultValue={cartEl.qty} className='qty-input ml-2' min='1'></input>
                                                    <button className='ml-4 px-2 py-1 border-0 fs-6 bg-dark text-light'>DELETE</button>
                                                </div>
                                            </div>
                                        </div>
                            })}

                        </>

                    ) : (
                        <h5>no products in your cart (yet)</h5>
                    )}
                    

                </div>
                
            


                <div className='d-flex flex-column align-items-start pl-3 border-left cart-inner-container-2 cart-sidebar'>

                    <h5 className='m-0 mb-3'>TOTAL</h5>
                    <h6>45€</h6>
                    <a href='/chekout' className='text-light bg-dark px-2 py-1 '>CHECKOUT</a>

                </div>
            </>
            )}

        </div>
         */}
        
    
}



export default Cart