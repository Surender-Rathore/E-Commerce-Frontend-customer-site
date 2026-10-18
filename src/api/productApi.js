import axiosClient from "./axiosClient";


export const getAllProduct = () => axiosClient.get(`/api/products`);
export const getProductById = (id) => axiosClient.get(`/api/products/${id}`)