import axios from 'axios'

const API = axios.create({
    baseURL : "https://api-rest-les-jailes.azurewebsites.net/",
});

export default API;
