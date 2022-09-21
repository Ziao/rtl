import axios from "axios";

console.log({ axios });
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
});
