import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./detailpage.scss";
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css'; 
import { Rate, Divider, Card } from 'antd';

import SearchBar from "../Searchbar";

import { getProductById, getProductsByCategory } from "../../services/productsAPI";
import { addItemToStore } from "../../actions/actions"

const DetailPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const productId = location.pathname.split("/")[2];
    const { Meta } = Card;

    const [product, setProduct] = useState(null);
    
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        // fetch product by id
        getProductById(productId).then((data) => {
            setProduct(data);
            // fetch related products
            getProductsByCategory(data.category).then((data) => {
                setRelatedProducts(data);
            });
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
                            <div className="product-price">
                                US ${product.price.toFixed(2)}
                                <span className="rating">
                                    {product.rating}&nbsp;<Rate size="small"
                                     disabled allowHalf defaultValue={product.rating} />
                                </span>
                            </div>
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
                <Divider />
                <div className="related-products-container">
                    <h4 className="title">Products Related to this item</h4>
                    <div className="related-products">
                        {relatedProducts.map((product, index) => (
                            <div key={index} className="related-product">
                                <Card
                                    hoverable
                                    style={{
                                    width: 240,
                                    height: 360
                                    }}
                                    cover={
                                        <a href={`/product/${product.id}`}>
                                            <img alt="example" src={product.images[0]} />
                                        </a>
                                    }
                                >
                                        <Meta title={product.title} description={<Rate size="small"
                                     disabled allowHalf defaultValue={product.rating} />} />
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;