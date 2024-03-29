import React from "react";
import "./detailpage.scss";

import SearchBar from "../SearchBar";

const DetailPage = () => {
    return (
        <div className="detailpage">
            <SearchBar />
            <h1>Welcome to the detailpage</h1>
        </div>
    );
};

export default DetailPage;