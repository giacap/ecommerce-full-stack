import React, { useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux';
import { getCurrentUser, getProductInfo } from '../actions';

function ProductPage () {

    const getProductInfoReducer = useSelector( (state) => state.getProductInfoReducer)
    const dispatch = useDispatch()
    const { id } = useParams();
    let history = useHistory()

    const [error, setError] = useState('');

    const [qty, setQty] = useState(1)

    useEffect( () => {
        dispatch(getProductInfo(id))
        dispatch(getCurrentUser())
    }, [])

    


    const handleCart = async () => {
        
        const response = await fetch (`/addtocart`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({productToAdd: getProductInfoReducer.productInfo._id, qty: qty})
        })
        const data = await response.json()
        console.log(data)
        if(data.success){
            history.push('/')
        } else {
            setError(data.msg);
        }
    }

    

    return (
        <>

        {getProductInfoReducer.loading ? (
            <h4>loading</h4>
        ) : (
            getProductInfoReducer.err === '' ? (
                <>
                <div className='d-flex  ml-4 mr-4 product-container align-items-center'>
                    <div className='d-flex justify-content-center product-inner-container-1'>
                        <img src={'/' + getProductInfoReducer.productInfo.image} alt='product-img'></img>
                    </div>
                    <div className='product-inner-container-2'>
                        <h4>{getProductInfoReducer.productInfo.name}</h4>
                        <p>{getProductInfoReducer.productInfo.description}</p>
                        <p>Price: {getProductInfoReducer.productInfo.price}€</p>
                        <div className='mb-3'>
                            <label>Qty:</label>
                            <input type='number' className='qty-input ml-2' min='1' value={qty} onChange={e => setQty(e.target.value)}></input>
                        </div>
                        <button className='bg-dark text-light border-0 py-2 px-3' onClick={handleCart}>ADD TO CART</button>
                    </div>
                </div>
                <div>
                    <p className='text-center text-danger'>{error}</p>
                </div>
                </>
            ) : (
                <h1>{getProductInfoReducer.err}</h1>
            )
        )}


        




        </>
    )
}



export default ProductPage