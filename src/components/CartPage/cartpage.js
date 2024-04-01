import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./cartpage.scss";

import SearchBar from "../Searchbar";
import { Button } from "react-bootstrap";
import { Checkbox } from 'antd';

import { removeItemfromStore } from "../../actions/actions";

const CartPage = (props) => {
    const dispatch = useDispatch();

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
        const newItems = [...cartItems];
        const index = newItems.findIndex((item) => item.id === id);
        const oldQuantity = newItems[index].quantity;
        newItems[index].quantity = newQuantity;
        setCartItems(newItems);
        if(selectedItemIds.includes(id)) {
            const total = subtotal + (newQuantity - oldQuantity)*newItems[index].price;
            setSubtotal(total);
        }
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
                                        <Checkbox checked={selectedItemIds.includes(item.id)} onChange={() => selectItem(item.id)} />
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
                                            <select onChange={(e) => {updateQuantity(item.id, parseInt(e.target.value))}}>
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