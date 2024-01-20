import axios from "axios";

export const api = axios.create({
    baseURL: "//localhost:8000",
    headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin (not recommended for production)
        'Content-Type': 'application/json', // Set the content type as needed
        // Add other headers as needed
    },
    
});
