import {retriveLocalStorage} from "../redux";
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://dummyjson.com",
});

// **Додаємо токен до кожного запиту**
axiosInstance.interceptors.request.use((config) => {
    const user = retriveLocalStorage<IUserWithTokens>("user");
    if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
});