import React, {useContext} from "react";
import { ShopContext } from "./Context";

function ItemInCart(props){
    const {Name, Id, Price, IMG} = props.data;
    const { cartItems, addToCart, RemovefromCart, Update } = useContext(ShopContext);

    let subtotal = cartItems[Id] * Price;

    return(
        <div className="ItemInCart">
            <img src = {IMG} alt="" ></img>
            <div className="item-props">
                <p><b>{Name}</b></p>
                <p>{Number(subtotal).toFixed(2)} ₪</p>
                <div className="item-btns">
                    <button className="add-remove" onClick={() => RemovefromCart(Id)}>-</button>
                    <input className="inputs" onChange={(e) => Update(Id, e.target.value)} value={cartItems[Id]}></input>
                    <button className="add-remove" onClick={() => addToCart(Id)}>+</button>
                    <button className="remove-item" onClick={() => Update(Id,0)}>Remove</button>
                </div>
            </div>
        </div>

    )
}

export default ItemInCart;