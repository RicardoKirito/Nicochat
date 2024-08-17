import axios from "/node_modules/.vite/deps/axios.js?v=8d77614b";

const ax = axios.create({
    baseURL: 'https://nicochat-api.onrender.com/api',
    withCredentials: true
})

export default ax; 