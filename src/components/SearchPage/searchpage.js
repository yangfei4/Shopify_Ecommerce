import React, { useEffect, useState } from "react";
import "./searchpage.scss";
import { useLocation } from 'react-router-dom';

import SearchBar from "../Searchbar";
import { Rate } from 'antd';

import { searchProducts } from "../../services/productsAPI";

const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchText = queryParams.get('q');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await searchProducts(searchText);
            setProducts(data);
        };

        fetchProducts();
    }, [searchText]);

    return (
        <div className="searchpage">
            <SearchBar {...{initialText: searchText}} />
            <div className="content">
                <h2 className="header">Search Results for {searchText}:</h2>
                <div className="products">
                    {!products || products.length===0 ? (
                        <h2>Loading...</h2>
                    ) : (
                        products.map((product) => (
                            <div key={product.id} className="product-card">
                                <a href={`/product/${product.id}`} className="product-link">
                                    <img src={product.thumbnail} alt={product.title} />
                                </a>
                                <div className="product-info">
                                    <a href={`/product/${product.id}`} className="product-link">
                                        <h3 className="product-name">{product.description}</h3>
                                    </a>
                                    <p className="product-price">${product.price.toFixed(2)}</p>
                                    {/* discount */}
                                    {product.discountPercentage > 0 && (
                                        // show original price with strike through and current price and save percentage
                                        <p className="product-discount">
                                            <span className="original-price">${(product.price*(1+product.discountPercentage*0.01)).toFixed(2)}</span>
                                            <span>&nbsp; Save {product.discountPercentage}%</span>
                                        </p>
                                    )}
                                    <p className="product-category">{product.category}</p>
                                    <Rate disabled allowHalf defaultValue={product.rating} />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;