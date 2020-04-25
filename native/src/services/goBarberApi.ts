import axios from 'axios';

const goBarberApi = axios.create({
  baseURL: 'http://192.168.1.131:3333/',
});

export default goBarberApi;
