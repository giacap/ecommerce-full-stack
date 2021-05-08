import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { getCurrentUser } from '../actions';


function Orders () {

    const getProductInfoReducer = useSelector( (state) => state.getProductInfoReducer)
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getCurrentUser())
    }, [])

    const [orders, setOrders] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        const getOrders = async () => {
            const response = await fetch ('/api/orders')
            const data = await response.json()
            console.log(data)
            if(data.success){
                setOrders(data.data)
            } else {
                setError('Cannot get orders')
            }
        }

        getOrders()        
    }, [])

    return (

        <>
            <div className='text-danger'>{error}</div>
            <h4>ORDERS RECEIVED</h4>
            {orders.map( (order) => {
                return <div className='mb-3 bg-dark text-light'>
                    <div>
                        <p>Order by userId: {order.userId}</p>
                        <p>Order date: {new Date(order.date).toDateString()}</p>
                    </div>
                    <div>
                        <p className='mb-0'>Products:</p>
                        <ul>
                        {order.products.map((product) => {
                            return <>
                                        <li><p className='mb-0 ml-2'>- {product.qty} item(s) of product: {product.name}</p></li>
                                    </>
                        })}
                        </ul>
                    </div>
                </div>
            })}


        </>
    )
}



export default Orders