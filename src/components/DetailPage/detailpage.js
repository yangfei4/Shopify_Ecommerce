import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./detailpage.scss";
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css'; 
import { Rate } from 'antd';

import SearchBar from "../Searchbar";

import { getProductById } from "../../services/productsAPI";
import { addItemToStore } from "../../actions/actions"

const DetailPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const productId = location.pathname.split("/")[2];

    const [product, setProduct] = useState(null);
    
    useEffect(() => {
        // fetch product by id
        getProductById(productId).then((data) => {
            setProduct(data);
        });
    }
    , [productId]);

    const addToCart = () => {
        const newItem = {
            ...product,
            quantity: 1
        };
        dispatch(addItemToStore(newItem));
        alert("Item added to cart");
    }

    return (
        <div className="detailpage">
            <SearchBar />
            <div className="content">
                {product ? (
                    <div className="product-card">
                        {/* <img className="image-carousel" src={product.thumbnail} alt={product.title} /> */}
                        <div className="carousel-container">
                            <Carousel variant='dark'>
                                {product.images.map((image, index) => (
                                    <Carousel.Item key={index}>
                                        <Image src={image} alt={product.title} fluid />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                        <div className="product-info">
                            <h2 className="product-name">{product.description}</h2>
                            <p className="product-price">
                                US ${product.price.toFixed(2)}
                                <span className="rating">
                                    {product.rating}&nbsp;<Rate size="small"
                                     disabled allowHalf defaultValue={product.rating} />
                                </span>
                            </p>
                            {product.discountPercentage > 0 && (
                                        // show original price with strike through and current price and save percentage
                                        <p className="product-discount">
                                            <span className="original-price">${(product.price*(1+product.discountPercentage*0.01)).toFixed(2)}</span>
                                            <span>&nbsp; Save {product.discountPercentage}%</span>
                                        </p>
                            )}
                            {/* in stock */}
                            {product.stock > 0 ? (
                                <p className="product-stock">In Stock: {product.stock}</p>
                            ) : (
                                <p className="product-stock">Out of Stock</p>
                            )}
                            <div className="buttons" >
                                <Button className="buy-button" variant="primary" size="lg">Buy It Now</Button>
                                <Button className="cart-button" type="submit" variant="info" size="lg" onClick={addToCart}>Add to cart</Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h2>Loading...</h2>
                )}
            </div>
        </div>
    );
};

export default DetailPage;