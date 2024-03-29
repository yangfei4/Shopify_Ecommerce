import React from "react";
import "./navbar.scss";

const Navbar = () => {
    return (
        <header className="navbar">
            <nav className="navbar__items">
                <div className="navbar__item">
                    {/* icon from font-awsome */}
                    <a href="/cart">
                        Cart&nbsp;
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </a>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;