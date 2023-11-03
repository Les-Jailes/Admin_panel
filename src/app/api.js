import axios from 'axios'

const API = axios.create({
    baseURL : "https://boutique-clothing-api.onrender.com",
});

export default API;