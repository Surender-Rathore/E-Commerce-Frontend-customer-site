import axiosClient from "./axiosClient";

export const getAllCatgories = () => {
        return axiosClient.get("/api/categories")
}