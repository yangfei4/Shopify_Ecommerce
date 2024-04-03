import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./cartpage.scss";

import SearchBar from "../Searchbar";
import { Button } from "react-bootstrap";
import { Checkbox } from 'antd';

import { removeItemfromStore, updateItemInStore } from "../../actions/actions";

const CartPage = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState(props.cartItems);
    const [selectedItemIds, setSelectedItemIds] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    const selectAll = (e) => {
        if(e.target.checked) {
            const ids = cartItems.map((item, index) => item.id);
            setSelectedItemIds(ids);
            const total = cartItems.reduce((acc, item) => acc + item.price*item.quantity, 0);
            setSubtotal(total);
        } else {
            setSelectedItemIds([]);
            setSubtotal(0);
        }
    };
    
    const selectItem = (id) => {
        var newlySelectedList = [...selectedItemIds];
        if(selectedItemIds.includes(id)) {
            newlySelectedList = selectedItemIds.filter((itemId) => itemId !== id);
        } else {
            newlySelectedList.push(id);
        }

        const total = cartItems.reduce((acc, item) => newlySelectedList.includes(item.id) ? acc + item.price*item.quantity : acc, 0);
        setSelectedItemIds(newlySelectedList);
        setSubtotal(total);
    }
    const updateQuantity = (id, newQuantity) => {
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
    
        const updatedItem = updatedItems.find(item => item.id === id);
    
        setCartItems(updatedItems);
    
        if (selectedItemIds.includes(id)) {
            const oldQuantity = updatedItem.quantity - newQuantity;
            const total = subtotal + (newQuantity - oldQuantity) * updatedItem.price;
            setSubtotal(total);
        }
    
        console.log("Updated item is:");
        console.log(updatedItem);
        dispatch(updateItemInStore(updatedItem));
    }

    const removeItem = (id) => {
        const newItems = [...cartItems];
        const index = newItems.findIndex((item) => item.id === id);
        const removedItem = newItems.splice(index, 1);
        setCartItems(newItems);
        if(selectedItemIds.includes(id)) {
            const total = subtotal - removedItem[0].price*removedItem[0].quantity;
            setSubtotal(total);
        }

        dispatch(removeItemfromStore(id));
    }

    return (
        <div className="cartpage">
            <SearchBar />
            <div className="cartpage__content">
                <div className="header-container">
                    <h2><i className="fa fa-shopping-cart" aria-hidden="true">&nbsp;</i>Shopping Cart</h2>
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
                                        <Checkbox checked={selectedItemIds.includes(item.id)} onChange={() => selectItem(item.id)} />
                                    </div>
                                    <div className="cart-item-image">
                                        <div className="anchor" onClick={() => navigate(`/product/${item.id}`)}>
                                            <img src={item.images[0]} alt={item.images[0]} />
                                        </div>
                                    </div>
                                    <div className="cart-item-details">
                                        <div className="cart-item-name">
                                            <span className="anchor" onClick={() => navigate(`/product/${item.id}`)}>
                                                {item.title}
                                            </span>
                                            <span className="cart-item-price font">${item.price.toFixed(2)}</span>
                                        </div>
                                        <p className="cart-item-description">{item.description}</p>
                                        <div className="cart-item-quantity">
                                            <span>Qty: &nbsp;</span>
                                            {/* <input type="number" value={item.quantity} /> */}
                                            {/* selector for quantity */}
                                            <select value={item.quantity} onChange={(e) => {updateQuantity(item.id, parseInt(e.target.value))}}>
                                                {[...Array(10).keys()].map((i) => (
                                                    <option key={i} value={i+1}>{i+1}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="cart-item-remove">
                                            <Button onClick={() => removeItem(item.id)}
                                            size='sm' variant="link">Remove</Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                            
                        }
                    </div>
                    <div className="cart-summary-container">
                        <div className="cart-summary-subcontainer">
                            <div className="cart-summary-detail">
                                <div>Items({selectedItemIds.length}): <span className="detail-value">${subtotal.toFixed(2)}</span></div>
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