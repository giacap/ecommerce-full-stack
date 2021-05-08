import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import { useHistory } from "react-router-dom";


function Login () {

    let history = useHistory();
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [error, setError] = useState('')

    const submit = async (e) => {
        e.preventDefault()
        const response = await fetch ('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: usernameInput, password: passwordInput})
        })
        const data = await response.json()
        console.log(data)
        if(data.success){
            setError('')
            history.push('/')
        } else {
            setError(data.error)
        }
    }

    return (

        <div className='mt-4'>
            <Form onSubmit={submit}>
                <div className='d-flex align-items-center justify-content-center mb-2 flex-column'>
                   <h5>LOG IN</h5>
                </div>
                <p className='text-center mb-0 text-danger'>{error}</p>
                <Form.Group controlId="formGroupUsername" className='d-flex flex-column justify-content-center align-items-center'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={(e) => setUsernameInput(e.target.value)} type="text" placeholder="Enter username" className='signin-input'/>
                </Form.Group>
                <Form.Group controlId="formGroupPassword" className='d-flex flex-column justify-content-center align-items-center'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setPasswordInput(e.target.value)} type="password" placeholder="Password" className='signin-input'/>
                </Form.Group>
                <div className='d-flex align-items-center justify-content-center mt-4'>
                    <button className='bg-dark text-light border-0 py-2 px-3'>LOG IN</button>
                </div>
            </Form>
        </div>
    )
}


export default Login