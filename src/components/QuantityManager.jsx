import { useEffect, useState, useContext } from "react";
import { CartContext } from '../CartContext';

const QuantityManager = ({prod}) => {

const { cart, setCart } = useContext(CartContext);
const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 1);

const removeItem = (id, weight, event) => {
    debugger;
    let _countEl = document.getElementById(`pr-count-` + id + "-" + weight);
    let _newVal = parseInt(_countEl.value) - 1;
    if(_newVal == 0){
        removeFromCart(id);
    }
    else{
        _countEl.value =  parseInt(_countEl.value) - 1;
        decreaseQuantity(id);
    }

}

const removeFromCart = (id) => {
    debugger
    setCart(prev => prev.filter(item => !(item.id === id && parseFloat(item.weight) === parseFloat(prod.weight))));
};

const decreaseQuantity = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id && parseFloat(item.weight) == parseFloat(prod.weight) ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

const addItem = (prod, event) => {
    debugger
    const _countEl = document.getElementById(`pr-count-` + prod.id + "-" + prod.weight);
    _countEl.value =  parseInt(_countEl.value) + 1;
    
    handleIncrease(prod);

}
const handleIncrease = (item) => {
    debugger
    setCart(el => el.map(elitem => elitem.id === item.id ? { ...elitem, quantity: elitem.quantity + 1 } : elitem));
};


    return(
        <>
        <div className='quantity'>
            <button className='btn btn-light' onClick={(e) => removeItem(prod.id, prod.weight, e)}>-</button>
            <input className='form-control pr-count' id={`pr-count-` + prod.id + "-" + prod.weight} value={prod.quantity != null ? prod.quantity : 1} />
            <button className='btn btn-light' onClick={(e) => addItem(prod, e)}>+</button>
        </div>
        </>
    )

}


export default QuantityManager;