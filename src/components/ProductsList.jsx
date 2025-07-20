import { useState, useEffect } from 'react';
import axios from "axios";
import ProductDetails from './ProductDetails';


function ProductsList(){
const [products, setProducts] = useState([]);

useEffect(() => {
  const table = 'products'; // or 'orders', 'order_items'

  axios.get(`http://localhost:5000/api/${table}`)
    .then(response => {
      setProducts(response.data); // update relevant state
      console.log(`${table} data:`, response.data);
    })
    .catch(error => {
      console.error(`Error fetching ${table}:`, error.message);
    });
}, []);




    return(
        <>
      <div className='mt-4 content-bg'>
        <h3 className='mt-0 mb-4'>Veg & Non-Veg Pickles</h3>
        <div className='products-list row'>
        {products.map((prod, index) => (
          <div className='col-md-4 col-xl-3 mb-4' key={index}>
            <ProductDetails prod={prod}></ProductDetails>
          </div>
        ))}
        </div>
      </div>
      </>
    )

}


export default ProductsList;