import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import View from './pages/View';
import Cart from './pages/Cart';
import ShippingForm from './pages/ShippingForm';
import CheckoutForm from './components/CheckoutForm'; // Import your CheckoutForm component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Elements } from '@stripe/react-stripe-js'; // Import Stripe's Elements component
import { loadStripe } from '@stripe/stripe-js'; // Import the loadStripe function
import Orders from './pages/Orders';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51QAr7iA5xRKOZjFrXJ5gqo5C0gR97ycooO1fDccdY0RkYZMIEAEOKODxZgx9uANduqm3QrQu5pzi0mfpu6Kw1oG900a9KtgLLU');

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/view/:id' element={<View />} />
        <Route path='/shipping' element={<ShippingForm />} /> 

        {/* Wrap the CheckoutForm with the Elements provider */}
        <Route 
          path='/payment' 
          element={
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          } 
        />
        <Route path='/orders' element={<Orders/>}/>

        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
      <Footer />
      <ToastContainer position='top-center' autoClose={1000} />
    </>
  );
}

export default App;
