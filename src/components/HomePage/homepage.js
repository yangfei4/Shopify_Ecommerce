import React from "react";
import "./homepage.scss";
import SearchBar from "../Searchbar";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';

import { getProductCategories, getProductsByCategory } from "../../services/productsAPI";

const HomePage = () => {
    const navigate = useNavigate();
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

            <div className="carousel-container">
                <Carousel variant='dark'>
                    {/* load ad1.jpg ad2.jpg ad3.jpg from ../../assets */}
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://github.com/yangfei4/Shopify_Ecommerce/blob/main/assets/ad1.jpg?raw=true"
                            alt="First slides"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://github.com/yangfei4/Shopify_Ecommerce/blob/main/assets/ad2.jpg?raw=true"
                            alt="Second slides"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://github.com/yangfei4/Shopify_Ecommerce/blob/main/assets/ad3.jpg?raw=true"
                            alt="Third slides"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>

            {/* list out products of each catogory */}
            {categories.map((category) => {
                return (
                    <div key={category} className="category">
                        {/* make the first character upper case */}
                        <h2 className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                        <div className="products">
                            {productsOfCategories && productsOfCategories[category]?.map((product) => {
                                return (
                                        <div key={product.id} className="product" onClick={() => navigate(`/product/${product.id}`)}>
                                                <img src={product.images[0]} alt={product.title} />
                                                {/* if the length of title is less than 20, show ... */}
                                                <h3 className="product-title">{product.title.length > 20 ? product.title.slice(0, 20) + "..." : product.title}</h3>
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