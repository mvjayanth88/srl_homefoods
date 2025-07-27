import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDetails from './ProductDetails';
import Footer from './Footer';

function ProductsList(){
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('snacks');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
  const rlhf_products = sessionStorage.getItem('rlhf_products') != null ? JSON.parse(sessionStorage.getItem('rlhf_products')) : null;

  if(rlhf_products != null){
    setProducts(rlhf_products);
    const results = rlhf_products.filter(product => product.type === 'snacks');
    setFilteredProducts(results);
    setActiveTab('snacks');
    setLoading(false);
  }
  else {
  const table = 'products'; // or 'orders', 'order_items'
  console.log("API URL:", import.meta.env.VITE_API_URL);
    axios.get(`${import.meta.env.VITE_API_URL}/api/${table}`)
        .then(response => {
          sessionStorage.setItem('rlhf_products', JSON.stringify(response.data));
          setProducts(response.data);
          const results = response.data.filter(product => product.type === 'snacks');
          setFilteredProducts(results);
          setActiveTab('snacks');
          console.log(results);
          setLoading(false);
        })
        .catch(error => {
          console.error(`Error fetching ${table}:`, error.message);
        });
  }

  }, []);

const filterProducts = (type) => {
  setActiveTab(type);
  const results = products.filter(product => product.type === type);
  setFilteredProducts(results);
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
          <div className='tabs mb-5'>
            <ul className='nav nav-pills'>
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