import React from "react";
import "./searchbar.css";

const Searchbar = () => {
    return (
        <div className="searchbar">
            <input type="text" placeholder="Search..." />
            <button>Search</button>
        </div>
    );
};

export default Searchbar;