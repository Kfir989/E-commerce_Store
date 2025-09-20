import { Link } from "react-router-dom";
import React, {useContext} from "react";
import './Cart.css';
import ItemInCart from "./ItemsInCart";
import { ShopContext } from "./Context";
function Cart(){
    const { cartItems, gettotalprice, Handleclick } = useContext(ShopContext);
    const total =  localStorage.getItem("products") ? gettotalprice() : 0
    // The cart component is a visual element in the Nav-bar
    // it is mapping thourgh the list of products and if the product id amount on cartItems is bigger then 0 show it in cart.
    // for the close button imported the HandleClick function
    // also the Checkout button will be active only when total price is larger then 0
    return(
        <div className='Cart'>
            <div className="cart-title">Your Cart:</div>
            <p className="cart-p">Total :<span style={{color: 'green'}}> {Number(total).toFixed(2)} ₪</span></p>
            <div className="cart-items">
                {localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")).map((item) => {
                    if (cartItems[item.Id] !== 0){
                       return( 
                       <ItemInCart data={item} />)
                    }
                }): ""}
            </div>
            <div className="cart-buttons">
                <button className={total > 0 ? "cart-btn1": 'cart-btn4'} onClick={Handleclick}>Close</button>

                <Link to={total > 0 ? "/checkout" : "#"}><button className="cart-btn2" onClick={Handleclick} disabled={total === 0}>Checkout</button></Link>
            </div>
        </div>
    )
}

export default Cart;