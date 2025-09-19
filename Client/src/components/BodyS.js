import React from "react";
import './BodyS.css';
import Video from './Background/nightsky.mp4'
import { Item } from "./Item";



function Bodys(){

    const scrollToShop = () => {
        window.scrollTo({
            top: 1300,
            behavior: 'smooth'
        });
    };
    
    return(
        <>
            <div className="body-container">
                    <video data-testid="video" src={Video} autoPlay loop muted/>
                    <h2 className="body-h2">Designers Prodocuts Awaiting</h2>
                    <p className="body-p">Lets get started!</p>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="btn1"><button onClick={scrollToShop}>&nbsp;&nbsp;&nbsp;&nbsp;Go To Shop&nbsp;&nbsp;&nbsp;</button></div>
                    <br></br>
                    <div className="body-aboutus"><p>Welcome to Leh-Leha, your ultimate destination for premium footwear and stylish socks! At Leh-leha, we believe that every step you take should be a blend of comfort and style.
                        Our curated collection features a diverse range of high-quality shoes, from sleek dress shoes to versatile sneakers, as well as an array of fashion-forward and cozy socks to complement every outfit.
                        We’re passionate about delivering exceptional products and unparalleled customer service, ensuring that your shopping experience is as enjoyable as it is seamless.
                        Whether you’re looking to elevate your everyday look or find the perfect pair for a special occasion, Leh-Leha is dedicated to helping you step out in confidence and comfort. Join us on our journey to redefine footwear and sock fashion, one step at a time!</p></div>  
             </div>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <br></br>
             <div className="shop-container">
                <h1 className="shop-h1">Leh-Leha Shop</h1>
                <div className="Items"> {localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")).map((product) => (
                    <Item key={product.Id} data={product} />
                )): ""}</div>
             </div>
</>     
    )
}

export default Bodys;