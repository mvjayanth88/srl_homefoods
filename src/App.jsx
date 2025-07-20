import { useState, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
//import axios from 'axios'

import { GoogleOAuthProvider } from '@react-oauth/google';

import { CartContext } from './src/CartContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header';
import ProductsList from './components/ProductsList';
import Cart from './components/Cart';
// import Login from './components/GoogleLogin';

function App() {
  const { cart, setCart } = useContext(CartContext);
  const [scroll, setScroll] = useState(0);
  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleScroll = () => {
    setScroll(window.scrollY);
  }

  window.addEventListener('scroll', handleScroll);

  return (
    <>
    <Header />
    {/* Show cart when header is not visible  */}
    {window.scrollY > 50 &&
    <div className='cart-floating'>
      <Link className='nav-link cart' to="/Cart">
      {cart && cart.length > 0 &&
      <span className="badge" id="cart-count">{cart && cartQuantity > 0 ? cartQuantity : 0}</span>
      }
      <i className="bi bi-cart2"></i>
      </Link>

    </div>
    }
      <div className='container'>
          {/* <GoogleOAuthProvider clientId="805060689092-s77k13kp9hj6k1e8obsvao2fpurgucli.apps.googleusercontent.com">
          <Login>
          </Login> */}

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Products' element={<ProductsList />} />
            <Route path='/Cart' element={<Cart />} />
          </Routes>
            
          {/* </GoogleOAuthProvider> */}

      </div>
      </>
  )
}

export default App
