import axios from "axios";

export const endpoints = {
    "categories": "/categories/",
    
    "products": "/products/",
    "product-detail": (productId) => `/products/${productId}`,

    "shop-detail": (shopId) => `/shops/${shopId}`,
    "shop-detail-product": (shopId) => `/shops/${shopId}/products/`
}

export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})