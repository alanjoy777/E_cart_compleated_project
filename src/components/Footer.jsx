import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-success  text-dark mt-5 p-4">
      <Container style={{fontWeight:"bold"}}>
        <Row>
          <Col md="4">
            <h5>E-Cart</h5>
            <p>Your one-stop shop for all your needs!</p>
          </Col>
          <Col md="4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-dark">Home</a></li>
              <li><a href="/shop" className="text-dark">Shop</a></li>
              <li><a href="/contact" className="text-dark">Contact Us</a></li>
              <li><a href="/about" className="text-dark">About Us</a></li>
            </ul>
          </Col>
          <Col md="4">
            <h5>Contact Us</h5>
            <p>Email: support@e-cart.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 E-Cart Street, Shop City</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} E-Cart. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
