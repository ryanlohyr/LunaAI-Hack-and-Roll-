import axios from "axios";

export const api = axios.create({
    baseURL: "localhost:8000"
});
