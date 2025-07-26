import { useState, useEffect, useContext } from 'react';
import ProductDetails from './ProductDetails';
import { CartContext } from '../CartContext';
import Footer from './Footer';

function ProductsList(){
  const [loading, setLoading] = useState(true);
  //const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('snacks');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { products, setProducts } = useContext(CartContext);
  

  useEffect(() => {
    debugger
    const rlhf_products = sessionStorage.getItem('rlhf_products') != null ? JSON.parse(sessionStorage.getItem('rlhf_products')) : null;

    if(products.length > 0){
      setProducts(products);
    var results = products.filter(product => product.type === 'snacks');
    }
    else if(rlhf_products != null){
      setProducts(rlhf_products);
    var results = rlhf_products.filter(product => product.type === 'snacks');
    }
    setFilteredProducts(results);
    setLoading(false);

  }, []);

const filterProducts = (type) => {
  setActiveTab(type);
  const results = products.filter(product => product.type === type);
  setFilteredProducts(results);
  console.log("products", products)
  console.log(results);
};


    return(
      <>
      
      <div className='container'>
        <div className='page-title px-5'>
          <h2 className='mt-4 mb-4 text-center px-5'>
            {activeTab === 'snacks' && "Namkeen & Khara"}
            {activeTab === 'vegpickles' && "Veg Pickles"}
            {activeTab === 'nonvegpickles' && "Non-veg Pickles"}
            {activeTab === 'sweets' && "Traditional Sweets"}
            {activeTab === 'karampodulu' && "Karam podulu & Masalas"}
          <small className='d-block'>
            {activeTab === 'snacks' && "Freshly Made Murukulu, Boondhi, Kaara Pusa & Chekkalu — Authentic South Indian Crunch, Straight from Home!"}
            {activeTab === 'vegpickles' && "Made at Home with Love — Pure Veg Pickles You'll Crave"}
            {activeTab === 'nonvegpickles' && "Authentic Andhra-Style Non-Veg Pickles — a true blend of bold spices and tender meat. Freshly made at home under hygienic conditions using premium quality meat."}
            {activeTab === 'sweets' && "From Bellam Gavvalu to Bobbatlu — Sweets That Bring Home the Festive Spirit!"}
            {activeTab === 'karampodulu' && "Add Fire to Your Feast — Homemade Karam Podulu & Masalas with a Punch!"}
            </small>
        </h2>
        </div>
        <div className='mt-4 content-bg pt-0'>
{loading ? <div className="my-3 pt-5 text-center">
        <div className="spinner-border" role="status"></div>
  <p>Loading</p></div>
       : (
        <>
        <div className='products-list row'>
          <div className='d-flex tabs'>
            <ul className='nav nav-pills mb-5'>
            <li className={`nav-item ${activeTab === 'snacks' ? 'active' : ''}`}><a className='nav-link' onClick={() => filterProducts('snacks')}>Namkeen & Khara</a></li>
            <li className={`nav-item ${activeTab === 'vegpickles' ? 'active' : ''}`}><a className='nav-link' onClick={() => filterProducts('vegpickles')}>Veg Pickles</a></li>
            <li className={`nav-item ${activeTab === 'nonvegpickles' ? 'active' : ''}`}><a className='nav-link' onClick={() => filterProducts('nonvegpickles')}>Non-veg Pickles</a></li>
            <li className={`nav-item ${activeTab === 'sweets' ? 'active' : ''}`}><a className='nav-link' onClick={() => filterProducts('sweets')}>Traditional Sweets</a></li>
            <li className={`nav-item ${activeTab === 'karampodulu' ? 'active' : ''}`}><a className='nav-link' onClick={() => filterProducts('karampodulu')}>Karam podulu & Masalas</a></li>
        </ul>
          </div>

        {filteredProducts.map((prod, index) => (
          <div className='col-md-4 col-xl-3 mb-4' key={index}>
            <ProductDetails prod={prod}></ProductDetails>
          </div>
        ))}
        
        </div>
       </>
      )}
      </div>
     
      </div>

<Footer></Footer>

      </>
        
    )

}


export default ProductsList;