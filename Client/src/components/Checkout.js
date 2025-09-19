import React, { useContext, useState } from "react";
import { ShopContext } from "./Context";
import "./Checkout.css";

// contain 2 main elemnts -> form and table presenting the cart items
// Inside form:
// inside the form element there are 2 working functions, the validation and the submit
// validation function checks all fields and if the cart is empty.
// the HandleSubmit function uses POST method to sent a request for the server to save the data.
// once the data is saved a Success msg is apearing navigate to home component and delete local storage of cart.
function CheckOut() {
    const { cartItems, gettotalprice } = useContext(ShopContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [shipment, setShipment] = useState("");
    const total = gettotalprice();
    const info_validation = () =>{
        const errors = {};
        if (total === 0){
            alert("cannot checkout empty cart")
            window.location.href = "http://localhost:3000/";
            return;
        }
        if (name.trim().length === 0){
            errors.name = "name "
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim().length === 0 || !emailPattern.test(email)){
            errors.email = "email "
        }
        if (address.trim().length === 0){
            errors.address = "address "
        }
        const phonePattern = /^[0][0-9]{2}[0-9]{3}[0-9]{4}$/;
        if (phone.trim().length === 0 || !phonePattern.test(phone)){
            errors.phone = "phone "
        }
        if (!shipment) errors.shipment = "shipment"
        if (Object.keys(errors).length > 0)alert(Object.keys(errors))
        return Object.keys(errors).length === 0;



    }
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevents default form submission
        let newtotal = total
        let OrderNum = Date.now();
        if (shipment === "Quick shipment: (3-7 business days) 20₪") newtotal += 20
        if (!info_validation()) {
            return;  // Prevent submission if validation fails
        }
        const order = { name, email, address, phone, shipment, cartItems, newtotal, OrderNum };

        try {
            const response = await fetch('/orders', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(order)
            });

            if (response.ok) {
                alert("Success" + "\n" +  OrderNum);
                localStorage.removeItem("cart");
                setName("");
                setEmail("");
                setAddress("");
                setPhone("");
                setShipment("");
                window.location.href = "http://localhost:3000/";
            } else {
                // Handle server errors
                const errorData = await response.json();
                console.error("Server error:", errorData);
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
    };

    return (
        <div className="Container">
            <div className="form-container">
                <div className="table-title">You are almost there:</div> 
                <form>   
                    <div className="Row">
                        <label htmlFor="firstName">Name: </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            value={name} 
                            placeholder="Joe" 
                            onChange={(e) => setName(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="Row">
                        <label htmlFor="email">Email: <span className="text-muted"></span></label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            value={email} 
                            placeholder="you@example.com" 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="Row">
                        <label htmlFor="address">Address</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="address" 
                            value={address} 
                            placeholder="1234 Main St" 
                            onChange={(e) => setAddress(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="Row">
                        <label htmlFor="phone">Phone Number:</label>
                        <input 
                            type="tel" 
                            className="form-control" 
                            id="phone" 
                            value={phone} 
                            placeholder="0501234567" 
                            pattern="[0]{1}[0-9]{2}[0-9]{3}[0-9]{4}" 
                            onChange={(e) => setPhone(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="Row">
                        <label htmlFor="shipment">Shipment:</label>
                        <select 
                            id="shipment" 
                            className="form-control" 
                            value={shipment} 
                            onChange={(e) => setShipment(e.target.value)} 
                            required
                        >
                            <option value="">Choose...</option>
                            <option>Quick shipment: (3-7 business days) 20₪</option>
                            <option>Slow shipment: (8-14 business days)</option>
                        </select>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="check-out-btn">
                        <button 
                            className="btn" 
                            type="button"  // Changed to "button" to use onClick instead of form submit
                            onClick={handleSubmit}  // Handle the click event for submission
                        >
                            Continue to checkout
                        </button>
                    </div>
                </form>
            </div>
            <div className="cart-i">
                <table>
                    <thead className="table-head">
                        <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {JSON.parse(localStorage.getItem("products")).map((item) => {
                            let subtotal = cartItems[item.Id] * item.Price;   
                            if (cartItems[item.Id] !== 0) {
                                return (
                                    <tr key={item.Id}>
                                        <td><img src={item.IMG} alt="" /></td>
                                        <td>{item.Name}</td>
                                        <td>x{cartItems[item.Id]}</td>
                                        <td>{subtotal}₪</td>
                                    </tr>
                                );
                            }
                        })} 
                        <tr>
                            <td colSpan={2}>Total:</td>
                            <td colSpan={2}><b>{shipment === "Quick shipment: (3-7 business days) 20₪" ? (total+20):total}</b>₪</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CheckOut;