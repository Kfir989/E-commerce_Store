import React, { useContext} from "react";
import './NB.css'
import { ShopContext } from "./Context";
import Cart from "./Cart";

function NB(){

    const {gettotalamount, Handleclick, Click} = useContext(ShopContext);
    const total = gettotalamount();
    return(
            <nav className="navbar">
                <div className="NB-container">
                    <a href="/" className="logo">
                        Leh-Leha <i className="fab fa-think-peaks"></i>
                    </a>
                    <div className="menu-icon" onClick={Handleclick}>
                        <i className={Click ? 'fas fa-times' : 'fa fa-shopping-cart'} />
                        <span className={Click ? 'icon' : 'icon-counter'}>{total}</span>
                    </div>
                    <span className={Click ? 'show-cart' : 'no-cart'}><Cart /></span>
                </div>
            </nav>
    )
}

export default NB