import React from 'react'
import Nav from 'react-bootstrap/Nav';
import {useSelector} from 'react-redux'
import Navbar from 'react-bootstrap/Navbar';


function Navigation () {

    const currentUserReducer = useSelector( (state) => state.currentUserReducer)



    return (

        <>

            <Navbar collapseOnSelect expand="lg" variant="light" className='p-0'>
                <Navbar.Brand href='/'>ECommerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
                    <Nav>
                        <Nav.Link href='/cart'>Cart</Nav.Link>
                        {currentUserReducer.currentUser ? (
                            <>
                                <Nav.Link href='/account'>{currentUserReducer.currentUser.username}</Nav.Link>
                                <Nav.Link href='/logout'>Log Out</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link href='/signup'>Sign In</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </>
    )
}


export default Navigation