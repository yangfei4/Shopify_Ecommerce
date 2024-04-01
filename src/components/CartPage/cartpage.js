import React, { useEffect, useState } from "react";
import "./cartpage.scss";

import SearchBar from "../Searchbar";
import { Button } from "react-bootstrap";
import { Checkbox } from 'antd';

import { getAllProducts } from "../../services/productsAPI";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItemIndices, setSelectedItemIndices] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        // Fetch cart items from API
        const fetchCartItems = async () => {
            const products = await getAllProducts();
            // only select the first 3 items
            // for each of them, add a quantity property
            products.forEach((product) => {
                product.quantity = 1;
            });
            setCartItems(products.slice(0, 3));
        };
        fetchCartItems();
    }
    , []);

    const selectAll = (e) => {
        if(e.target.checked) {
            const indices = cartItems.map((item, index) => index);
            setSelectedItemIndices(indices);
            const total = cartItems.reduce((acc, item) => acc + item.price*item.quantity, 0);
            setSubtotal(total);
        } else {
            setSelectedItemIndices([]);
            setSubtotal(0);
        }
    };
    
    const selectItem = (index) => {
        if(selectedItemIndices.includes(index)) {
            setSelectedItemIndices(selectedItemIndices.filter((i) => i !== index));
        } else {
            setSelectedItemIndices([...selectedItemIndices, index]);
        }
        const total = selectedItemIndices.includes(index) ? subtotal - cartItems[index].price*cartItems[index].quantity : subtotal + cartItems[index].price*cartItems[index].quantity;
        setSubtotal(total);
    }

    return (
        <div className="cartpage">
            <SearchBar />
            <div className="cartpage__content">
                <div className="header-container">
                    <h1><i className="fa fa-shopping-cart" aria-hidden="true">&nbsp;</i>Shopping Cart</h1>
                    <div className="selectall-button">
                    &nbsp;
                    <Checkbox onChange={selectAll}>Select all items</Checkbox>
                    </div>
                </div>

                <div className="cart-items-summary-container">
                    <div className="cart-items-container">
                        {cartItems.length === 0 ? (
                            <div className="empty-cart">
                                {/* Loading... */}
                            </div>
                        ) : (
                            cartItems.map((item, index) => (
                                <div className="cart-item" key={index}>
                                    <div className="cart-item-checkbox">
                                        <Checkbox checked={selectedItemIndices.includes(index)} onChange={() => selectItem(index)} />
                                    </div>
                                    <div className="cart-item-image">
                                        <img src={item.images[0]} alt={item.images[0]} />
                                    </div>
                                    <div className="cart-item-details">
                                        <h3 className="name">{item.title}</h3>
                                        <p className="description">{item.description}</p>
                                        <div className="cart-item-quantity">
                                            <span>Qty: &nbsp;</span>
                                            {/* <input type="number" value={item.quantity} /> */}
                                            {/* selector for quantity */}
                                            <select>
                                                {[...Array(10).keys()].map((i) => (
                                                    <option key={i} value={i+1}>{i+1}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="cart-item-remove">
                                            <Button size='sm' variant="link">Remove</Button>
                                        </div>
                                    </div>
                                    <div className="cart-item-price">
                                        <h3>${item.price.toFixed(2)}</h3>
                                    </div>
                                </div>
                            ))
                        )
                            
                        }
                    </div>
                    <div className="cart-summary-container">
                        <div className="cart-summary-subcontainer">
                            <div className="cart-summary-detail">
                                <div>Items({selectedItemIndices.length}): <span className="detail-value">${subtotal.toFixed(2)}</span></div>
                                <div>Shipping: <span className="detail-value">${subtotal>0?5.00:0.00}</span></div>
                                <div>Tax: <span className="detail-value">${subtotal>0?5.00:0.00}</span></div>
                            </div>
                            <div className="cart-summary-subtotal">
                                <div>Subtotal: <span className="detail-value">US ${(subtotal>0?subtotal+10:subtotal).toFixed(2)}</span></div>
                            </div>
                            <div className="cart-summary-checkout">
                                <Button variant="primary" onClick={() => alert("Thank you for shopping with us!")}>Proceed to checkout</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartPage;