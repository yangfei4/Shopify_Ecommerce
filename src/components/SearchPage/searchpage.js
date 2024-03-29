import React from "react";
import "./searchpage.scss";
import { useLocation } from 'react-router-dom';

import SearchBar from "../SearchBar";

const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchText = queryParams.get('searchText');

    console.log("searchText", searchText);
    return (
        <div className="searchpage">
            <SearchBar {...{initialText: searchText}} />
            <h1>Welcome to the searchpage</h1>
        </div>
    );
};

export default SearchPage;