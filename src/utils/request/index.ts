import axios from "axios";

const request = axios.create({
    baseURL: "/api",
    timeout: 10000,
});

//TODO: Add request interceptor
//TODO: Add response interceptor




export default request;