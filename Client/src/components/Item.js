import React, { useContext } from "react";
import { ShopContext } from "./Context";



export const Item = (props) =>{

    const {Name, Id, Price, IMG, Desc} = props.data;
    const {addToCart, cartItems} = useContext(ShopContext);
    const cartItemAmount = cartItems[Id];
    return(
            <div className="Item-list">
                <img src={IMG} alt={Name}/>
                <div className="description">
                    <p><b>{Name}</b></p>
                    <p>{Desc}</p>
                    <p>{Price}₪</p>
                </div>
                <button className="addtocart" onClick={() => addToCart(Id)}>
                    Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
                    </button>
             </div>
    )
}


