import { useEffect, useState, useContext } from "react";
import { CartContext } from "../CartContext";

function ProductDetails({prod}){

const { cart, setCart } = useContext(CartContext);

//const [isVisible, setisVisible] = useState(false);

const selectOptions = (prod, event) => {
    event.stopPropagation();
    const elements = document.getElementsByClassName('pr-options');
    for (let el of elements) {
    el.classList.remove('show');
    }
    let prev = event.currentTarget.previousElementSibling;
    if(prev && prev.classList.contains('pr-options')){
        prev.classList.add('show');
    }
}

const updateWeight = (prod, e) => {
    const _weight = e.currentTarget.value;
    const _price = parseFloat(prod.price);
    const _newPrice = _price * _weight;
    document.getElementById(`price-` + prod.id).innerHTML = parseFloat(_newPrice).toFixed(2);
}

const addToCart = (prod, e) => {
e.stopPropagation();
const _button = e.currentTarget;
_button.disabled = true;
const _text = e.currentTarget.innerHTML;
const _progressText = '<div class="spinner-border text-light spinner-border-sm" role="status"></div> Adding'; 
_button.innerHTML = _progressText;

setTimeout(function(){
_button.innerHTML = _text;
_button.disabled = false;
}, 1000);

    const _weight = document.getElementById(`pr-weight-` + prod.id).value;
    //const pr_price = parseFloat(prod.price) * parseFloat(_weight);
    const _quantity = document.getElementById(`pr-count-` + prod.id).value;

    const item = {};
    item.id = prod.id;
    item.name = prod.name;
    item.price = prod.price;
    item.image = prod.image;
    item.weight = _weight;
    item.quantity = parseInt(_quantity);

    const existingItem = cart.find(item => item.id === prod.id && parseFloat(item.weight) == parseFloat(_weight));
    if(existingItem){
        setCart(el => el.map(elitem => elitem.id === existingItem.id && parseFloat(elitem.weight) === parseFloat(existingItem.weight) ? { ...elitem, quantity: elitem.quantity + parseInt(_quantity) } : elitem))
    }
    else{
        setCart([...cart, item]);
    }

    const _alertDiv = document.createElement('div');
    const _alert = document.createElement('div');
    _alert.innerHTML = _weight + " KG " + prod.name + " added to cart successfully!";
    _alertDiv.id = "AlertNotification";
    _alertDiv.className = "AlertNotification";
    _alert.className = "alert alert-warning";
    _alertDiv.appendChild(_alert);

    setTimeout(function(){
    document.body.appendChild(_alertDiv);
    }, 500)

    setTimeout(function(){
        _alertDiv.remove();
    }, 3000)

}

const addItem = (prod, event) => {
    const _countEl = document.getElementById(`pr-count-` + prod.id);
    _countEl.value =  parseInt(_countEl.value) + 1;
}
const removeItem = (id, event) => {
    let _countEl = document.getElementById(`pr-count-` + id);
    let _newVal = parseInt(_countEl.value) - 1;
    if(_newVal == 0){
        let _options = document.getElementById(`pr-options-` + id);
        if(_options) _options.classList.remove('show');
        removeFromCart(id);
    }
    else{
        _countEl.value =  parseInt(_countEl.value) - 1;
    }
}


const productFocus = (prodId, e) => {
    if(e.type != 'touchend'){
        const elements = document.getElementsByClassName('pr-options');
        for (let el of elements) {
                el.classList.remove('show');
        }
    }
}

    return(
    <>
    <div className='product-card card' id={`product-` + prod.id} onTouchEnd={(e) => productFocus(prod.id, e)} onMouseLeave={(e) => productFocus(prod.id, e)}>
            <div className='product-img'><img src={`/srl_homefoods/assets/${prod.image}`} alt={prod.name} className='' /></div>
            <div className='product-desc'>
                <h3 className='product-title'>{prod.name}</h3>
                <p className='product-price'>₹ {prod.price} / KG</p>
                
                <div className='pr-options' id={`pr-options-` + prod.id}>
                <h3 className='product-title mb-3'>{prod.name}</h3>
                
                <div className="pr-selection">
                <div>
                    <label>Weight</label>
                    <select className='pr-weight' id={`pr-weight-` + prod.id} onChange={(e) => updateWeight(prod, e)}>
                        <option value='0.25'>0.25 KG</option>
                        <option value='0.5'>0.5 KG</option>
                        <option value='1' selected>1 KG</option>
                </select>
                </div>
                    
                <div>
                <label>Quantity</label>
                
            <div className='quantity'>
            <button className='btn btn-light' onClick={(e) => removeItem(prod.id, e)}>-</button>
            <input className='form-control pr-count' id={`pr-count-` + prod.id} value="1" />
            <button className='btn btn-light' onClick={(e) => addItem(prod, e)}>+</button>
            </div>

                </div>
                </div>
                
                <div className="d-flex mt-2 justify-content-between">
                    <div>
                        <label>Price</label>
                        <div className="mr-2"><strong>₹<span id={`price-` + prod.id}>{prod.price}</span></strong>
                        <small className="d-block">* Inclusive of all taxes</small>
                        </div>
                    </div>
                    <button id={`addToCart-` + prod.id} onClick={(e) => addToCart(prod, e)} className='btn btn-secondary btn-addtocart mt-3'>Add to cart</button>
                </div>
                
                </div>

                <button onClick={(e) => selectOptions(prod, e)} className='btn btn-primary btn-selectoptions'>Selelct options</button>
                

            </div>
          </div>
    </>
)

}



export default ProductDetails;