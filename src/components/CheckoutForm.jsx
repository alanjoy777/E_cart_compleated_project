import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Form, Button, Alert } from 'react-bootstrap'; // Import necessary components from React-Bootstrap
import './chekout.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addOrder, emptycart } from '../redux/slice/cartSlice';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [total, setTotal] = useState(0);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setSuccess(false);
    } else {
      setError(null);
      setSuccess(true);
      toast.success(`Payment of $${total} was successful!`);
      navigate('/wishlist')
     dispatch(emptycart())
     dispatch(addOrder(cart))
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const { cart,orders } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    if (cart?.length > 0) {
      setTotal(cart?.map((product) => product.totalPrice).reduce((p1, p2) => p1 + p2));
    } else {
      setTotal(0);
    }
  }, [cart]);

  console.log(orders);
  

  

  return (
   <>
     
    <Form onSubmit={handleSubmit} style={{marginTop:"200px",marginBottom:"200px",padding:"50px"}} className="payment-form">
      <Form.Group controlId="card-element">
        <Form.Label className="form-label">
          Credit or Debit Card
        </Form.Label>
        <div className="card-element">
          <CardElement options={cardStyle} />
        </div>
        {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
      </Form.Group>
      <Button  type="submit" disabled={!stripe} variant="success" className="pay-btn">
        Pay ${total.toFixed(2)} {/* Display the total in fixed decimal format */}
      </Button>
      {success && <Alert variant="success" className="mt-2">Payment successful!</Alert>}
    </Form>
   </>
  );
};

export default CheckoutForm;
