import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ShippingForm = ({ onSubmit }) => {
  const [address, setAddress] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
   
  };
  const navigate=useNavigate()
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4 text-center">Shipping Address</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={address.name} 
                onChange={handleChange} 
                placeholder="Enter your full name" 
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                value={address.email} 
                onChange={handleChange} 
                placeholder="Enter your email address" 
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Street Address</Form.Label>
              <Form.Control 
                type="text" 
                name="street" 
                value={address.street} 
                onChange={handleChange} 
                placeholder="Enter your street address" 
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control 
                type="text" 
                name="city" 
                value={address.city} 
                onChange={handleChange} 
                placeholder="Enter your city" 
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control 
                type="text" 
                name="state" 
                value={address.state} 
                onChange={handleChange} 
                placeholder="Enter your state" 
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ZIP Code</Form.Label>
              <Form.Control 
                type="text" 
                name="zip" 
                value={address.zip} 
                onChange={handleChange} 
                placeholder="Enter your ZIP code" 
                required
              />
            </Form.Group>

            <Button onClick={()=> navigate('/payment')} variant="success" type="submit" className="w-100">
              Proceed to Payment
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingForm;
