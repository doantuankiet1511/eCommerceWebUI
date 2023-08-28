import axios from "axios";
import cookie from "react-cookies";

export const endpoints = {
    "categories": "/categories/",
    
    "products": "/products/",
    "product-detail": (productId) => `/products/${productId}`,

    "shop-detail": (shopId) => `/shops/${shopId}`,
    "shop-detail-product": (shopId) => `/shops/${shopId}/products/`,

    "login": "/o/token/",
    "current-user": "/users/current-user/",
    "register": "/users/",

    "comments": (productId) => `/products/${productId}/comments/`, //GET-POST
    "action-comment": (commentId) => `/comments/${commentId}/`, //PUT-PATCH-DELETE
    "reply-comment": (commentId) => `/comments/${commentId}/reply-comment/`,

    "reviews": (productId) => `/products/${productId}/reviews/`, //GET-POST
    
    "like-product": (productId) => `/products/${productId}/like/`,

    "payment-methods": "/payment-methods/",
    "checkout": "/orders/"
}

export const authAPI = () => axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
        "Authorization": `Bearer ${cookie.load("access-token")}`
    }
})

export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})