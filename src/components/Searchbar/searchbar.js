import React from "react";
import { useState, useEffect } from "react";
import "./searchbar.scss";
//event handler type
const SearchBar = ({submitSearch}) => {

    const [searchText, setSearchText] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        submitSearch({searchText});
    };

    useEffect(() => {
        submitSearch({searchText});
    }, [searchText, submitSearch]);

    return (
        <div className="SearchBar">
            <form onSubmit={(event) => handleSubmit(event)} className="SearchForm" action="./">
                <span>
                    <i className="fa fa-search" aria-hidden="true"></i>
                </span>
                <input 
                    className="InputBox" 
                    onChange={(event => setSearchText(event.target.value))}
                    placeholder="Seach for anything" 
                    type="search"
                    value={searchText}
                />
            </form>
        </div>
    );
}

export default SearchBar;