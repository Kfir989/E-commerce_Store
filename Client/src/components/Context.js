import React, {createContext, useEffect, useState} from "react";
export const ShopContext = createContext(null);
// creating Context and importing all the functionality to the proget.


// default cart function using when cant get "cart" from localstorage
function getDefaultCart(){
    let cart = {};
    for (let i = 1; i <= 9; i++){
        cart[i] = 0;
    }
    return cart;
};

// Project's functionality:
export const ShopContextProvider = (props) =>{
    const [products,setProducts] = useState(localStorage.getItem("products"));
    const [cartItems, setCartItems] = useState(localStorage.getItem("cart") ?JSON.parse(localStorage.getItem("cart")) : getDefaultCart());
    const API_URL = process.env.REACT_APP_API_URL || '';
    const [Click, setOnClick] = useState(false);
    const Handleclick = () => setOnClick(!Click);

    // total amount of items:
    const gettotalamount = () => {
        let total =0;
        for (const item in cartItems){
            total += cartItems[item];
        }
        return total;
    }
    // fetching "products" into local storage once page first loads:
    useEffect(() => {
        fetch(`${API_URL}/products`,{
            method: "GET",
    })
        .then((res) => res.json())
        .then((data) =>{
            setProducts(data)
            localStorage.setItem("products", JSON.stringify(data));
        })
    },[])
    // total cart price: item * item price
    const gettotalprice = () => {
        let total =0;
        for (const item in cartItems ){
            total += Number(cartItems[item]) * JSON.parse(localStorage.getItem("products"))[item - 1].Price
        }
        return total;
    }
    // using prev state to set all elements in the array as they were exept a single change in item with specific item ID.
    const addToCart = (itemid) =>{
        setCartItems((prev) => ({...prev, [itemid]: prev[itemid] + 1}))
    };
    const RemovefromCart = (itemid) =>{
        setCartItems((prev) => ({...prev, [itemid]: prev[itemid] - 1}))
    };
    const Update = (itemid, quantity) =>{
        if (Number(quantity) > 0){
        setCartItems((prev) => ({...prev, [itemid]: Number(quantity)}))
        }
        else setCartItems((prev) => ({...prev, [itemid]: 0}))
    };
    // exportable functions:
    const contextValue = {cartItems,  addToCart, RemovefromCart, gettotalamount, gettotalprice, Handleclick, Click, products, Update};
    localStorage.setItem("cart", JSON.stringify(cartItems));
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    ) 
};
