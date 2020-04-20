import axios from 'axios';

//Substitua 192.168.25.12 por seu Ip
const api = axios.create({
   baseURL: 'http://192.168.25.12:8080'
});

export default api;