import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './CartContext.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
<BrowserRouter basename="/srl_homefoods">
  <CartProvider>
    <App />
  </CartProvider>
</BrowserRouter>)
