import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    loading: false,
  });

  const navigate = useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, loading: true });
    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:8000/user/api/login', {
        email: formData.email,
        password: formData.password
      });

      console.log(response);

      // Handle successful login
      if (response.data) {
        toast.success(`Welcome back, ${formData.email}!`);
        navigate("/")
        // Redirect to home page or dashboard after successful login
      } else {
        toast.error('Invalid credentials. Please try again.');
      }

      setFormData({
        email: '',
        password: '',
        loading: false,
      });

    } catch (error) {
      toast.error('Failed to log in. Please try again later.');
      console.error('Error logging in:', error);
      setFormData({
        ...formData,
        loading: false,
      });
    }
  };

  return (
    <>
      <Form className="m-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={formData.loading}>
          {formData.loading ? 'Logging In...' : 'Login'}
        </Button>
      </Form>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </>
  );
}

export default Login;
