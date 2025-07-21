import 'bootstrap-icons/font/bootstrap-icons.css';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';

function Header(){
    const { cart, setCart } = useContext(CartContext);
    const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
    const links = document.querySelectorAll("#navbarNav .nav-link");
    const navbar = document.getElementById("navbarNav");

    if (!navbar || typeof bootstrap === "undefined") return;

    const bsCollapse = new bootstrap.Collapse(navbar, {
      toggle: false,
    });

    links.forEach((link) =>
      link.addEventListener("click", () => bsCollapse.hide())
    );

    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", () => bsCollapse.hide())
      );
    };
  }, []);

    return(
        <>
        <header>
                <nav className="navbar navbar-expand-lg">
                       <div className="container d-flex">
                         <a className="navbar-brand" href="#"> 
                         <h3>Sri Rajyalakshmi <small>Authentic Home Foods</small></h3></a>

                    <div className="ml-auto d-flex">
    <Link className='nav-link cart d-block d-lg-none me-3' to="/Cart">
    {cart && cart.length > 0 &&
    <span className="badge" id="cart-count">{cart && cartQuantity > 0 ? cartQuantity : 0}</span>
    }
    <i className="bi bi-cart2"></i>
    </Link>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" id='navbar-toggler'>
      <i className='bi bi-list'></i>
    </button>

    

                        <div className="collapse navbar-collapse" id='navbarNav'>
                    <ul className="nav navbar-nav">
                        <li className="nav-item">
                            <Link className='nav-link' to="/">Home</Link>
                            </li>
                            <li>
                                <Link className='nav-link' to="/Products">Products</Link>
                            </li>
                        <li className="nav-item d-none d-lg-block">
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