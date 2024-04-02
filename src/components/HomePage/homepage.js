import React from "react";
import "./homepage.scss";
import SearchBar from "../Searchbar";

import { useState, useEffect } from "react";

import { getProductCategories, getProductsByCategory } from "../../services/productsAPI";

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [productsOfCategories, setProductsOfCategories] = useState({});

    useEffect(() => {
        getProductCategories().then(async (data) => {
            // randomly select 5 categories
            const randomCategories = data.sort(() => 0.5 - Math.random()).slice(0, 8);
            setCategories(randomCategories);
    
            // get products of each category
            const promises = randomCategories.map((category) => getProductsByCategory(category));
            Promise.all(promises).then((data) => {
                const productsOfCategory = {};
                data.forEach((products, index) => {
                    // if the category has no products, skip it
                    if (products.length === 0) return;
                    productsOfCategory[randomCategories[index]] = products;
                });
                setProductsOfCategories(productsOfCategory);
            });
        })
    }, []);
    
    return (
        <div className="homepage">
            <SearchBar />
            {/* list out products of each catogory */}
            {categories.map((category) => {
                return (
                    <div key={category} className="category">
                        {/* make the first character upper case */}
                        <h2 className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                        <div className="products">
                            {productsOfCategories && productsOfCategories[category]?.map((product) => {
                                return (
                                        <div key={product.id} className="product">
                                            <a href={`/product/${product.id}`} className="product">
                                                <img src={product.images[0]} alt={product.title} />
                                                {/* if the length of title is less than 20, show ... */}
                                                <h3 className="product-title">{product.title.length > 20 ? product.title.slice(0, 20) + "..." : product.title}</h3>
                                            </a>
                                        </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default HomePage;