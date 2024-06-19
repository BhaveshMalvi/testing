import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
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
      const response = await axios.post('http://localhost:8000/user/api/signup', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });
      console.log(response.data); 
      toast.success(`User ${formData.fullName} created successfully!`, {
        autoClose:500,
        onClose: () => {
          setFormData({
            fullName: '',
            email: '',
            password: '',
            loading: false,
          });

          navigate("/Login")
        }
      });


    } catch (error) {
      toast.error(`User ${formData.fullName} failed something want wrong !`, {
        autoClose:500,
        onClose: () => {   }
      });
      // console.error('Error signing up:', error); 
      setFormData({
        ...formData,
        loading: false,
      });
    }
  };

  return (
    <>
      <Form className="m-3" onSubmit={handleSubmit}>
        {formData.error && <p className="text-danger">{formData.error}</p>}
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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
          {formData.loading ? 'Signing Up...' : 'Sign up'}
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
}

export default Signup;
