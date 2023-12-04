import axios from 'axios'

const API = axios.create({
    baseURL : "https://api-les-jailes.azurewebsites.net",
});

export default API;
