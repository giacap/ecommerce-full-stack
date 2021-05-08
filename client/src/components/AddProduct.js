import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { getCurrentUser } from '../actions';

function AddProduct () {

    const getProductInfoReducer = useSelector( (state) => state.getProductInfoReducer)
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getCurrentUser())
    }, [])

    return (

        <div className='mt-3'>
            <h4 className='text-center'>Add product to the store</h4>
            <form method='POST' action='/addproduct' encType="multipart/form-data" className='d-flex flex-column align-items-center justify-content-center' >
                <input type='text' name='name' placeholder='product name' className='m-3'></input>
                <input type='text' name='description' placeholder='product description' className='m-3'></input>
                <div className='m-3'>
                    <label>Price</label>
                    <input type='number' name='price' min='1'></input>
                </div>
                <div className='m-3 d-flex flex-column'>
                    <label className='text-center'>upload product image (jpg, png)</label>
                    <input type='file' name='image'></input>
                </div>
                
                <button type='submit' className='mt-2 py-2 px-3 bg-dark text-light border-0'>ADD</button>
            </form>
        </div>
    )
}


export default AddProduct