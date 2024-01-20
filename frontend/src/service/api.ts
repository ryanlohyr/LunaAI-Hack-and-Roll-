import axios from "axios";

export const api = axios.create({
    baseURL: "https://d4f9-137-132-26-227.ngrok-free.app",
    headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin (not recommended for production)
        'Content-Type': 'application/json', // Set the content type as needed
        'ngrok-skip-browser-warning': 'true',
    },
    
});
