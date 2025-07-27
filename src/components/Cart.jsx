import { useEffect, useState, useContext } from "react";
import { CartContext } from '../CartContext';
import { Link } from "react-router-dom";
import FloatingInput from "./FloatingInput";
import QuantityManager from "./QuantityManager";
import axios from "axios";
import Footer from "./Footer";

const Cart = () => {

const { cart, setCart } = useContext(CartContext);

const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
const [paymentSucess, setPaymentSucess] = useState(false);
const [orderId, setOrderId] = useState(null);

const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
};

useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);
}, []);

const generateRandomDigits = () => {
  const randomFiveDigit = Math.floor(10000 + Math.random() * 90000);
  return randomFiveDigit;
}

const createOrder = async (paymentId) => {

const order_id = generateRandomDigits();
setOrderId(order_id);

const orderData = {
  customer_name: document.getElementById("name").value,
  customer_email: document.getElementById("email").value,
  customer_mobile: document.getElementById("mobile").value,
  id: order_id, // Custom order ID
  total_amount: subTotal,
  order_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
  status: 'paid',
  payment_id: paymentId
};

try{
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/insert`, {
  table: 'orders',
  data: orderData
});
  createOrderItems(orderData);
} catch(error){
      console.error('Error placing order:', error.response?.data || error.message);
}

}

const createOrderItems = async (orderData) => {
  try {
    const requests = cart.map(item => {
      const _id = generateRandomDigits();
      const orderItem = {
        id: _id,
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        item_price: item.price,
        item_weight: parseFloat(item.weight),
      };

      return axios.post(`${import.meta.env.VITE_API_URL}/api/insert`, {
        table: 'order_items',
        data: orderItem,
      });
    });

    const responses = await Promise.all(requests);

    responses.forEach((res, index) => {
      console.log(`Order Item ${index + 1} Created:`, res.data);
    });

    // ✅ Do something after all items are posted
    const orderDetails = {
      orderData: orderData,
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        weight: item.weight
      }))
    }
    
    sendEmailToBusiness(orderDetails);

    // Empty Cart
    setCart([]);
    console.log('All order items created successfully');
    // e.g. navigate('/thank-you') or callback()

  } catch (error) {
    console.error('Error placing order items:', error.response?.data || error.message);
  }
};

const sendEmailToBusiness = (orderDetails) => {
  axios.post(`${import.meta.env.VITE_API_URL}/api/send-email`, orderDetails)
  .then(res => {
    console.log('Business notified via email');
  })
  .catch(err => {
    console.error('Email error:', err.message);
  });

}


const handlePayment = () => {
  
  const customerInfo = [];
  customerInfo.name = document.getElementById("name").value;
  customerInfo.email = document.getElementById("email").value;
  customerInfo.mobile = document.getElementById("mobile").value;
  customerInfo.address = document.getElementById("address").value;

  if(customerInfo.name == "" || customerInfo.email == "" || customerInfo.mobile == ""){
    alert("Please fill in all required fields.");
    return
  }

  const options = {
    key: "rzp_test_1AG0IlnBRx7UoO", // Get it from Razorpay Dashboard
    amount: subTotal * 100, // Amount in paise (500.00 INR)
    currency: "INR",
    name: "Sri Rajyalakshmi Home Foods",
    description: "Test Transaction",
    image: "https://yourlogo.com/logo.png",
    //order_id: "order_9A33XWu170gUtm", // Get from backend if using Orders API
    handler: function (response) {
      //alert("Payment successful!");
      console.log(response);
      setPaymentSucess(true);
      
      createOrder(response.razorpay_payment_id);

    },
    prefill: {
      name: customerInfo.name,
      email: customerInfo.email,
      contact: customerInfo.mobile
    },
    notes: {
      address: customerInfo.address
    },
    theme: {
      color: "#F37254"
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

    return(
        <>
        <div className="container">
           <div className='page-title'>
          <h2 className='mt-4 mb-4'>Shopping Cart
          <small className='d-block'>
            {cart.length > 0 ? (
              <>
              {cart.length} item{cart.length > 1 ? "'s" : ''} Added to cart.
              </>
            )
            : (
              <>
              Your cart is currently empty.
              </>
            )
            }
            
            </small>
        </h2>
        </div>
      <div className='mt-4 content-bg'>
            {cart && cartQuantity > 0 && !paymentSucess &&
            <>
            <h3 className='mt-0 mb-4'>Cart</h3>
            <div className='row'>
                <div className="selected-items col-sm-8">
                    <div className="row">
                        {cart.map((item) => (
                  <div className='col-sm-12 mb-2 item' key={item.name}>
                  <div className="card p-2">
                    <div className="pic">
                        <img className="img-thumbnail me-3" src={`/srl_homefoods/assets/${item.image}`} />
                    </div>
                    <div className="desc">
                        <h5 className="mb-2">{item.name}</h5>
                        <div className="d-flex">
                        <div className="mb-1 pr-details"><label>Weight:</label> {item.weight} KG</div>
                        <div className="mb-1 pr-details"><label>Quantity:</label> {item.quantity} </div>
                        <div className="mb-1 pr-details"><label>Price:</label> ₹{item.price}</div>
                        </div>

                        <QuantityManager prod={item} />
                        
                        <div className="controls">
                        <button onClick={(e) => removeFromCart(item.id)} title="Remove Item from Cart" className="btn btn-outline-danger"><i className="bi bi-trash3"></i></button>
                            </div>
                        
                    </div>
                  </div>
                </div>
                ))}
                    </div>
                </div>

                <div className="col-sm-4">

                <div className="card bg-light p-3 mb-4">
                <h6>Contact</h6>
                <FloatingInput id="mobile" label="Mobile" />
                <FloatingInput id="email" label="Email" />

                <h6>Delivery Address</h6>
                <FloatingInput id="name" label="Name" />
                <FloatingInput id="address" label="Address" />
                <FloatingInput id="city" label="City" />
                <FloatingInput id="state" label="State" />
                <FloatingInput id="pincode" label="Pincode" />
                <FloatingInput id="country" label="Country" />

            
                </div>

                        <div className="row h5">
                        <div className="col-sm-6">Total ({`${cart.length} item${cartQuantity > 1 ? 's' : ''}`}):</div>    
                        <div className="col-sm-6 text-end"><strong> ₹{parseFloat(subTotal).toFixed(2)}</strong></div>    
                        </div> 
                          
                        

                    <div className="d-grid">
                        <button onClick={handlePayment} className="btn btn-yellow">Pay Now</button>
                    </div>
                </div>
            </div>
            </>
            }

            {cart && cartQuantity == 0 && !paymentSucess && 
            <>
            <div className="text-center">
                <h5 className="mt-4 mb-4">Your cart is empty</h5>
                <Link to="/Products" className="btn btn-secondary mb-4">Browse Products</Link>
            </div>

            </>
            }

            {paymentSucess && 
            <>
            <div className="text-center">
                <h2 className="mt-4 mb-4">Order placed sucessfully!</h2>
                <p>Order ID: {orderId}</p>
                <Link to="/Products" className="btn btn-yellow mb-4">Continue Shopping</Link>
            </div>
            </>
            }

        </div>
        </div>


        <Footer></Footer>
        
        </>
    )
}

export default Cart;