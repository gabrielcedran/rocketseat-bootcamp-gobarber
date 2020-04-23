import axios from 'axios';

const goBarberApi = axios.create({
  baseURL: 'http://localhost:3333/',
});

export default goBarberApi;
