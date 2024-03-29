import React from "react";
import "./homepage.scss";

import SearchBar from "../SearchBar";

const HomePage = () => {
    return (
        <div className="homepage">
            <SearchBar />
            <h1>Welcome to the homepage</h1>
        </div>
    );
};

export default HomePage;