import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import Cookies from js-cookie library
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function TopNavbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    // Check if user is logged in by checking cookies for the token
    const token = Cookies.get('token');
    
    const isLoggedIn = token ? true : false;
    setLoggedIn(isLoggedIn);

    if (isLoggedIn) {
      // If logged in, fetch user details (assuming you have an endpoint to fetch user details)
      axios.get('http://localhost:8000/user/api/login', {
        headers: {
          Authorization: `Bearer ${token}` // Send token in Authorization header
        }
      })
        .then(response => {
          const { fullName } = response.data; // Adjust according to your API response structure
          setFullName(fullName);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    }
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {loggedIn ? (
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/blog">Add Blog</Nav.Link>
              <NavDropdown title={fullName} id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
