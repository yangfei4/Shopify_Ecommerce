import React from "react";
import "./cartpage.scss";

import SearchBar from "../SearchBar";

const CartPage = () => {
    return (
        <div className="cartpage">
            <SearchBar />
            <h1>Welcome to the cartpage</h1>
        </div>
    );
};

export default CartPage;