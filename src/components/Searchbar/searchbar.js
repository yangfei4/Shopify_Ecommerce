import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchbar.scss";
//event handler type
const SearchBar = ({initialText}) => {

    const navigate = useNavigate();

    const [searchText, setSearchText] = useState(initialText);

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?q=${encodeURIComponent(searchText)}`);
    };

    return (
        <div className="SearchBar">
            <div onClick={()=>navigate("/home")} className="anchor">
                <h2 className="logo">Shopify</h2>
            </div>
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