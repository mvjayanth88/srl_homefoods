import 'bootstrap-icons/font/bootstrap-icons.css';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';

function Header(){
    const { cart, setCart } = useContext(CartContext);
    const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    return(
        <>
        <header>
                <nav className="navbar navbar-expand-lg">
                       <div className="container d-flex">
                         <a className="navbar-brand" href="#"> 
                         <h3>Sri Rajyalakshmi <small>Authentic Home Foods</small></h3></a>

                    <div className="ml-auto">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
                        <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li className="nav-item">
                            <Link className='nav-link' to="/">Home</Link>
                            </li>
                            <li>
                                <Link className='nav-link' to="/Products">Products</Link>
                            </li>
                        <li className="nav-item">
                            <Link className='nav-link cart' to="/Cart">
                            {cart && cart.length > 0 &&
                            <span className="badge" id="cart-count">{cart && cartQuantity > 0 ? cartQuantity : 0}</span>
                            }
                            <i className="bi bi-cart2"></i>
                            </Link>
                            </li>
                    </ul>
                    </div>
                    </div>
                    </div>

                </nav>
        </header>
        </>
    )

}

export default Header;