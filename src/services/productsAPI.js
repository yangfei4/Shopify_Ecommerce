import axios from "axios";

const productsAPI = axios.create({
    baseURL: "https://dummyjson.com/products",
});

export const getAllProducts = async () => {
    try {
        const response = await productsAPI.get();
        return response.data;
    } catch (error) {
        console.log("Error fetching products", error);
    }
};

export const getProductCategories = async () => {
    try {
        const response = await productsAPI.get("/categories");
        return response.data;
    } catch (error) {
        console.log("Error fetching product categories", error);
    }
};

export const getProductsByCategory = async (category) => {
    try {
        const response = await productsAPI.get(`/category/${category}`);
        return response.data;
    } catch (error) {
        console.log("Error fetching products by category", error);
    }
};

export const getProductById = async (id) => {
    try {
        const response = await productsAPI.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error fetching product by id", error);
    }
};

export const searchProducts = async (searchText) => {
    try {
        const response = await productsAPI.get(`/search?searchText=${searchText}`);
        return response.data;
    } catch (error) {
        console.log("Error fetching products by search", error);
    }
};