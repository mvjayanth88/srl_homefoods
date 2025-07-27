import Footer from "./Footer";
import { Link } from "react-router-dom";


const Home = () => {

  return(
        <>
      <section id="banner">
        <div className="home-banner">
          <div id="RLHF" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src="/srl_homefoods/assets/banner_1.jpg" alt="First slide" />
      <div className="carousel-caption d-none d-md-block">
      <h2>Authentic <br />Andhra <br />Foods.</h2>
      <p>Flavors from the Heart of Andhra.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="/srl_homefoods/assets/banner_2.jpg" alt="Second slide" />
      <div className="carousel-caption d-none d-md-block text-end">
      <h2>Handmade <br/>Homely <br/>Honest.</h2>
      <p>Authentic taste begins with the purest ingredients — just like home.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="/srl_homefoods/assets/banner_3.jpg" alt="Third slide" />
            <div className="carousel-caption d-none d-md-block">
      <h2>Your Order, <br/>Made Fresh <br/>Just for You.</h2>
      <p>Only fresh — every order made on demand and dispatched in 24 hours.</p>
      </div>
    </div>
  </div>
  <a className="carousel-control-prev" href="#RLHF" role="button" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only"></span>
  </a>
  <a className="carousel-control-next" href="#RLHF" role="button" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only"></span>
  </a>
</div>
  </div>
      </section>

<section id="content">
<div className="container mt-5">
  <div className="content-bg">

<div className='products-list row home'>
  <div className='col-md-4 col-xl-3 mb-4'>
    <div className="card product-card">
      <div className='product-img'><img src="/srl_homefoods/assets/murukulu.jpg" className='' /></div>
      <div className='product-desc'>
      <h3 className="product-title">Namkeen & Khara</h3>
      <hr></hr>
      <h3 className="product-title text-orange">మురుకులు మరియు మిక్చర్</h3>
      <Link to="/Products" className="btn btn-primary">View Products</Link>
      </div>
    </div>
  </div>

  <div className='col-md-4 col-xl-3 mb-4'>
    <div className="card product-card">
      <div className='product-img'><img src="/srl_homefoods/assets/chicken-pickle.jpg" className='' /></div>
      <div className='product-desc'>
      <h3 className="product-title">Veg & Non-veg Pickles</h3>
      <hr></hr>
      <h3 className="product-title text-orange">వెజ్ & నాన్-వెజ్ ఊరగాయలు</h3>
      <Link to="/Products" className="btn btn-primary">View Products</Link>
      </div>
      
    </div>
  </div>

  <div className='col-md-4 col-xl-3 mb-4'>
    <div className="card product-card">
      <div className='product-img'><img src="/srl_homefoods/assets/ariselu.jpg" className='' /></div>
      <div className='product-desc'>
      <h3 className="product-title">Traditional Sweets</h3>
      <hr></hr>
      <h3 className="product-title text-orange">సున్నుండలు, అరిసెలు మరియూ హల్వా</h3>
      <Link to="/Products" className="btn btn-primary">View Products</Link>
      </div>
    </div>
  </div>

    <div className='col-md-4 col-xl-3 mb-4'>
    <div className="card product-card">
      <div className='product-img'><img src="/srl_homefoods/assets/karampodi.jpeg" className='' /></div>
      <div className='product-desc'>
      <h3 className="product-title">Karam podulu & Masalas</h3>
      <hr></hr>
      <h3 className="product-title text-orange">కారం పొడిలు మరియు మసాలాలు</h3>
      <Link to="/Products" className="btn btn-primary">View Products</Link>
      </div>
    </div>
  </div>


</div>

  </div>
</div>
</section>


<Footer></Footer>

        </>
    )
}


export default Home;