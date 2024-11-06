import axios from 'axios';

const api = axios.create({
    baseURL: "", // coloco o http://localhost:3030 da api do kaua
})

export default api;