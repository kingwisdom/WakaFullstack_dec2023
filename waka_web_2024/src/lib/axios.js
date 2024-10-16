import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://waka-fullstack-dec2023.vercel.app/api/",
    // withCredentials: true
});