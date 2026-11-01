import axiosClient from './axiosClient';

export const createPaymentIntent = () =>{
        return axiosClient.post("/api/payment/create-intent")
}