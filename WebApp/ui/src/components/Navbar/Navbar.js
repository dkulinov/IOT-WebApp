import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = () =>{
    return(
        <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
            <Navbar.Brand href="/">FoodGuard</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <LinkContainer className="nav-link" to="/login">
                    <Nav.Link>
                        Login
                    </Nav.Link>
                </LinkContainer>
                <LinkContainer className="nav-link" to="/register">
                    <Nav.Link>
                        Register
                    </Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar