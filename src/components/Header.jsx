import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../redux/slice/productSlice';

// Theme Toggle Component
const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Apply the appropriate theme class to the body
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button onClick={toggleTheme} className="theme-toggle" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
      <i className={darkMode ? 'fas fa-sun' : 'fas fa-moon'} style={{ fontSize: '1.5rem', color: darkMode ? '#f39c12' : '#2c3e50' }}></i>
    </button>
  );
};

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [wishlistCount, SetWishlistCount] = useState(0);
  const [cartCount, SetcartCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const { wishlist } = useSelector((state) => state.wishlistReducer);
  const { cart, orders } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    SetWishlistCount(wishlist.length);
    SetcartCount(cart.length);
    setOrderCount(orders.length);
  }, [wishlist, cart, orders]);

  return (
    <div>
      <Navbar expand="lg" className="bg-success">
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
              <i className="fa-solid fa-truck-fast fa-bounce"></i> E-CART
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">

              {location.pathname === '/' && (
                <Nav.Link>
                  <input
                    type="text"
                    onChange={(e) => dispatch(searchProducts(e.target.value.toLowerCase()))}
                    className="form-control"
                    style={{ width: '500px' }}
                    placeholder="Search Products"
                  />
                </Nav.Link>
              )}

              <Nav.Link className="btn btn-outline-light">
                <Link to={'/wishlist'} style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>
                  <i className="fa-solid fa-heart text-danger"></i> Wishlist <Badge bg="light rounded ms-2">{wishlistCount}</Badge>
                </Link>
              </Nav.Link>

              <Nav.Link className="btn btn-outline-light">
                <Link to={'/cart'} style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>
                  <i className="fa-solid fa-cart-shopping text-warning"></i> Cart <Badge bg="light rounded ms-2">{cartCount}</Badge>
                </Link>
              </Nav.Link>

              <Nav.Link className="btn btn-outline-light">
                <Link to={'/orders'} style={{ color: 'black', fontWeight: 'bold', textDecoration: 'none' }}>
                  Orders <Badge bg="light rounded ms-2">{orderCount}</Badge>
                </Link>
              </Nav.Link>

              {/* Add Theme Toggle Button */}
              <Nav.Link className="btn btn-outline-light">
                <ThemeToggle />
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
