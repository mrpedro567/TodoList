import axios from 'axios';

const api = axios.create({
   baseURL: 'http://192.168.25.12:8080'
});

export default api;