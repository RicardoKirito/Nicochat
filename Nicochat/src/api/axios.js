import axios from "axios";

const ax = axios.create({
    baseURL: '/api',
    withCredentials: true
})

export default ax; 