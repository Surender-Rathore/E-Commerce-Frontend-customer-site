import axiosClient from "./axiosClient";

const formConfig = {
        headers:{"Content-Type" : "application/x-www-form-urlencoded"},
};

export const placeOrder = (shipping, paymentMethod, paymentIntentId) =>{
        const params = new URLSearchParams();

        params.append("firstName", shipping.firstName);
        params.append("lastName", shipping.lastName);
        params.append("address", shipping.address);
        params.append("city", shipping.city);
        params.append("phoneNumber", shipping.phoneNumber)
        params.append("paymentMethod", paymentMethod)

        if(paymentIntentId){
                params.append("paymentIntentId", paymentIntentId);
        }

        return axiosClient.post("/api/orders/place", params, formConfig);
}