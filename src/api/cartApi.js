import axiosClient from "./axiosClient";

const formConfig = {
        headers:{"Content-Type" : "application/x-www-form-urlencoded"},
};


export const getCart = ()=>{
        return axiosClient.get("/api/cart");
}

export const addToCart = (productId, quantity=1)=>{
        const params = new URLSearchParams();

        params.append("productId", productId);
        params.append("quantity", quantity);

        return axiosClient.post("/api/cart/add", params, formConfig);
};

export const updateCartItem = (productId, quantity) =>{
        const params = new URLSearchParams();

        params.append("productId", productId);
        params.append("quantity", quantity);

        return axiosClient.post("/api/cart/update", params, formConfig);
};

export const removeCartItem = (productId) =>{
        const params = new URLSearchParams();

        params.append("productId", productId);

        return axiosClient.post("/api/cart/remove", params, formConfig);
};


