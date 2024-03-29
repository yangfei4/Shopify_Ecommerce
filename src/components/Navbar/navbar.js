import React from "react";
import "./navbar.css";

const Navbar = () => {
    return (
        <header className="navbar">
            <nav className="navbar__items">
                <div className="navbar__item">
                    {/* icon from font-awsome */}
                    <a href="/cart">
                        Cart
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;