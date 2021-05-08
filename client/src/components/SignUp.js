import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useHistory } from "react-router-dom";


function SignUp () {

    let history = useHistory();
    const [errors, setErrors] = useState([])
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const submit = async (e) => {
        e.preventDefault()
        const response = await fetch ('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: usernameInput, password: passwordInput})
        })
        const data = await response.json()
        console.log(data)
        if(data.success){
            setErrors([])
            history.push('/')
        } else {
            setErrors(data.error)
        }
    }
    
    return (

        <div className='mt-4'>
            <Form onSubmit={submit}>
                <div className='d-flex align-items-center justify-content-center mb-1 flex-column'>
                   <h5>CREATE ACCOUNT</h5>
                   <p>Already have an account? <a href='/login'>Log in</a></p> 
                </div>
                <div className='text-center mb-0 text-danger'>{errors.map(singleError => <p className='mb-0' key={singleError}><small>{singleError}</small></p>)}</div> 
                <Form.Group controlId="formGroupUsername" className='d-flex flex-column justify-content-center align-items-center'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name='username' placeholder="Username" className='signin-input' onChange={(e) => setUsernameInput(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formGroupPassword" className='d-flex flex-column justify-content-center align-items-center'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" className='signin-input' onChange={(e) => setPasswordInput(e.target.value)}/>
                </Form.Group>
                <div className='d-flex align-items-center justify-content-center mt-4'>
                    <button type='submit' className='bg-dark text-light border-0 py-2 px-3'>SIGN UP</button>
                </div>
            </Form>
        </div>
    )
}


export default SignUp