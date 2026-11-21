import axios from "axios";

// Reads VITE_API_URL from frontend/.env if present, otherwise uses json-server's default.
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/",
});

export default instance;
