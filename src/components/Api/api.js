import axios from 'axios'

const API = axios.create({
    baseURL : "https://test-api-rest-bc.onrender.com",
});

export default API;